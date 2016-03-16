import { expect } from 'chai';
import apiActionCreator from '../'
import _ from 'lodash';

describe('ApiActionCreator', function () {
  describe('when passed no configuration', function () {
    beforeEach(function () {
      this.actionCreators = apiActionCreator({});
    });

    it('returns no dispatchers', function () {
      expect(this.actionCreators).to.eql({});
    });
  });

  describe('when passed a single route', function () {
    describe('and there is a missing route', function () {
      it('then throws an error', function () {
        const configuration = {
          getData: {
            success: 'DATA_SUCCESS',
            pending: 'DATA_PENDING',
            error: 'DATA_ERROR'
          }
        };

        expect(() => apiActionCreator(configuration)).to.throw(/Missing route/i);
      })
    });

    describe('missing success', function () {
      it('then throws an error', function () {
        const configuration = {
          getData: {
            route: '/data',
            pending: 'DATA_PENDING',
            error: 'DATA_ERROR'
          }
        };

        expect(() => apiActionCreator(configuration)).to.throw(/Missing success/i);
      })
    });

    describe('missing pending', function () {
      it('does not throw an error', function () {
        const configuration = {
          getData: {
            route: '/data',
            success: 'DATA_SUCCESS',
            error: 'DATA_ERROR'
          }
        };

        expect(() => apiActionCreator(configuration)).not.to.throw();
      });
    });

    describe('missing error', function () {
      it('does not throw an error', function () {
        const configuration = {
          getData: {
            route: '/data',
            success: 'DATA_SUCCESS'
          }
        };

        expect(() => apiActionCreator(configuration)).not.to.throw();
      });
    });

    describe('returns the action creator', function () {
      beforeEach(function () {
        this.actionCreators = apiActionCreator({
          getData: {
            route: '/data',
            success: 'DATA_SUCCESS',
            pending: 'DATA_PENDING',
            error: 'DATA_ERROR'
          }
        });
      });

      it('creates all action creators', function () {
        expect(_.keys(this.actionCreators)).to.eql(['getData']);
      });

      it('returns a function for getData', function () {
        expect(this.actionCreators.getData).to.be.a('function');
      });
    });
  });
});

