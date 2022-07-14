import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { parseJwt } from '../../shared';
import { Story } from '../../shared/models/story';


export type UpdateStoryBody = {
  title: string;
  text: string;
  thumbnail: string;
}

export const updateStory = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const token = parseJwt(event.headers.authorization?.substr(7));

  if (!event.body) {
    return {
      statusCode: 400,
    };
  }

  const body = JSON.parse(event.body) as UpdateStoryBody;

  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    const { Item } = await client.send(new GetItemCommand({
      TableName: process.env.TABLE,
      Key: marshall({
        PK: `USER#${token.preferred_username}`,
        SK: `STORY#${event.pathParameters?.storyId}`,
      }),
    }));
    if (!Item) {
      return {
        statusCode: 400,
      };
    }
    await client.send(new PutItemCommand({
      TableName: process.env.TABLE,
      Item: marshall({
        ...unmarshall(Item),
        Thumbnail: body.thumbnail,
        Text: body.text,
        Title: body.title,
      } as Story),
    }));
    return {
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
};