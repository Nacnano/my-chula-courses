import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { ICustomWorld } from "./custom_world";
import {
  Browser,
  chromium,
  ConsoleMessage,
  firefox,
  webkit,
} from "@playwright/test";
import { config } from "./config";

let browser: Browser;

/// set cucumber timeout to 10 seconds
/// if the timeout is too low, it will directly affect the Playwright timeout, and the test will fail
setDefaultTimeout(config.cucumberTimeoutMilliseconds);

/// `BeforeAll` is run once before all tests
BeforeAll(async function () {
  switch (config.browser) {
    case "firefox":
      browser = await firefox.launch(config.browserOptions);
      break;
    case "webkit":
      browser = await webkit.launch(config.browserOptions);
      break;
    case "msedge":
      browser = await chromium.launch({
        ...config.browserOptions,
        channel: "msedge",
      });
      break;
    case "chrome":
      browser = await chromium.launch({
        ...config.browserOptions,
        channel: "chrome",
      });
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }
});

/// `Before` is run before each test
Before(async function (this: ICustomWorld) {
  this.context = await browser.newContext({
    viewport: { width: config.browserWidth, height: config.browserHeight },
    baseURL: config.BASE_URL,
  });
  this.page = await this.context.newPage();
  this.page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "log") {
      this.attach(msg.text());
    }
  });

  // Set Playwright global navigation timeout. e.g. goto, reload, waitForNavigation
  this.page.setDefaultNavigationTimeout(
    config.playwrightNavigationTimeoutMilliseconds
  );

  // Set Playwright global command timeout. e.g. click, type, waitForSelector
  this.page.setDefaultTimeout(config.playwrightCommandTimeoutMilliseconds);
});

/// `After` is run after each test
After(async function (this: ICustomWorld, { pickle, result }) {
  if (result) {
    let nanoSeconds = result.duration.nanos;
    let milliseconds = nanoSeconds / Math.pow(10, 6);
    this.attach(
      `Status: ${result.status}. Duration: ${milliseconds} milliseconds`
    );
  }
  console.log("Finished scenario: ", pickle.name);
  await this.page?.close();
  await this.context?.close();
});

/// `AfterAll` is run once after all tests
AfterAll(async function () {
  await browser.close();
});
