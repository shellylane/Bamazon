//Require mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "Bamazon"
});

var userItem;
var userUnits;
var updatedStock;

connection.query("SELECT * FROM products",
    function (err, res) {
        if (err) {
            throw err;
        }
        console.log("*******************************");
        for (var i = 0; i < res.length; i++) {
            console.log("ID# %s | %s | $%s", res[i].item_id, res[i].product_name, res[i].price.toFixed(2));
        }
        console.log("*******************************");
        start();
    }
);

var start = function () {

    inquirer.prompt([
        {
            name: "item",
            type: "integer",
            message: "What is the ID# of the product you would like to purchase?"

        },
        {
            name: "quantity",
            type: "integer",
            message: "How many units would you like to purchase?"
        },

    ]).then(function (answer) {
        console.log("You would like to purchase " + answer.quantity + " of item # " + answer.item);
        userUnits = answer.quantity;
        userItem = answer.item;
        quantityCheck();
    });
}

var quantityCheck = function() {
    // Checking if the store has enough stock
    connection.query("SELECT * FROM products WHERE ?", [{item_id:userItem}], function(err, res) {
            if (err) {
                throw err;
            }
            // If not let the customer know
            if (res[0].stock_quantity < userUnits) {
                console.log("\n*******************************");
                console.log("Insufficient quantity!");
                console.log("*******************************\n");
                // Calling the userPrompt() function
                start();
            } else {
                // If store does have enough of the product, fulfilling the customer's order by calling the updateStock() function & logging the order summary
                updateStock(res[0].stock_quantity, userUnits);
                console.log("\nQuantity in stock: %s", res[0].stock_quantity);
                console.log("\nOrder received:\n  ID: %s\n  Units: %s", userItem, userUnits);

                // Once the update goes through, showing the customer the total cost of their purchase
                userTotal = res[0].price * userUnits;

                console.log("\n*******************************");
                console.log("Total cost: $%s", userTotal.toFixed(2));
                console.log("*******************************\n");

                ;
                // Calling the userPrompt() function
                start();
                
            };
        });
    }

// Function to update the SQL database to reflect the remaining quantity 
var updateStock = function(stockQuantity, userUnits) {
    updatedStock = stockQuantity - userUnits;

    connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: updatedStock
        }, {
            item_id: userItem
        }],
        function(err, res) {}
    );
};