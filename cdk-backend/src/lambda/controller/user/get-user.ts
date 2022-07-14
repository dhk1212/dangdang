import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { parseJwt, User } from '../../shared';

export const getUser = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const token = parseJwt(event.headers.authorization?.substr(7));

  const client = new DynamoDBClient({ region: 'eu-central-1' });

  try {
    const { Item } = await client.send(new GetItemCommand({
      TableName: process.env.TABLE,
      Key: marshall({
        PK: `USER#${token.preferred_username}`,
        SK: `USER#${token.preferred_username}`,
      }),
    }));
    if (!Item) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'User not found.',
        }),
      };
    }
    const user = unmarshall(Item) as User;
    return {
      statusCode: 200,
      body: JSON.stringify({
        email: user.PK.split('#')[1],
        firstName: user.FirstName,
        lastName: user.LastName,
        username: user.Username,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
    };
  }
};