import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Meetup } from '../../shared';

export const getMeetups = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    const { Items } = await client.send(new QueryCommand({
      TableName: process.env.TABLE,
      IndexName: 'GSI1_ByType',
      KeyConditionExpression: '#Type = :Type',
      ExpressionAttributeValues: marshall({
        ':Type': 'MEETUP',
      }),
      ExpressionAttributeNames: {
        '#Type': 'Type',
      },
    }));
    if (!Items) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'No meetups found.',
        }),
      };
    }
    const meetups = Items.map((item) => {
      const meetup = unmarshall(item) as Meetup;
      return {
        id: meetup.SK.split('#')[1],
        title: meetup.Title,
        author: meetup.PK.split('#')[1],
        createdAt: meetup.CreatedAt,
        time: meetup.Time,
        address: {
          streetName: meetup.Address.StreetName,
          houseNumber: meetup.Address.HouseNumber,
          city: meetup.Address.City,
          zip: meetup.Address.Zip,
        },
      };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(meetups),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
};