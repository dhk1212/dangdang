import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { parseJwt } from '../../shared';
import { Adoption } from '../../shared/models/adoption';

export type CreateAdoptionBody = {
  title: string;
  text: string;
  thumbnail: string;
  price: number;
  breed: string;
  age: number;
  gender: string;
}

export const createAdoption = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);
  const token = parseJwt(event.headers.authorization?.substr(7));

  if (!event.body) {
    return {
      statusCode: 400,
    };
  }

  const body = JSON.parse(event.body) as CreateAdoptionBody;

  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    await client.send(new PutItemCommand({
      TableName: process.env.TABLE,
      Item: marshall({
        PK: `USER#${token.preferred_username}`,
        SK: `ADOPTION#${uuidv4()}`,
        CreatedAt: new Date().toISOString(),
        Type: 'ADOPTION',
        Title: body.title,
        Thumbnail: body.thumbnail,
        Text: body.text,
        Price: body.price,
        Breed: body.breed,
        Age: body.age,
        Gender: body.gender,
      } as Adoption),
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