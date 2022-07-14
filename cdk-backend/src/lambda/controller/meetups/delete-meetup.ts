import { DeleteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { parseJwt } from '../../shared';

export const deleteMeetup = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const token = parseJwt(event.headers.authorization?.substr(7));
  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    await client.send(new DeleteItemCommand({
      TableName: process.env.TABLE,
      Key: marshall({
        PK: `USER#${token.preferred_username}`,
        SK: `MEETUP#${event.pathParameters?.meetupId}`,
      }),
    }));
    return {
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
};