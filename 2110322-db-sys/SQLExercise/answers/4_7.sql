-- 4.7 Show the product ID and product description that have the highest number of orders.
WITH ProductOrderTotals AS (
    SELECT P.PRODUCT_ID, P.PRODUCT_DESCRIPTION, SUM(OL.ORDERED_QUANTITY) AS total_ordered
    FROM ORDER_LINE OL
    JOIN PRODUCT P ON OL.PRODUCT_ID = P.PRODUCT_ID
    GROUP BY P.PRODUCT_ID, P.PRODUCT_DESCRIPTION
)
SELECT PRODUCT_ID, PRODUCT_DESCRIPTION
FROM ProductOrderTotals
WHERE total_ordered = (
    SELECT MAX(total_ordered) FROM ProductOrderTotals
);
