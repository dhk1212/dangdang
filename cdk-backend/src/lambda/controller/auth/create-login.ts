import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

type CreateLoginBody = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

const createUserInCognito = async (email: string, password: string) => {
  const client = new CognitoIdentityProviderClient({ region: 'eu-central-1' });
  return client.send(new SignUpCommand({
    ClientId: process.env.USER_POOL_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
      {
        Name: 'preferred_username',
        Value: email,
      },
    ],
  }));
};

const createUserInDynamoDb = async (props: CreateLoginBody) => {
  const {
    email,
    firstName,
    lastName,
    username,
    password,
  } = props;
  const client = new DynamoDBClient({ region: 'eu-central-1' });
  await client.send(new PutItemCommand({
    TableName: process.env.TABLE,
    Item: marshall({
      PK: `USER#${email}`,
      SK: `USER#${email}`,
      Username: username,
      Password: password,
      FirstName: firstName,
      LastName: lastName,
      Type: 'USER',
    }),
  }));
};

const validateBody = (body: CreateLoginBody) => {
  return Object.keys(body).length === 5;
};

export const createLogin = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  if (!event.body) {
    return {
      statusCode: 400,
    };
  }

  const body = JSON.parse(event.body) as CreateLoginBody;

  if (!validateBody(body)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid request body.',
      }),
    };
  }

  try {
    await createUserInCognito(body.email, body.password);
    await createUserInDynamoDb(body);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'User with email already exists.',
      }),
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Created Login',
    }),
  };
};