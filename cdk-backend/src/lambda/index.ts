import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import * as Controller from './controller';
import { EventHelper, HttpOperation } from './shared';

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event);

  const eventHelper = new EventHelper();

  // auth
  eventHelper.addRouteHandler(HttpOperation.POST, '/auth/create-login', Controller.createLogin);
  eventHelper.addRouteHandler(HttpOperation.POST, '/auth/login', Controller.login);

  // user
  eventHelper.addRouteHandler(HttpOperation.GET, '/user', Controller.getUser);

  // stories
  eventHelper.addRouteHandler(HttpOperation.GET, '/stories', Controller.getStories);
  eventHelper.addRouteHandler(HttpOperation.POST, '/stories', Controller.createStory);
  eventHelper.addRouteHandler(HttpOperation.GET, '/stories/{storyId}', Controller.getStoryById);
  eventHelper.addRouteHandler(HttpOperation.DELETE, '/stories/{storyId}', Controller.deleteStory);
  eventHelper.addRouteHandler(HttpOperation.PUT, '/stories/{storyId}', Controller.updateStory);

  // articles
  eventHelper.addRouteHandler(HttpOperation.GET, '/articles', Controller.getArticles);
  eventHelper.addRouteHandler(HttpOperation.POST, '/articles', Controller.createArticle);
  eventHelper.addRouteHandler(HttpOperation.GET, '/articles/{articleId}', Controller.getArticleById);
  eventHelper.addRouteHandler(HttpOperation.DELETE, '/articles/{articleId}', Controller.deleteArticle);
  eventHelper.addRouteHandler(HttpOperation.PUT, '/articles/{articleId}', Controller.updateArticle);

  // health-reports
  eventHelper.addRouteHandler(HttpOperation.GET, '/health-reports', Controller.getHealth);
  eventHelper.addRouteHandler(HttpOperation.POST, '/health-reports', Controller.createHealth);
  eventHelper.addRouteHandler(HttpOperation.GET, '/health-reports/{healthId}', Controller.getHealthById);
  eventHelper.addRouteHandler(HttpOperation.DELETE, '/health-reports/{healthId}', Controller.deleteHealth);
  eventHelper.addRouteHandler(HttpOperation.PUT, '/health-reports/{healthId}', Controller.updateHealth);

  // meetups
  eventHelper.addRouteHandler(HttpOperation.GET, '/meetups', Controller.getMeetups);
  eventHelper.addRouteHandler(HttpOperation.POST, '/meetups', Controller.createMeetup);
  eventHelper.addRouteHandler(HttpOperation.GET, '/meetups/{meetupId}', Controller.getMeetupById);
  eventHelper.addRouteHandler(HttpOperation.DELETE, '/meetups/{meetupId}', Controller.deleteMeetup);
  eventHelper.addRouteHandler(HttpOperation.PUT, '/meetups/{meetupId}', Controller.updateMeetup);

  // adoptions
  eventHelper.addRouteHandler(HttpOperation.GET, '/adoptions', Controller.getAdoption);
  eventHelper.addRouteHandler(HttpOperation.POST, '/adoptions', Controller.createAdoption);
  eventHelper.addRouteHandler(HttpOperation.GET, '/adoptions/{adoptionId}', Controller.getAdoptionById);
  eventHelper.addRouteHandler(HttpOperation.DELETE, '/adoptions/{adoptionId}', Controller.deleteAdoption);
  eventHelper.addRouteHandler(HttpOperation.PUT, '/adoptions/{adoptionId}', Controller.updateAdoption);

  return eventHelper.handleRoute(event);
};
