import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.waitForAngularEnabled(false);
  });

  // Added <any> to expect line to solve error: "roomer-app app is running" is not assignable to parameter of type 'Expected<Promise<string>>
  it('should display welcome message', () => {
    page.navigateTo();
    expect<any>(page.getTitleText()).toEqual('roomer-app app is running!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
