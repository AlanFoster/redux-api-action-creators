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
        const createRequest = function () {
          return {
            body: 'Hello World',
            headers: { 'Custom-Header': true }
          };
        };

        this.result = requestFor({
          route: '/data',
          method: 'POST',
          createRequest
        });
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

    context('and request params are provided', function () {
      beforeEach(function () {
        const createRequest = function (blog) {
          return {
            headers: { 'Custom-Header': true },
            params: {
              id: blog.id
            },
            body: 'fake body'
          };
        };

        this.result = requestFor({
          route: '/blog/:id/vote',
          method: 'POST',
          createRequest
        }, { id: 123 });
      });

      it('returns the route method, body, and headers', function () {
        expect(this.result).to.eql({
          headers: {
            'Custom-Header': true
          },
          params: {
            id: 123
          },
          body: 'fake body',
          method: 'POST',
          url: '/blog/123/vote'
        });
      });
    });
  });
});

