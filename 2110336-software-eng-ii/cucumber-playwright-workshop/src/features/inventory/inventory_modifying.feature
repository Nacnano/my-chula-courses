@inventory
Feature: Inventory Management
    As a user
    I want to be able to add and remove items from the cart
    So that I can purchase items correctly

    Background: User is logged in and on the inventory page
        Given I log in to the inventory page with username "standard_user" and password "secret_sauce"

    Scenario Outline: Validate the addition and removal of items in the cart
        When I add the first <number_of_added_items> items to the cart
        And I remove <remove_count> items from the cart, starting with the first item displayed
        Then I should see <total_count> items in the cart
        And I should see a "Remove" button for the remaining items

        Examples:
            | number_of_added_items | remove_count | total_count |
            | 4                     | 3            | 1           |
            # | 4                     | 2            | 2           |
