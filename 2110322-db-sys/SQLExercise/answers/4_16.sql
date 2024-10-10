-- 4.16 Update the price of the product "Sofabed" from 7500.00 to 5400.00, then select * from the product table to display.
UPDATE PRODUCT
SET STANDARD_PRICE = 5400.00
WHERE PRODUCT_DESCRIPTION = 'Sofabed';

SELECT * FROM PRODUCT;
