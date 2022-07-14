import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Meetup, parseJwt } from '../../shared';

export type UpdateMeetupBody = {
  title: string;
  text: string;
  time: string;
  address: {
    streetName: string;
    houseNumber: string;
    city: string;
    zip: string;
  };
}

export const updateMeetup = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const token = parseJwt(event.headers.authorization?.substr(7));

  if (!event.body) {
    return {
      statusCode: 400,
    };
  }

  const body = JSON.parse(event.body) as UpdateMeetupBody;

  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    const { Item } = await client.send(new GetItemCommand({
      TableName: process.env.TABLE,
      Key: marshall({
        PK: `USER#${token.preferred_username}`,
        SK: `MEETUP#${event.pathParameters?.storyId}`,
      }),
    }));
    if (!Item) {
      return {
        statusCode: 400,
      };
    }
    await client.send(new PutItemCommand({
      TableName: process.env.TABLE,
      Item: marshall({
        ...unmarshall(Item),
        Text: body.text,
        Title: body.title,
        Time: body.time,
        Address: {
          City: body.address.city,
          StreetName: body.address.streetName,
          HouseNumber: body.address.houseNumber,
          Zip: body.address.zip,
        },
      } as Meetup),
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