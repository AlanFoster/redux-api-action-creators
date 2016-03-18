import { expect } from 'chai';
import requestFor from '../request-for';

describe('RequestFor', function () {
  describe('when given no request implementation', function () {
    beforeEach(function () {
      this.result = requestFor({ route: '/data', createRequest: () => this.expectedResult });
    });

    it('returns an empty request object with only a GET URL', function () {
      expect(this.result).to.eql({ url: '/data', method: 'GET' });
    });
  });

  describe('when given a concrete request implementation', function () {
    context('and no request params are provided', function () {
      beforeEach(function () {
        this.expectedResult = { body: 'Hello World', method: 'POST', route: '/data' };
        this.result = requestFor({ route: '/data', createRequest: () => this.expectedResult });
      });

      it('returns the all existing values', function () {
        expect(this.result).to.contain(this.expectedResult);
      });

      it('returns the url', function () {
        expect(this.result.url).to.eql('/data');
      });
    });
  })
});

