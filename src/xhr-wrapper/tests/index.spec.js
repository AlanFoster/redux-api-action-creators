import { expect } from 'chai';
import sinon from 'sinon';
const proxyquire = require('proxyquire').noCallThru();

describe('Xhr', function () {
  let makeRequest = function (request) {
    this.onSuccessStub = sinon.stub();
    this.result = this.xhrWrapper(request, this.onSuccessStub);
    this.getRequest = this.requests[0];
  };

  const request = function () {
    return {
      url: 'custom-url'
    };
  };

  const requestWithHeaders = function () {
    return {
      url: 'custom-url',
      headers: { 'custom-header': true }
    };
  };

  const requestWithNoBody = function () {
    return {
      url: 'custom-url',
      method: 'POST'
    };
  };

  const requestWithBody = function () {
    return {
      url: 'custom-url',
      method: 'POST',
      body: 'custom body'
    };
  };

  beforeEach(function () {
    this.requests = [];
    this.isSuccessStub = sinon.stub().returns(true);

    this.fakeXHR = sinon.useFakeXMLHttpRequest();
    this.fakeXHR.onCreate = (request) => this.requests.push(request);

    this.xhrWrapper = proxyquire('../index', {
      './raw-xhr': this.fakeXHR,
      './is-success': this.isSuccessStub
    }).default;

    makeRequest = makeRequest.bind(this);
  });

  afterEach(function () {
    this.fakeXHR.restore();
  });

  describe('headers', function () {
    context('when no headers are sent', function () {
      beforeEach(function () {
        makeRequest(request());
      });

      it('sets the request headers', function () {
        expect(this.getRequest.requestHeaders).to.eql({});
      });
    });

    context('when headers are sent', function () {
      beforeEach(function () {
        makeRequest(requestWithHeaders());
      });

      it('sets the request headers', function () {
        expect(this.getRequest.requestHeaders).to.eql({
          'custom-header': true
        });
      });
    });
  });

  describe('#GET', function () {
    describe('setting the request values correctly', function () {
      beforeEach(function () {
        makeRequest(requestWithHeaders());
      });

      it('sets the URL correctly', function () {
        expect(this.getRequest.url).to.eql('custom-url');
      });

      it('sets the request body', function () {
        expect(this.getRequest.body).to.eql(undefined);
      });

      it('sets the request headers', function () {
        expect(this.getRequest.requestHeaders).to.eql({
          'custom-header': true
        });
      });

      it('sets the method type as GET', function () {
        expect(this.getRequest.method).to.eql('GET');
      });
    });

    describe('when the XHR completes', function () {
      context('and the status codes are valid', function () {
        beforeEach(function () {
          const statusCode = 200;
          const responseHeaders = { 'Content-Type': 'application/json' };
          const responseBody = '{ "success": true }';

          this.isSuccessStub.returns(true);

          makeRequest(requestWithHeaders());
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
          const responseHeaders = { 'Content-Type': 'application/json' };
          const responseBody = '{ "success": true }';

          this.isSuccessStub.returns(false);

          makeRequest(requestWithHeaders());
          this.getRequest.respond(statusCode, responseHeaders, responseBody);
        });

        it('does not call the onSuccess callback', function () {
          expect(this.onSuccessStub).not.to.have.been.called;
        });
      });
    });
  });

  describe('#POST', function () {
    describe('body', function () {
      context('when no body is sent', function () {
        beforeEach(function () {
          makeRequest(requestWithNoBody());
        });

        it('sets the request body', function () {
          expect(this.getRequest.requestBody).to.eql(undefined);
        });
      });

      context('when headers are sent', function () {
        beforeEach(function () {
          makeRequest(requestWithBody());
        });

        it('sets the request body', function () {
          expect(this.getRequest.requestBody).to.eql('custom body');
        });
      });
    });
  });
});

