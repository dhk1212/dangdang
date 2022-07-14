import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Meetup } from '../../shared';

export const getMeetupById = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    const { Items } = await client.send(new QueryCommand({
      TableName: process.env.TABLE,
      IndexName: 'GSI2_BySK',
      KeyConditionExpression: '#SK = :SK',
      ExpressionAttributeValues: marshall({
        ':SK': 'MEETUP#' + event.pathParameters?.meetupId,
      }),
      ExpressionAttributeNames: {
        '#SK': 'SK',
      },
    }));
    if (!Items || Items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Could not find meetup with id.',
        }),
      };
    }
    const meetup = unmarshall(Items[0]) as Meetup;
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: meetup.SK.split('#')[1],
        title: meetup.Title,
        author: meetup.PK.split('#')[1],
        createdAt: meetup.CreatedAt,
        text: meetup.Text,
        time: meetup.Time,
        address: {
          streetName: meetup.Address.StreetName,
          houseNumber: meetup.Address.HouseNumber,
          city: meetup.Address.City,
          zip: meetup.Address.Zip,
        },
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
};