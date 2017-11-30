import { browser } from "protractor";
import { AppPage } from "./app.po";

describe("angular App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display title saying Demo", () => {
    page.navigateTo();
    browser.getTitle().then((title: string) => {
      expect(title).toEqual("Demo");
    });
  });
});
