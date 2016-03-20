import { expect } from 'chai';
import requestFor from '../request-for';

describe('RequestFor', function () {
  describe('when given no request implementation', function () {
    beforeEach(function () {
      this.result = requestFor({ route: '/data' });
    });

    it('returns an empty request object with only a GET URL', function () {
      expect(this.result).to.eql({ url: '/data', method: 'GET' });
    });
  });

  describe('when given a concrete request implementation', function () {
    context('and no request params are provided', function () {
      beforeEach(function () {
        const createRequestResult = { body: 'Hello World', headers: { 'Custom-Header': true } };
        this.result = requestFor({ route: '/data', method: 'POST', createRequest: () => createRequestResult });
      });

      it('returns the route method, body, and headers', function () {
        expect(this.result).to.eql({
          body: 'Hello World',
          headers: {
            'Custom-Header': true
          },
          method: 'POST',
          url: '/data'
        });
      });
    });
  })
});

