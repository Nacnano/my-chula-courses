-- 4.2 Show the number of customers grouped by postal_code, sorted by the number of customers from highest to lowest, displaying only postal_codes that have more than 1 customer.
SELECT POSTAL_CODE, COUNT(*) AS customer_count
FROM CUSTOMER
GROUP BY POSTAL_CODE
HAVING COUNT(*) > 1
ORDER BY customer_count DESC;

