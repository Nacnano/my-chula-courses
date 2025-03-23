# cucumber-playwright-workshop

## Playwright Guide

In this section, I will provide a guide on Playwright. If you start this project and encounter difficulties, the guide below may help you.

### Locator Syntax Example

Use a CSS selector to query and retrieve an element from the DOM.

```
    // By tag name
    page.locator("input");

    // By id
    page.locator("#inputEmail1");

    // By class value
    page.locator(".shape-rectangle");

    // By attribute
    page.locator('[placeholder="Enter Your Email"]');

    // By class value (full)
    page.locator(
      '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
    );

    // Combine different selectors
    page.locator('input#inputEmail1[placeholder="Enter Your Email"]');

    // By partial Text Match
    page.locator(':text("Email addr")');

    // By exact text match
    page.locator(':text-is("Email address")');
```

### User-facing Locators

Automated tests should verify that the application works as expected for end users and should not depend on internal implementation details that users do not interact with, such as function names, data structures, or CSS classes. Instead, tests should query elements based on what users actually see and interact with for more reliable and maintainable testing.

Ref: <https://playwright.dev/docs/locators#locating-elements>

- `page.getByRole()` to locate by explicit and implicit accessibility attributes.
- `page.getByText()` to locate by text content.
- `page.getByLabel()` to locate a form control by associated label's text.
- `page.getByPlaceholder()` to locate an input by placeholder.
- `page.getByAltText()` to locate an element, usually image, by its text alternative.
- `page.getByTitle()` to locate an element by its title attribute.
- `page.getByTestId()` to locate an element based on its data-testid attribute (other attributes can be configured).

### Filtering Locators

Ref: <https://playwright.dev/docs/locators#filtering-locators>

- Filter by text
- Filter by not having text
- Filter by child/descendant
- Filter by not having child/descendant
