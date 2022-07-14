import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Adoption } from '../../shared/models/adoption';

export const getAdoption = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    const { Items } = await client.send(new QueryCommand({
      TableName: process.env.TABLE,
      IndexName: 'GSI1_ByType',
      KeyConditionExpression: '#Type = :Type',
      ExpressionAttributeValues: marshall({
        ':Type': 'ADOPTION',
      }),
      ExpressionAttributeNames: {
        '#Type': 'Type',
      },
    }));
    if (!Items) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'No adoptions found.',
        }),
      };
    }
    const adoptions = Items.map((item) => {
      const adoption = unmarshall(item) as Adoption;
      return {
        id: adoption.SK.split('#')[1],
        title: adoption.Title,
        author: adoption.PK.split('#')[1],
        createdAt: adoption.CreatedAt,
        thumbnail: adoption.Thumbnail,
      };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(adoptions),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
};