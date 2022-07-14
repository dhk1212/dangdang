import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { InitiateAuthCommandOutput } from '@aws-sdk/client-cognito-identity-provider/dist-types/commands/InitiateAuthCommand';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

type LoginBody = {
  username: string;
  password: string;
}

const createAccessToken = async (username: string, password: string): Promise<InitiateAuthCommandOutput> => {
  const client = new CognitoIdentityProviderClient({ region: 'eu-central-1' });
  return client.send(new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.USER_POOL_CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  }));
};

export const login = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  if (!event.body) {
    return {
      statusCode: 400,
    };
  }

  const { username, password } = JSON.parse(event.body) as LoginBody;

  let response;

  try {
    response = await createAccessToken(username, password);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(response.AuthenticationResult),
  };
};