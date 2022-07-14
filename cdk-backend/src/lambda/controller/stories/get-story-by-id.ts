import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Story } from '../../shared/models/story';

export const getStoryById = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    const { Items } = await client.send(new QueryCommand({
      TableName: process.env.TABLE,
      IndexName: 'GSI2_BySK',
      KeyConditionExpression: '#SK = :SK',
      ExpressionAttributeValues: marshall({
        ':SK': 'STORY#' + event.pathParameters?.storyId,
      }),
      ExpressionAttributeNames: {
        '#SK': 'SK',
      },
    }));
    if (!Items || Items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Could not find story with id.',
        }),
      };
    }
    const story = unmarshall(Items[0]) as Story;
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: story.SK.split('#')[1],
        title: story.Title,
        text: story.Text,
        author: story.PK.split('#')[1],
        thumbnail: story.Thumbnail,
        createdAt: story.CreatedAt,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
};