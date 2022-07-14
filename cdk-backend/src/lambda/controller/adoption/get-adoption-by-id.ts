import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Adoption } from '../../shared/models/adoption';

export const getAdoptionById = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    const { Items } = await client.send(new QueryCommand({
      TableName: process.env.TABLE,
      IndexName: 'GSI2_BySK',
      KeyConditionExpression: '#SK = :SK',
      ExpressionAttributeValues: marshall({
        ':SK': 'ADOPTION#' + event.pathParameters?.adoptionId,
      }),
      ExpressionAttributeNames: {
        '#SK': 'SK',
      },
    }));
    if (!Items || Items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Could not find adoption with id.',
        }),
      };
    }
    const adoption = unmarshall(Items[0]) as Adoption;
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: adoption.SK.split('#')[1],
        title: adoption.Title,
        author: adoption.PK.split('#')[1],
        text: adoption.Text,
        createdAt: adoption.CreatedAt,
        thumbnail: adoption.Thumbnail,
        breed: adoption.Breed,
        price: adoption.Price,
        age: adoption.Age,
        gender: adoption.Gender,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
};