import { expect } from 'chai';
import sinon from 'sinon';
const proxyquire = require('proxyquire').noCallThru();

describe('Xhr', function () {
  beforeEach(function () {
    this.requests = [];
    this.isSuccessStub = sinon.stub().returns(true);

    this.fakeXHR = sinon.useFakeXMLHttpRequest();
    this.fakeXHR.onCreate = (request) => this.requests.push(request);

    this.xhrWrapper = proxyquire('../index', {
      './raw-xhr': this.fakeXHR,
      './is-success': this.isSuccessStub
    }).default;
  });

  afterEach(function () {
    this.fakeXHR.restore();
  });

  describe('#GET', function () {
    beforeEach(function () {
      this.onSuccessStub = sinon.stub();
      this.result = this.xhrWrapper({
        url: 'custom-url'
      }, this.onSuccessStub);
      this.getRequest = this.requests[0];
    });

    it('sets the URL correctly', function () {
      expect(this.getRequest.url).to.eql('custom-url');
    });

    it('sets the request body', function () {
      expect(this.getRequest.body).to.eql(undefined);
    });

    it('sets the request headers', function () {
      expect(this.getRequest.requestHeaders).to.eql({});
    });

    it('sets the method type as GET', function () {
      expect(this.getRequest.method).to.eql('GET');
    });

    describe('when the XHR completes', function () {
      context('and the status codes are valid', function () {
        beforeEach(function () {
          const statusCode = 200;
          const responseHeaders = { "Content-Type": "application/json" };
          const responseBody = '{ "success": true }';

          this.isSuccessStub.returns(true);
          this.getRequest.respond(statusCode, responseHeaders, responseBody);
        });

        it('calls the isSuccess test', function () {
          expect(this.isSuccessStub).to.have.been.called;
        });

        it('calls the onSuccess callback', function () {
          expect(this.onSuccessStub).to.have.been.called;
        });

        it('contains an object with the status code', function () {
          expect(this.onSuccessStub).to.have.been.calledWithMatch({ status: 200 });
        });

        it('contains an object with the responseText', function () {
          expect(this.onSuccessStub).to.have.been.calledWithMatch({ responseText: '{ "success": true }' });
        });
      });

      context('and the status codes are not valid', function () {
        beforeEach(function () {
          const statusCode = 404;
          const responseHeaders = { "Content-Type": "application/json" };
          const responseBody = '{ "success": true }';

          this.isSuccessStub.returns(false);
          this.getRequest.respond(statusCode, responseHeaders, responseBody);
        });

        it('does not call the onSuccess callback', function () {
          expect(this.onSuccessStub).not.to.have.been.called;
        });
      });
    });
  });
});

