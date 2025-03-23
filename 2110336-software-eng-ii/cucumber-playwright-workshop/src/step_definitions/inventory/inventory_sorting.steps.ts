import { Then, When, world } from "@cucumber/cucumber";
import { ICustomWorld } from "../../utils/custom_world";
import { expect } from "@playwright/test";

let customWorld: ICustomWorld = world;

When(
  "I select the {string} with value {string} sorting option",
  async (optionLabel: string, optionValue: string) => {
    const dropdownElement = customWorld.page?.locator(
      'select[data-test="product-sort-container"]'
    );

    expect(dropdownElement).not.toBeNull();
    if (dropdownElement) {
      await dropdownElement.selectOption({
        label: optionLabel,
        value: optionValue,
      });
    }
  }
);

Then(
  "the inventory items should be sorted in the correct order corresponding to {string}",
  async function (sortType: string) {
    const items = customWorld?.page?.locator(".inventory_item");
    expect(items).not.toBeNull();
    const itemCount = (await items?.count()) ?? 0;
    const nameSelector = '[data-test="inventory-item-name"]';
    const priceSelector = '[data-test="inventory-item-price"]';

    for (let i = 0; i < itemCount - 1; i++) {
      const current = items?.nth(i);
      const next = items?.nth(i + 1);
      expect(current).not.toBeNull();
      expect(next).not.toBeNull();

      const currentName =
        (await current?.locator(nameSelector).innerText()) || "";
      const nextName = (await next?.locator(nameSelector).innerText()) || "";

      const currentPriceStr = await current?.locator(priceSelector).innerText();
      const nextPriceStr = await next?.locator(priceSelector).innerText();
      const currentPrice = parseFloat(currentPriceStr?.replace("$", "") || "0");
      const nextPrice = parseFloat(nextPriceStr?.replace("$", "") || "0");

      expect(currentPrice).not.toBeNaN();
      expect(nextPrice).not.toBeNaN();

      if (sortType === "hilo") {
        expect(currentPrice).toBeGreaterThanOrEqual(nextPrice);
      } else if (sortType === "lohi") {
        expect(currentPrice).toBeLessThanOrEqual(nextPrice);
      } else if (sortType === "za") {
        const nameA = currentName.trim().toLowerCase();
        const nameB = nextName.trim().toLowerCase();
        expect(nameA.localeCompare(nameB)).toBeGreaterThanOrEqual(0);
      }
    }
  }
);

Then(
  "I should see an error dialog with error message {string}",
  async function (expectedMsg: string) {
    await customWorld?.page?.on("dialog", (dialog) => {
      expect(dialog.message()).toBe(expectedMsg);
      dialog.accept();
    });
  }
);
