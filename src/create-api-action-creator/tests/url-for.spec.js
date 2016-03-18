import { expect } from 'chai';
import urlFor from '../url-for';

describe('UrlFor', function () {
  context('when given no additional request values', function () {
    beforeEach(function () {
      const request = {

      };
      const route = '/data';
      this.result = urlFor(request, route);
    });

    it('returns the same url as the route', function () {
      expect(this.result).to.eql('/data');
    });
  });

  describe('interpolating name params', function () {
    context('when no params are provided', function () {
      beforeEach(function () {
        const request = {
          params: { }
        };
        const route = '/blog';
        this.result = urlFor(request, route);
      });

      it('returns the same url as the route', function () {
        expect(this.result).to.eql('/blog');
      });
    });

    context('when no interpolation is required', function () {
      beforeEach(function () {
        const request = {
          params: { fooId: '1234' }
        };
        const route = '/blog';
        this.result = urlFor(request, route);
      });

      it('returns the same url as the route', function () {
        expect(this.result).to.eql('/blog');
      });
    });

    context('when interpolation is required', function () {
      beforeEach(function () {
        const request = {
          params: {
            blogId: 'blog-id',
            amount: 123
          }
        };
        const route = '/blog/:blogId/vote/:amount';
        this.result = urlFor(request, route);
      });

      it('interpolates values', function () {
        expect(this.result).to.eql('/blog/blog-id/vote/123');
      });
    });

    context('when interpolation is ambiguous', function () {
      beforeEach(function () {
        const request = {
          params: {
            small: 'invalid_value_interpolated',
            smallId: 'correct_interpolation'
          }
        };
        const route = '/:smallId';
        this.result = urlFor(request, route);
      });

      it('chooses the larger match', function () {
        expect(this.result).to.eql('/correct_interpolation');
      });
    });

    context('when interpolation can happen multiple times', function () {
      beforeEach(function () {
        const request = {
          params: {
            car: 'car',
            carpet: 'carpet'
          }
        };
        const route = '/:carpet/:car/:carpet/:carpet/:car';
        this.result = urlFor(request, route);
      });

      it('interpolates multiple times', function () {
        expect(this.result).to.eql('/carpet/car/carpet/carpet/car');
      });
    });
  });

  describe('query string', function () {
    context('when no interpolation is required', function () {
      beforeEach(function () {
        const request = {
          query: { }
        };
        const route = '/blog';
        this.result = urlFor(request, route);
      });

      it('returns the same url as the route', function () {
        expect(this.result).to.eql('/blog');
      });
    });

    context('when a single query string value is supplied', function () {
      beforeEach(function () {
        const request = {
          query: {
            sortOrder: 'ASC'
          }
        };
        const route = '/blog';
        this.result = urlFor(request, route);
      });

      it('sets the single sort order value', function () {
        expect(this.result).to.eql('/blog?sortOrder=ASC');
      });
    });

    context('when multiple query string values are supplied', function () {
      beforeEach(function () {
        const request = {
          params: {
            blogId: 'blog-id',
            amount: 123
          },
          query: {
            id: 1234,
            customerName: 'john',
            sortOrder: 'ASC'
          }
        };
        const route = '/blog';
        this.result = urlFor(request, route);
      });

      it('sets all values', function () {
        expect(this.result).to.eql('/blog?id=1234&customerName=john&sortOrder=ASC');
      });
    });

    context('when entity encoding is required', function () {
      beforeEach(function () {
        const request = {
          params: {
            blogId: 'blog-id',
            amount: 123
          },
          query: {
            miscChars: ', / ? : @ & = + $ #',
            customerName: 'john cleese',
            sortOrder: '<'
          }
        };
        const route = '/blog';
        this.result = urlFor(request, route);
      });

      it('sets all values', function () {
        expect(this.result).to.eql('/blog?miscChars=%2C%20%2F%20%3F%20%3A%20%40%20%26%20%3D%20%2B%20%24%20%23&customerName=john%20cleese&sortOrder=%3C');
      });
    });
  });
});

