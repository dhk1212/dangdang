import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Article } from '../../shared/models/article';

export const getArticles = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    const { Items } = await client.send(new QueryCommand({
      TableName: process.env.TABLE,
      IndexName: 'GSI1_ByType',
      KeyConditionExpression: '#Type = :Type',
      ExpressionAttributeValues: marshall({
        ':Type': 'ARTICLE',
      }),
      ExpressionAttributeNames: {
        '#Type': 'Type',
      },
    }));
    if (!Items) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'No articles found.',
        }),
      };
    }
    const articles = Items.map((item) => {
      const article = unmarshall(item) as Article;
      return {
        id: article.SK.split('#')[1],
        title: article.Title,
        author: article.PK.split('#')[1],
        thumbnail: article.Thumbnail,
        price: article.Price,
        createdAt: article.CreatedAt,
      };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(articles),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
};