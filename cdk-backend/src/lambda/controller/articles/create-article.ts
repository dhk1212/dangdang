import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { parseJwt } from '../../shared';
import { Story } from '../../shared/models/story';


export type CreateArticleBody = {
  title: string;
  text: string;
  thumbnail: string;
  price: number;
}

export const createArticle = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const token = parseJwt(event.headers.authorization?.substr(7));

  if (!event.body) {
    return {
      statusCode: 400,
    };
  }

  const body = JSON.parse(event.body) as CreateArticleBody;

  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    await client.send(new PutItemCommand({
      TableName: process.env.TABLE,
      Item: marshall({
        PK: `USER#${token.preferred_username}`,
        SK: `ARTICLE#${uuidv4()}`,
        CreatedAt: new Date().toISOString(),
        Thumbnail: body.thumbnail,
        Type: 'ARTICLE',
        Text: body.text,
        Title: body.title,
        Price: body.price,
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