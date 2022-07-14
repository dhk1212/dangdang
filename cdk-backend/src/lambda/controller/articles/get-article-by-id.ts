import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Article } from '../../shared/models/article';

export const getArticleById = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    const { Items } = await client.send(new QueryCommand({
      TableName: process.env.TABLE,
      IndexName: 'GSI2_BySK',
      KeyConditionExpression: '#SK = :SK',
      ExpressionAttributeValues: marshall({
        ':SK': 'ARTICLE#' + event.pathParameters?.articleId,
      }),
      ExpressionAttributeNames: {
        '#SK': 'SK',
      },
    }));
    if (!Items || Items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Could not find article with id.',
        }),
      };
    }
    const article = unmarshall(Items[0]) as Article;
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: article.SK.split('#')[1],
        title: article.Title,
        text: article.Text,
        author: article.PK.split('#')[1],
        thumbnail: article.Thumbnail,
        createdAt: article.CreatedAt,
        price: article.Price,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
};