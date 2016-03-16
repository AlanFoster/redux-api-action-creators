import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import createApiActionCreator from '../create-api-action-creator'

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
  });

  describe('pending dispatch', function () {
    context('when the pending action is missing', function () {
      beforeEach(function () {
        const actionCreatorName = 'getData';
        const configuration = {
          route: '/data',
          success: 'DATA_SUCCESS',
          error: 'DATA_ERROR'
        };

        this.actionCreator = createApiActionCreator(configuration, actionCreatorName);

        this.dispatchSpy = sinon.spy();
        const actionArguments = undefined;
        this.actionCreator(actionArguments)(this.dispatchSpy);
      });

      it('does not trigger a pending dispatch', function () {
        expect(this.dispatchSpy).not.to.have.been.calledWith({
          type: 'DATA_PENDING'
        });
      });
    });

    context('when the pending action is present', function () {
      beforeEach(function () {
        const actionCreatorName = 'getData';
        const configuration = {
          route: '/data',
          success: 'DATA_SUCCESS',
          pending: 'DATA_PENDING',
          error: 'DATA_ERROR'
        };

        this.actionCreator = createApiActionCreator(configuration, actionCreatorName);

        this.dispatchSpy = sinon.spy();
        const actionArguments = undefined;
        this.actionCreator(actionArguments)(this.dispatchSpy);
      });

      it('does trigger a pending dispatch', function () {
        expect(this.dispatchSpy).to.have.been.calledWith({
          type: 'DATA_PENDING'
        });
      });
    });
  });
});

