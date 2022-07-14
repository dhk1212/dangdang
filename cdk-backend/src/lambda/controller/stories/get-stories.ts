import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Story } from '../../shared/models/story';

export const getStories = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    const { Items } = await client.send(new QueryCommand({
      TableName: process.env.TABLE,
      IndexName: 'GSI1_ByType',
      KeyConditionExpression: '#Type = :Type',
      ExpressionAttributeValues: marshall({
        ':Type': 'STORY',
      }),
      ExpressionAttributeNames: {
        '#Type': 'Type',
      },
    }));
    if (!Items) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'No Stories found.',
        }),
      };
    }
    const stories = Items.map((item) => {
      const story = unmarshall(item) as Story;
      return {
        id: story.SK.split('#')[1],
        title: story.Title,
        author: story.PK.split('#')[1],
        thumbnail: story.Thumbnail,
        createdAt: story.CreatedAt,
      };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(stories),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
};