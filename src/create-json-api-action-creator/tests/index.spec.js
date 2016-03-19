import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
const proxyquire = require('proxyquire').noCallThru();

describe('CreateJSONAPIActionCreator', function () {
  let createJSONAPIActionCreator = function (...args) {
    this.createAPIActionCreatorStub = sinon.stub();
    this.JSONAPIMiddlewareStub = sinon.stub();

    return proxyquire('../index', {
      '../create-api-action-creator': this.createAPIActionCreatorStub,
      './json-api-middleware': this.JSONAPIMiddlewareStub
    }).default(...args);
  };

  beforeEach(function () {
    createJSONAPIActionCreator = createJSONAPIActionCreator.bind(this);

    this.configurationMock = sinon.mock();
    this.actionCreatorNameMock = sinon.mock();

    createJSONAPIActionCreator(this.configurationMock, this.actionCreatorNameMock)
  });

  it('delegates arguments to the createAPIActionCreator', function () {
    expect(this.createAPIActionCreatorStub).to.have.been.calledWith(
      this.configurationMock,
      this.actionCreatorNameMock,
      this.JSONAPIMiddlewareStub
    );
  });
});
