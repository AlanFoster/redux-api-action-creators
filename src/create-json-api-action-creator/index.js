import createAPIActionCreator from '../create-api-action-creator';
import JSONAPIMiddleware from './json-api-middleware'

export default function (configuration, actionCreatorName) {
  return createAPIActionCreator(configuration, actionCreatorName, JSONAPIMiddleware);
}
