import { expect } from 'chai';
import isSuccess from '../is-success';

describe('isSuccess', function () {
  context('when the readyState is not 4', function () {
    context('when no status is present', function () {
      it('returns false', function () {
        expect(isSuccess({ readyState: 0 })).to.eql(false);
      });
    });

    context('when the number is 199', function () {
      it('returns false', function () {
        expect(isSuccess({ readyState: 0, status: 199 })).to.eql(false);
      });
    });

    context('when the number is 200', function () {
      it('returns true', function () {
        expect(isSuccess({ readyState: 0, status: 200 })).to.eql(false);
      });
    });

    context('when the number is 299', function () {
      it('returns true', function () {
        expect(isSuccess({ readyState: 0, status: 299 })).to.eql(false);
      });
    });

    context('when the number is 300', function () {
      it('returns false', function () {
        expect(isSuccess({ readyState: 0, status: 300 })).to.eql(false);
      });
    });
  });

  context('when the readyState is 4', function () {
    context('when no status is present', function () {
      it('returns false', function () {
        expect(isSuccess({ readyState: 4 })).to.eql(false);
      });
    });

    context('when the number is 199', function () {
      it('returns false', function () {
        expect(isSuccess({ readyState: 4, status: 199 })).to.eql(false);
      });
    });

    context('when the number is 200', function () {
      it('returns true', function () {
        expect(isSuccess({ readyState: 4, status: 200 })).to.eql(true);
      });
    });

    context('when the number is 299', function () {
      it('returns true', function () {
        expect(isSuccess({ readyState: 4, status: 299 })).to.eql(true);
      });
    });

    context('when the number is 300', function () {
      it('returns false', function () {
        expect(isSuccess({ readyState: 4, status: 300 })).to.eql(false);
      });
    });
  });
});
