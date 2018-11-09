# Bamazon

 An Amazon-like storefront with a SQL database. The app takes in orders from customers and depletes stock from the store's inventory.

 Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

The app will then prompt users with two messages.

   * What is the ID# of the product you would like to purchase?
   * How many units would you like to purchase?

![Image](https://github.com/slane1980/Bamazon/blob/master/Screenshots/bamazon1.png)

Once the customer has placed the order, the application checks if your store has enough of the product to meet the customer's request.

   * If not, the app logs `Insufficient quantity!`, and prevents the order from going through.

![Image](https://github.com/slane1980/Bamazon/blob/master/Screenshots/bamazon2.png)

If the store does have enough of the product the app then: 
   * Updates the SQL database to reflect the remaining quantity.
   * Displays to the customer the updated quantity, the order, and the total cost of their purchase.

![Image](https://github.com/slane1980/Bamazon/blob/master/Screenshots/bamazon3.png)
![Image](https://github.com/slane1980/Bamazon/blob/master/Screenshots/bamazon4.png)