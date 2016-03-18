import validate from '../validate-configuration';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Validation', function () {
  describe('validating route', function () {
    context('when the route is provided', function () {
      beforeEach(function () {
        this.onErrorStub = sinon.spy();
        const configuration = {
          route: 'foo.json'
        };
        validate(configuration, this.onErrorStub);
      });

      it('does not trigger an error', function () {
        expect(this.onErrorStub).not.to.have.been.calledWith('Missing route');
      });
    });

    context('when the route is not provided', function () {
      beforeEach(function () {
        this.onErrorStub = sinon.spy();
        const configuration = {
        };
        validate(configuration, this.onErrorStub);
      });

      it('does trigger an error', function () {
        expect(this.onErrorStub).to.have.been.calledWith('Missing route');
      });
    });
  });

  describe('validating success', function () {
    context('when the success type is provided', function () {
      beforeEach(function () {
        this.onErrorStub = sinon.spy();
        const configuration = {
          success: 'DATA_SUCCESS'
        };
        validate(configuration, this.onErrorStub);
      });

      it('does not trigger an error', function () {
        expect(this.onErrorStub).not.to.have.been.calledWith('Missing success');
      });
    });

    context('when the route is not provided', function () {
      beforeEach(function () {
        this.onErrorStub = sinon.spy();
        const configuration = {
        };
        validate(configuration, this.onErrorStub);
      });

      it('does trigger an error', function () {
        expect(this.onErrorStub).to.have.been.calledWith('Missing success');
      });
    });
  });
});
