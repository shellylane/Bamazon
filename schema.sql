CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10 , 2 ) NULL,
    stock_quantity INTEGER(10) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Hot Wheels Track Set", "Toys", 44.88, 10),
("LEGO Classic Builder Box", "Toys", 29.99, 25),
("Post-it Super Sticky Notes", "Office", 9.99, 12),
("HP Ink Cartridge", "Office", 33.89, 45),
("Stapler", "Office", 5.50, 91),
("Baby Gate", "Baby", 23.70, 150),
("Dog Chew Toy", "Pet Supplies", 5.35, 41),
("The Reckoning", "Books", 13.96, 51),
("Harry Potter and the Sorcerer's Stone", "Books", 9.99, 50),
("Apple AirPods", "Electronics", 159.00, 20),
("Spider-Man PS4", "Video Games", 59.99, 15),
("Super Smash Brothers Ultimate Nintendo", "Video Games", 59.99, 300);



SELECT * FROM products;