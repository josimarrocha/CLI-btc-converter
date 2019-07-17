const chai = require('chai');
const nock = require('nock');
const sinon = require('sinon');
const chalk = require('chalk');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

const convertBTC = require('../src/ConvertBTC');

describe('ConvertBTC', () => {
  let consoleStub;
  const responseMock = {
    success: true,
    time: '2019-07-09 21:59:52',
    price: 25115.79,
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'info');
  });

  afterEach(() => {
    consoleStub.restore();
  });

  it('should use currency USD and as amount default', async () => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock);

    await convertBTC();

    expect(consoleStub)
      .to.have.been
      .calledWith(`${chalk.red('1')} BTC to ${chalk.cyan('USD')} ${chalk.yellow('25115.79')}`);
  });

  it('should use currency USD and 10 amount', async () => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10 })
      .reply(200, responseMock);

    await convertBTC('USD', 10);

    expect(consoleStub)
      .to.have.been
      .calledWith(`${chalk.red('10')} BTC to ${chalk.cyan('USD')} ${chalk.yellow('25115.79')}`);
  });

  it('should use currency BRL and 1 as amount default', async () => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .reply(200, responseMock);

    await convertBTC('BRL');

    expect(consoleStub)
      .to.have.been
      .calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('BRL')} ${chalk.yellow('25115.79')}`);
  });

  it('should message user when api reply with error', async () => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .replyWithError('Error');

    await convertBTC('BRL');

    expect(consoleStub)
      .to.have.been
      .calledWith(chalk.red('Something went in API. Try in a few minutes.'));
  });
});
