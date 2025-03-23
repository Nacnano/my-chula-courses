import { Given, Then, When, world } from "@cucumber/cucumber";
import { ICustomWorld } from "../../utils/custom_world";
import { expect } from "@playwright/test";

let customWorld: ICustomWorld = world;

Given("I visit the home page", async () => {
  const page = customWorld.page;
  expect(page).not.toBeNull();

  if (page) {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  }
});

// CSS selector for the login button
// REF: https://www.w3schools.com/cssref/css_selectors.php
When(
  "I input username {string} and password {string}",
  async (username, password) => {
    const page = customWorld.page;

    if (page) {
      const usernameInputField = page.locator("#user-name");
      await usernameInputField?.fill(username);

      const passwordInputField = page.locator('input[name="password"]');
      await passwordInputField?.fill(password);
    }
  }
);

When("I clicks on the home page login button", async () => {
  const page = customWorld.page;

  if (page) {
    const loginButton = page.getByRole("button", {
      name: "Login",
    });
    await loginButton?.click();
  }
});

Then("I should navigate to {string}", async (path: string) => {
  const page = customWorld.page;
  if (page) {
    await expect(page).toHaveURL(path, { ignoreCase: true });
  }
});

Then(
  "I should see an error message containing {string} on the login button",
  async (message: string) => {
    const page = customWorld.page;
    if (page) {
      const errorElement = page.getByText(message, {
        exact: false,
      });
      expect(errorElement).toBeVisible();
    }
  }
);

Then("I should not navigate to {string}", async (path: string) => {
  const page = customWorld.page;
  if (page) {
    const url = page.url();
    expect(url).not.toContain(path);
  }
});
