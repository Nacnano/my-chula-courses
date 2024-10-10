-- 4.10 Show the product ID, product description, and product_finish for all products that are white.
SELECT PRODUCT_ID, PRODUCT_DESCRIPTION, PRODUCT_FINISH
FROM PRODUCT
WHERE PRODUCT_FINISH = 'White Ash';
