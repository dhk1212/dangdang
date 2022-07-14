import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { parseJwt, Health } from '../../shared';


export type CreateHealthBody = {
  title: string;
  text: string;
  rating: number;
  address: {
    streetName: string;
    houseNumber: string;
    city: string;
    zip: string;
  };
}

export const createHealth = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const token = parseJwt(event.headers.authorization?.substr(7));

  if (!event.body) {
    return {
      statusCode: 400,
    };
  }

  const body = JSON.parse(event.body) as CreateHealthBody;

  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    await client.send(new PutItemCommand({
      TableName: process.env.TABLE,
      Item: marshall({
        PK: `USER#${token.preferred_username}`,
        SK: `HEALTH#${uuidv4()}`,
        CreatedAt: new Date().toISOString(),
        Type: 'HEALTH',
        Text: body.text,
        Title: body.title,
        Rating: body.rating,
        Address: {
          City: body.address.city,
          StreetName: body.address.streetName,
          HouseNumber: body.address.houseNumber,
          Zip: body.address.zip,
        },
      } as Health),
    }));
    return {
      statusCode: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
};