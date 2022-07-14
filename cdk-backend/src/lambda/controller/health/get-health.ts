import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Health } from '../../shared';

export const getHealth = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    const { Items } = await client.send(new QueryCommand({
      TableName: process.env.TABLE,
      IndexName: 'GSI1_ByType',
      KeyConditionExpression: '#Type = :Type',
      ExpressionAttributeValues: marshall({
        ':Type': 'HEALTH',
      }),
      ExpressionAttributeNames: {
        '#Type': 'Type',
      },
    }));
    if (!Items) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'No Health found.',
        }),
      };
    }
    const healthReports = Items.map((item) => {
      const healthReport = unmarshall(item) as Health;
      return {
        id: healthReport.SK.split('#')[1],
        title: healthReport.Title,
        author: healthReport.PK.split('#')[1],
        createdAt: healthReport.CreatedAt,
        rating: healthReport.Rating,
        address: {
          streetName: healthReport.Address.StreetName,
          houseNumber: healthReport.Address.HouseNumber,
          city: healthReport.Address.City,
          zip: healthReport.Address.Zip,
        },
      };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(healthReports),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
};