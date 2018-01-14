import { TestingRealaExamplePage } from './app.po';

describe('testing-reala-example App', () => {
  let page: TestingRealaExamplePage;

  beforeEach(() => {
    page = new TestingRealaExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
