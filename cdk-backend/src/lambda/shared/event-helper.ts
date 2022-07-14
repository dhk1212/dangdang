import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

export type HandlerFunction = (event: APIGatewayProxyEventV2) => Promise<APIGatewayProxyResultV2>

export enum HttpOperation {
  POST= 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATH = 'PATCH'
}

export class EventHelper {
  private functionMap: Map<string, HandlerFunction>;

  constructor() {
    this.functionMap = new Map<string, HandlerFunction>();
  }

  private getKeyFromEvent(event: APIGatewayProxyEventV2): string {
    return `${event.requestContext.http.method} ${event.routeKey.split(' ')[1]}`;
  }

  addRouteHandler(operation: HttpOperation, route: string, handler: HandlerFunction) {
    this.functionMap.set(`${operation} ${route}`, handler);
  }

  async handleRoute(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    const handler = await this.functionMap.get(this.getKeyFromEvent(event));
    if (!handler) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Endpoint does not exist',
        }),
      };
    }
    return {
      ...await handler(event) as APIGatewayProxyResultV2<any>,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}