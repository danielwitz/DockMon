import { MissionQueueCliPage } from './app.po';

describe('mission-queue-cli App', () => {
  let page: MissionQueueCliPage;

  beforeEach(() => {
    page = new MissionQueueCliPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
