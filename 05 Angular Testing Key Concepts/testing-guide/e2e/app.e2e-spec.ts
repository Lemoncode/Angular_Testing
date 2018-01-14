import { TestingGuidePage } from './app.po';

describe('testing-guide App', () => {
  let page: TestingGuidePage;

  beforeEach(() => {
    page = new TestingGuidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
