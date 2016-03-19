import { expect } from 'chai';
import sinon from 'sinon';
import JSONAPIMiddleware from '../json-api-middleware';

describe('JSONAPIMiddleware', function () {
  describe('onRequest', function () {
    context('when no body or headers are present', function () {
      beforeEach(function () {
        this.nextStub = sinon.stub();

        const request = { };
        const response = undefined;

        JSONAPIMiddleware.onRequest(request, response, this.nextStub);
      });

      it('provides JSON headers and serializes the body', function () {
        expect(this.nextStub).to.have.been.calledWith(
          {
            headers: { 'Content-Type': 'application/json' },
            body: undefined
          },
          undefined
        )
      });
    });

    context('when no headers were provided', function () {
      beforeEach(function () {
        this.nextStub = sinon.stub();

        const request = {
          query: { isFoo: true },
          body: { isSerialized: true }
        };
        const response = undefined;

        JSONAPIMiddleware.onRequest(request, response, this.nextStub);
      });

      it('provides JSON headers and serializes the body', function () {
        expect(this.nextStub).to.have.been.calledWith(
          {
            query: { isFoo: true },
            headers: { 'Content-Type': 'application/json'},
            body: '{"isSerialized":true}'
          },
          undefined
        )
      });
    });

    context('when headers were provided', function () {
      beforeEach(function () {
        this.nextStub = sinon.stub();

        const request = {
          query: { isFoo: true },
          headers: { previous: true },
          body: { isSerialized: true }
        };
        const response = undefined;

        JSONAPIMiddleware.onRequest(request, response, this.nextStub);
      });

      it('provides JSON headers and serializes the body', function () {
        expect(this.nextStub).to.have.been.calledWith(
          {
            query: { isFoo: true },
            headers: { previous: true, 'Content-Type': 'application/json'},
            body: '{"isSerialized":true}'
          },
          undefined
        )
      });
    });
  });

  describe('onSuccess', function () {
    // TODO: Error handling path required
    context.skip('when no body is present', function () {
      beforeEach(function () {
        this.nextStub = sinon.stub();

        const request = 'originalRequest';
        const response = { status: 200, responseText: undefined };

        JSONAPIMiddleware.onRequest(request, response, this.nextStub);
      });
    });

    context('when a serializable body is present', function () {
      beforeEach(function () {
        this.nextStub = sinon.stub();

        const request = { url: 'foo' };
        const response = { status: 200, responseText: '{"isSerialized":true}' };

        JSONAPIMiddleware.onSuccess(request, response, this.nextStub);
      });

      it('leaves the body untouched', function() {
        expect(this.nextStub).to.have.been.calledWith(
          { url: 'foo' },
          { status: 200, responseText: '{"isSerialized":true}', body: { isSerialized: true } }
        )
      });
    });
  });
});
