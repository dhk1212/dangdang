## Dang Dang

## Setup
To start the website, need to do (inside of `vue-frontend`):
1. npm install
2. npm run dev

Backend is deployed on AWS and ready to be used.
### Layout
`cdk-backend` - AWS Backend with CDK <br /> 
`vue-frontend` - Vue Frontend

### cdk-backend
For more info: `cdk-backend/README.md`

Sources Used:
- Official Documentation: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html

Backend is programmed using Typescript and is leveraging the following AWS - Services:
- Congito (user authentication)
- Http Gateway (expose gateway)
- Lambda (deploy code to on demand lambda)
- DynamoDb (Key - Store database)
- Cloudformation (Deploy with IAC. Using AWS CDK to generate Cloudformation template)

### vue-frontend
For more info: `vue-frontend/README.md`

Sources Used: 
For Styling:

- https://codepen.io/Khalideofficial/pen/dyXodWE?editors=1100
- https://codepen.io/hamzakh777/pen/xNPpeP
- https://www.youtube.com/watch?v=qGwAun-03N8
- https://codepen.io/bugraskl/pen/LYbbqxv
- https://codepen.io/kamblack/pen/GXPGZq?editors=1100
- https://codepen.io/maheshambure21/pen/GgVbVW
- https://fonts.google.com/specimen/Montserrat
- https://codepen.io/FlorinPop17/pen/EJKgKB
- https://codepen.io/bchiang7/pen/KwemNm

Frontend is programmed using Javascript and vue.

#### Registration
- registration works without confirmation of e-mail. It will be automatically confirmed.
- an existing user dangdang1@mailinator.com // Test123. can be used