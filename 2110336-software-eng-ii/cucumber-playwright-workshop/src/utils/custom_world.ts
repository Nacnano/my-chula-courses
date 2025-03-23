import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { BrowserContext, Page } from "@playwright/test";

export interface ICustomWorld extends World {
  context?: BrowserContext;
  page?: Page;
}

/// `Custom World` is a class that extends the World class from Cucumber
/// and implements the [ICustomWorld] interface
/// This class is used to store the context and page objects
/// that are used in the step definitions
export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }

  debug = false;
}

setWorldConstructor(CustomWorld);
