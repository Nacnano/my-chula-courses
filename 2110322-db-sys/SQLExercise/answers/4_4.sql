WITH ProductOrderCounts AS (
    SELECT P.PRODUCT_ID, P.PRODUCT_DESCRIPTION, COUNT(OL.ORDER_ID) AS order_count
    FROM ORDER_LINE OL
    JOIN PRODUCT P ON OL.PRODUCT_ID = P.PRODUCT_ID
    GROUP BY P.PRODUCT_ID, P.PRODUCT_DESCRIPTION
)
SELECT PRODUCT_ID, PRODUCT_DESCRIPTION
FROM ProductOrderCounts
WHERE order_count = (
    SELECT MAX(order_count) FROM ProductOrderCounts
);