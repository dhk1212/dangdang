import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { parseJwt } from '../../shared';
import { Story } from '../../shared/models/story';


export type CreateStoryBody = {
  title: string;
  text: string;
  thumbnail: string;
}

export const createStory = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const token = parseJwt(event.headers.authorization?.substr(7));

  if (!event.body) {
    return {
      statusCode: 400,
    };
  }

  const body = JSON.parse(event.body) as CreateStoryBody;

  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    await client.send(new PutItemCommand({
      TableName: process.env.TABLE,
      Item: marshall({
        PK: `USER#${token.preferred_username}`,
        SK: `STORY#${uuidv4()}`,
        CreatedAt: new Date().toISOString(),
        Thumbnail: body.thumbnail,
        Type: 'STORY',
        Text: body.text,
        Title: body.title,
      } as Story),
    }));
    return {
      statusCode: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
};