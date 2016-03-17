import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
