import { expect } from 'chai';
import createApiActionCreator from '../create-api-action-creator'
import _ from 'lodash';

describe('CreateApiActionCreator', function () {
  describe('when given a valid configuration', function () {
    beforeEach(function () {
      const actionCreatorName = 'getData';
      const configuration = {
        route: '/data',
        success: 'DATA_SUCCESS',
        pending: 'DATA_PENDING',
        error: 'DATA_ERROR'
      };

      this.actionCreator = createApiActionCreator(configuration, actionCreatorName);
    });

    it('creates the action creator function', function () {
      expect(this.actionCreator).to.be.a('Function');
    });
  })
});

