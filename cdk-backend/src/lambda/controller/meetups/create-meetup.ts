import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { Meetup, parseJwt } from '../../shared';


export type CreateMeetupBody = {
  title: string;
  text: string;
  address: {
    streetName: string;
    houseNumber: string;
    city: string;
    zip: string;
  };
  time: string;
}

export const createMeetup = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const token = parseJwt(event.headers.authorization?.substr(7));

  if (!event.body) {
    return {
      statusCode: 400,
    };
  }

  const body = JSON.parse(event.body) as CreateMeetupBody;

  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    await client.send(new PutItemCommand({
      TableName: process.env.TABLE,
      Item: marshall({
        PK: `USER#${token.preferred_username}`,
        SK: `MEETUP#${uuidv4()}`,
        CreatedAt: new Date().toISOString(),
        Type: 'MEETUP',
        Text: body.text,
        Address: {
          City: body.address.city,
          StreetName: body.address.streetName,
          HouseNumber: body.address.houseNumber,
          Zip: body.address.zip,
        },
        Time: body.time,
        Title: body.title,
      } as Meetup),
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