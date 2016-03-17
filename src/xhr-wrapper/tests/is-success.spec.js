import { expect } from 'chai';
import isSuccess from '../is-success';

describe('isSuccess', function () {
  context('when no status is present', function () {
    it('returns false', function () {
      expect(isSuccess()).to.eql(false);
    })
  });

  context('when the number is 199', function () {
    it('returns false', function () {
      expect(isSuccess({ status: 199 })).to.eql(false);
    })
  });

  context('when the number is 200', function () {
    it('returns true', function () {
      expect(isSuccess({ status: 200 })).to.eql(true);
    })
  });

  context('when the number is 299', function () {
    it('returns true', function () {
      expect(isSuccess({ status: 299 })).to.eql(true);
    })
  });

  context('when the number is 300', function () {
    it('returns false', function () {
      expect(isSuccess({ status: 300 })).to.eql(false);
    })
  });
});
