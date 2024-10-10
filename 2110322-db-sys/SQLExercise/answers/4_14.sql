-- 4.14 Add the following new product data into the product table:
-- PRODUCT_ID, PRODUCT_DESCRIPTION, PRODUCT_FINISH, STANDARD_PRICE
-- 7, kitchen cabinet, Cherry, 1500.00
-- 8, table, Red Oak, 550.00
-- And after adding, select all items from the product table to display.
INSERT INTO PRODUCT (PRODUCT_ID, PRODUCT_DESCRIPTION, PRODUCT_FINISH, STANDARD_PRICE)
VALUES 
    (7, 'kitchen cabinet', 'Cherry', 1500.00),
    (8, 'table', 'Red Oak', 550.00);

SELECT * FROM PRODUCT;
