import * as path from 'path';
import { CorsHttpMethod, HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpUserPoolAuthorizer } from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { App, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { UserPool, UserPoolOperation, VerificationEmailStyle } from 'aws-cdk-lib/aws-cognito';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class DangDang extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    /**
     * Cognito user pool
     */
    const userPool = new UserPool(this, 'UserPool', {
      removalPolicy: RemovalPolicy.DESTROY,
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: 'Verify your e-mail before you start using DangDang!',
        emailBody: 'Thanks for signing up to DangDang Community! Please verify your account with code {####}',
        emailStyle: VerificationEmailStyle.CODE,
      },
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
    });
    userPool.addTrigger(
      UserPoolOperation.PRE_SIGN_UP,
      new NodejsFunction(this, 'PreSignUpLambda', {
        functionName: 'DangDangPreSignLambda',
        entry: path.join(__dirname, 'confirm-sign-up/index.js'),
        timeout: Duration.seconds(30),
        bundling: {
          minify: true,
        },
        memorySize: 1024,
      }));
    const userPoolClient = userPool.addClient('UserPoolClient', {
      authFlows: {
        userPassword: true,
      },
      accessTokenValidity: Duration.hours(24),
      idTokenValidity: Duration.hours(24),
      refreshTokenValidity: Duration.days(30),
    });

    /**
     * Create database (DynamoDB) in AWS
     */
    const table = new Table(this, 'DangDangTable', {
      partitionKey: {
        name: 'PK',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'SK',
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    table.addGlobalSecondaryIndex({
      indexName: 'GSI1_ByType',
      partitionKey: {
        name: 'Type',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'PK',
        type: AttributeType.STRING,
      },
    });
    table.addGlobalSecondaryIndex({
      indexName: 'GSI2_BySK',
      partitionKey: {
        name: 'SK',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'PK',
        type: AttributeType.STRING,
      },
    });

    /**
     * Deploy api as lambda with function url
     */
    const lambda = new NodejsFunction(this, 'ApiLambda', {
      functionName: 'DangDangApiLambda',
      entry: path.join(__dirname, 'lambda/index.ts'),
      timeout: Duration.seconds(30),
      bundling: {
        minify: true,
      },
      memorySize: 1024,
      environment: {
        TABLE: table.tableName,
        USER_POOL_ARN: userPool.userPoolArn,
        USER_POOL_CLIENT_ID: userPoolClient.userPoolClientId,
      },
    });
    lambda.addToRolePolicy(new PolicyStatement({
      actions: ['dynamodb:*'],
      resources: ['*'],
    }));
    lambda.addToRolePolicy(new PolicyStatement({
      actions: ['cognito:*'],
      resources: ['*'],
    }));

    /**
     * Api Gateway
     */
    const api = new HttpApi(this, 'Api', {
      corsPreflight: {
        allowHeaders: ['*'],
        allowMethods: [CorsHttpMethod.ANY],
        allowOrigins: ['*'],
      },
    });
    const defaultIntegration = new HttpLambdaIntegration('ApiIntegration', lambda);
    const authorizer = new HttpUserPoolAuthorizer('ApiAuthorizer', userPool, {
      userPoolClients: [userPoolClient],
    });

    /**
     * User
     */
    api.addRoutes({
      path: '/user',
      methods: [HttpMethod.GET],
      integration: defaultIntegration,
      authorizer,
    });

    /**
     * Auth
     */
    api.addRoutes({
      path: '/auth/create-login',
      methods: [HttpMethod.POST],
      integration: defaultIntegration,
    });
    api.addRoutes({
      path: '/auth/login',
      methods: [HttpMethod.POST],
      integration: defaultIntegration,
    });

    /**
     * Stories
     */
    api.addRoutes({
      path: '/stories',
      methods: [HttpMethod.GET],
      integration: defaultIntegration,
    });
    api.addRoutes({
      path: '/stories',
      methods: [HttpMethod.POST],
      integration: defaultIntegration,
      authorizer,
    });
    api.addRoutes({
      path: '/stories/{storyId}',
      methods: [HttpMethod.GET, HttpMethod.DELETE],
      integration: defaultIntegration,
    });
    api.addRoutes({
      path: '/stories/{storyId}',
      methods: [HttpMethod.PUT],
      integration: defaultIntegration,
      authorizer,
    });

    /**
     * Articles
     */
    api.addRoutes({
      path: '/articles',
      methods: [HttpMethod.GET],
      integration: defaultIntegration,
    });
    api.addRoutes({
      path: '/articles',
      methods: [HttpMethod.POST],
      integration: defaultIntegration,
      authorizer,
    });
    api.addRoutes({
      path: '/articles/{articleId}',
      methods: [HttpMethod.GET, HttpMethod.DELETE],
      integration: defaultIntegration,
    });
    api.addRoutes({
      path: '/articles/{articleId}',
      methods: [HttpMethod.PUT],
      integration: defaultIntegration,
      authorizer,
    });

    /**
     * Articles
     */
    api.addRoutes({
      path: '/health-reports',
      methods: [HttpMethod.GET],
      integration: defaultIntegration,
    });
    api.addRoutes({
      path: '/health-reports',
      methods: [HttpMethod.POST],
      integration: defaultIntegration,
      authorizer,
    });
    api.addRoutes({
      path: '/health-reports/{healthId}',
      methods: [HttpMethod.GET, HttpMethod.DELETE],
      integration: defaultIntegration,
    });
    api.addRoutes({
      path: '/health-reports/{healthId}',
      methods: [HttpMethod.PUT],
      integration: defaultIntegration,
      authorizer,
    });

    /**
     * Meetups
     */
    api.addRoutes({
      path: '/meetups',
      methods: [HttpMethod.GET],
      integration: defaultIntegration,
    });
    api.addRoutes({
      path: '/meetups',
      methods: [HttpMethod.POST],
      integration: defaultIntegration,
      authorizer,
    });
    api.addRoutes({
      path: '/meetups/{meetupId}',
      methods: [HttpMethod.GET, HttpMethod.DELETE],
      integration: defaultIntegration,
    });
    api.addRoutes({
      path: '/meetups/{meetupId}',
      methods: [HttpMethod.PUT],
      integration: defaultIntegration,
      authorizer,
    });

    /**
     * Adoptions
     */
    api.addRoutes({
      path: '/adoptions',
      methods: [HttpMethod.GET],
      integration: defaultIntegration,
    });
    api.addRoutes({
      path: '/adoptions',
      methods: [HttpMethod.POST],
      integration: defaultIntegration,
      authorizer,
    });
    api.addRoutes({
      path: '/adoptions/{adoptionId}',
      methods: [HttpMethod.GET, HttpMethod.DELETE],
      integration: defaultIntegration,
    });
    api.addRoutes({
      path: '/adoptions/{adoptionId}',
      methods: [HttpMethod.PUT],
      integration: defaultIntegration,
      authorizer,
    });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new DangDang(app, 'dangdang-backend-dev', { env: devEnv });

app.synth();