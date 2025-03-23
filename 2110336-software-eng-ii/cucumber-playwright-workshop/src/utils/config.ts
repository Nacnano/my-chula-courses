import { LaunchOptions } from "@playwright/test";
import { DotenvParseOutput, config as loadEnv } from "dotenv";

const dotenvParseOutput: DotenvParseOutput | undefined = loadEnv({
  path: ".env",
}).parsed;

let slowMo: number = parseInt(
  dotenvParseOutput?.SLOW_MOTION_MILLISECONDS || "50"
);
const browserOptions: LaunchOptions = {
  headless: dotenvParseOutput?.HEADLESS === "true",
  slowMo: slowMo,
};

export const config = {
  browser: dotenvParseOutput?.AUTOMATE_BROWSER || "chrome",
  browserOptions,
  browserWidth: parseInt(dotenvParseOutput?.BROWSER_WIDTH || "1280"),
  browserHeight: parseInt(dotenvParseOutput?.BROWSER_HEIGHT || "720"),
  cucumberTimeoutMilliseconds: parseInt(
    dotenvParseOutput?.CUCUMBER_TIMEOUT_MS || "10000"
  ),
  playwrightNavigationTimeoutMilliseconds: parseInt(
    dotenvParseOutput?.PLAYWRIGHT_NAVIGATION_TIMEOUT_MS || "7000"
  ),
  playwrightCommandTimeoutMilliseconds: parseInt(
    dotenvParseOutput?.PLAYWRIGHT_COMMAND_TIMEOUT_MS || "5000"
  ),
  BASE_URL: dotenvParseOutput?.BASE_URL,
};
