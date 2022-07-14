import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Health } from '../../shared';

export const getHealthById = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    const { Items } = await client.send(new QueryCommand({
      TableName: process.env.TABLE,
      IndexName: 'GSI2_BySK',
      KeyConditionExpression: '#SK = :SK',
      ExpressionAttributeValues: marshall({
        ':SK': 'HEALTH#' + event.pathParameters?.healthId,
      }),
      ExpressionAttributeNames: {
        '#SK': 'SK',
      },
    }));
    if (!Items || Items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Could not find health report with id.',
        }),
      };
    }
    const healthReport = unmarshall(Items[0]) as Health;
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: healthReport.SK.split('#')[1],
        title: healthReport.Title,
        text: healthReport.Text,
        author: healthReport.PK.split('#')[1],
        createdAt: healthReport.CreatedAt,
        rating: healthReport.Rating,
        address: {
          streetName: healthReport.Address.StreetName,
          houseNumber: healthReport.Address.HouseNumber,
          city: healthReport.Address.City,
          zip: healthReport.Address.Zip,
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