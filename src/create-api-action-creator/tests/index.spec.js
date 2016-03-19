import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
const proxyquire = require('proxyquire').noCallThru();

describe('CreateApiActionCreator', function () {
  let createApiActionCreator = function (...args) {
    this.xhrStub = sinon.stub();

    return proxyquire('../index', {
      '../xhr-wrapper': this.xhrStub
    }).default(...args);
  };

  beforeEach(function () {
    createApiActionCreator = createApiActionCreator.bind(this);
  });

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

        this.dispatchStub = sinon.mock();
        const actionArguments = undefined;
        this.actionCreator(actionArguments)(this.dispatchStub);
      });

      it('does not trigger a pending dispatch', function () {
        expect(this.dispatchStub).not.to.have.been.calledWith({
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

        this.dispatchStub = sinon.mock();
        const actionArguments = undefined;
        this.actionCreator(actionArguments)(this.dispatchStub);
      });

      it('does trigger a pending dispatch', function () {
        expect(this.dispatchStub).to.have.been.calledWith({
          type: 'DATA_PENDING'
        });
      });
    });
  });

  describe('success dispatch', function () {
    beforeEach(function () {
      const actionCreatorName = 'getData';
      const configuration = {
        route: '/data',
        success: 'DATA_SUCCESS',
        pending: 'DATA_PENDING',
        error: 'DATA_ERROR'
      };

      this.actionCreator = createApiActionCreator(configuration, actionCreatorName);

      this.dispatchStub = sinon.stub();
      const actionArguments = undefined;
      this.actionCreator(actionArguments)(this.dispatchStub);
    });

    context('when the xhr returns a success', function () {
      beforeEach(function () {
        const onSuccessIndex = 1;
        this.xhrStub.callArgWith(onSuccessIndex, { status: 200 });
      });

      it('calls the XHR object correctly', function () {
        expect(this.xhrStub).to.have.been.calledWith({
          url: '/data', method: 'GET'
        });
      });

      it('calls the success dispatch', function () {
        expect(this.dispatchStub).to.have.been.calledWith({
          type: 'DATA_SUCCESS',
          request: { url: '/data', method: 'GET' },
          response: { status: 200 }
        });
      });
    });
  });

  describe('middleware', function () {
    beforeEach(function () {
      this.onRequestMiddlewareSpy = sinon.spy(function (request, response, next) {
        const newHeaders = _.extend({ }, request.headers, { 'custom-header': true });
        const newRequest = _.extend({ }, request, { headers: newHeaders });
        next(newRequest, response);
      });

      this.onSuccessMiddlewareSpy = sinon.spy(function (request, response, next) {
        const newResponse = _.extend({ }, response, { body: response.responseText.toUpperCase() });
        next(request, newResponse);
      });
    });

    context('when onRequest is only provided', function () {
      beforeEach(function () {
        const actionCreatorName = 'getData';
        const configuration = {
          route: '/data',
          success: 'DATA_SUCCESS',
          pending: 'DATA_PENDING',
          error: 'DATA_ERROR'
        };

        this.actionCreator = createApiActionCreator(configuration, actionCreatorName, {
          onRequest: this.onRequestMiddlewareSpy
        });

        this.dispatchStub = sinon.stub();
        const actionArguments = undefined;
        this.actionCreator(actionArguments)(this.dispatchStub);
      });

      context('when the xhr returns a success', function () {
        beforeEach(function () {
          const onSuccessIndex = 1;
          this.xhrStub.callArgWith(onSuccessIndex, { status: 200, responseText: 'hello world' });
        });

        it('calls the onRequest middleware correctly', function () {
          expect(this.onRequestMiddlewareSpy).to.have.been.calledWith(
            { url: '/data', method: 'GET' },
            undefined,
            sinon.match.func
          );
        });

        it('calls the XHR object correctly', function () {
          expect(this.xhrStub).to.have.been.calledWith({
            url: '/data', method: 'GET', headers: { 'custom-header': true }
          });
        });

        it('calls the success dispatch', function () {
          expect(this.dispatchStub).to.have.been.calledWith({
            type: 'DATA_SUCCESS',
            request: { url: '/data', method: 'GET', headers: { 'custom-header': true } },
            response: { status: 200, responseText: 'hello world' }
          });
        });
      });
    });

    context('when both onRequest and onSuccess are provided', function () {
      beforeEach(function () {
        const actionCreatorName = 'getData';
        const configuration = {
          route: '/data',
          success: 'DATA_SUCCESS',
          pending: 'DATA_PENDING',
          error: 'DATA_ERROR'
        };

        this.actionCreator = createApiActionCreator(configuration, actionCreatorName, {
          onRequest: this.onRequestMiddlewareSpy,
          onSuccess: this.onSuccessMiddlewareSpy
        });

        this.dispatchStub = sinon.stub();
        const actionArguments = undefined;
        this.actionCreator(actionArguments)(this.dispatchStub);
      });

      context('when the xhr returns a success', function () {
        beforeEach(function () {
          const onSuccessIndex = 1;
          this.xhrStub.callArgWith(onSuccessIndex, { status: 200, responseText: 'hello world' });
        });

        it('calls the onRequest middleware correctly', function () {
          expect(this.onRequestMiddlewareSpy).to.have.been.calledWith(
            { url: '/data', method: 'GET' },
            undefined,
            sinon.match.func
          );
        });

        it('calls the onSuccess middleware correctly', function () {
          expect(this.onSuccessMiddlewareSpy).to.have.been.calledWith(
            { url: '/data', method: 'GET', headers: { 'custom-header': true } },
            { status: 200, responseText: 'hello world' },
            sinon.match.func
          );
        });

        it('calls the XHR object correctly', function () {
          expect(this.xhrStub).to.have.been.calledWith({
            url: '/data', method: 'GET', headers: { 'custom-header': true }
          });
        });

        it('calls the success dispatch', function () {
          expect(this.dispatchStub).to.have.been.calledWith({
            type: 'DATA_SUCCESS',
            request: { url: '/data', method: 'GET', headers: { 'custom-header': true } },
            response: { status: 200, responseText: 'hello world', body: 'HELLO WORLD' }
          });
        });
      });
    });
  });
});
