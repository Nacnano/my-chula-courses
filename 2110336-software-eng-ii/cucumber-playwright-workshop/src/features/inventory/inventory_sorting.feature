@inventory @inventory_sort
Feature: Inventory Sorting Feature
    Scenario Outline: Successfully sorting inventory products
        Given I log in to the inventory page with username "<username>" and password "<password>"
        When I select the "<option_label>" with value "<option_value>" sorting option
        Then the inventory items should be sorted in the correct order corresponding to "<option_value>"
        Examples:
            | username      | password     | option_label        | option_value |
            # | standard_user | secret_sauce | Name (Z to A)       | za           |
            # | standard_user | secret_sauce | Price (low to high) | lohi         |
            | standard_user | secret_sauce | Price (high to low) | hilo         |

    Scenario Outline: Failed to sort the inventory products
        Given I log in to the inventory page with username "<username>" and password "<password>"
        When I select the "<option_label>" with value "<option_value>" sorting option
        Then I should see an error dialog with error message "<error_message>"
        Examples:
            | username   | password     | option_label        | option_value | error_message      |
            # | error_user | secret_sauce | Name (Z to A)       | za           | Sorting is broken! |
            # | error_user | secret_sauce | Price (low to high) | lohi         | Sorting is broken! |
            | error_user | secret_sauce | Price (high to low) | hilo         | Sorting is broken! |