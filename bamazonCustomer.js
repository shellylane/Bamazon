//Require mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

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
        console.table(res);

        start();
    }
);

var start = function () {

    inquirer.prompt([
        {
            name: "item",
            type: "integer",
            message: "What is the item_id# of the product you would like to purchase?"

        },
        {
            name: "quantity",
            type: "integer",
            message: "How many units would you like to purchase?"
        },

    ]).then(function (answer) {
        console.log(chalk.magenta("You would like to purchase " + answer.quantity + " of item # " + answer.item));
        userUnits = answer.quantity;
        userItem = answer.item;
        quantityCheck();
    });
}

var quantityCheck = function () {
    // Checking if the store has enough stock
    connection.query("SELECT * FROM products WHERE ?", [{ item_id: userItem }], function (err, res) {
        if (err) {
            throw err;
        }
        // If not let the customer know
        if (res[0].stock_quantity < userUnits) {
            console.log(chalk.blue("\n*******************************"));
            console.log(chalk.white("Insufficient quantity!"));
            console.log(chalk.blue("*******************************\n"));
            // Calling the userPrompt() function
            start();
        } else {
            // If store does have enough of the product, fulfilling the customer's order by calling the updateStock() function & logging the order summary
            updateStock(res[0].stock_quantity, userUnits);
            console.log(chalk.green("Quantity in stock: " + res[0].stock_quantity));
            console.log(chalk.white("Order received: "));
            console.log(chalk.yellow("Id: " + userItem));
            console.log(chalk.yellow("Units: " + userUnits));

            // Once the update goes through, showing the customer the total cost of their purchase
            userTotal = res[0].price * userUnits;

            console.log(chalk.blue("\n*******************************"));
            console.log(chalk.white("Total cost: $", userTotal.toFixed(2)));
            console.log(chalk.blue("*******************************\n"));


            // Calling the userPrompt() function
            start();

        };
    });
}

// Function to update the SQL database to reflect the remaining quantity 
var updateStock = function (stockQuantity, userUnits) {
    updatedStock = stockQuantity - userUnits;

    connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: updatedStock
    }, {
        item_id: userItem
    }],
        function (err, res) { }
    );
};