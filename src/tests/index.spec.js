import { expect } from 'chai';
import sinon from 'sinon';
const proxyquire = require('proxyquire').noCallThru();

describe('External API', function () {
  let api = function () {
    this.createAPIActionCreatorMock = sinon.stub();
    this.createAPIActionCreatorMock.onCall(0).returns('firstResult');
    this.createAPIActionCreatorMock.onCall(1).returns('secondResult');

    return proxyquire('../index', {
      './create-api-action-creator': this.createAPIActionCreatorMock,
      './create-json-api-action-creator': this.createAPIActionCreatorMock,

    }).default;
  };

  beforeEach(function () {
    api = api.bind(this);
  });

  describe('#createAPIActionCreators', function () {
    describe('when passed no configuration', function () {
      beforeEach(function () {
        this.actionCreators = api().createAPIActionCreators({});
      });

      it('returns no dispatchers', function () {
        expect(this.actionCreators).to.eql({});
      });
    });

    describe('when passed configuration', function () {
      beforeEach(function () {
        this.actionCreators = api().createAPIActionCreators({
          firstRoute: { route: 'first' },
          secondRoute: { route: 'second' }
        });
      });

      it('calls the createAPIActionCreator with the first route', function () {
        expect(this.createAPIActionCreatorMock).to.have.been.calledWith({ route: 'first'}, 'firstRoute');
      });

      it('calls the createAPIActionCreator with the second route', function () {
        expect(this.createAPIActionCreatorMock).to.have.been.calledWith({ route: 'second'}, 'secondRoute');
      });

      it('returns the action creators', function () {
        expect(this.actionCreators).to.eql({
          firstRoute: 'firstResult',
          secondRoute: 'secondResult'
        });
      });
    })
  });
});

