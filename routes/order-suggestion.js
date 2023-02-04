import express from "express";
import ordersData from "../data/orders.json" assert { type: "json" };
import pizzasData from "../data/pizzas.json" assert { type: "json" };

const orderSuggestionRouter = express.Router();
const orders = ordersData;
const pizzas = pizzasData;

orderSuggestionRouter.get("/", (req, res) => {
  const maxBudget = parseInt(req.query["max-budget"]);
  let listOfOrdersWithinBudget = [];

  for (const order of orders.orders) {
    for (const orderPizza of order.pizzas) {
      for (const pizza of pizzas.pizzas) {
        if (orderPizza.id === pizza.id) {
          const cost = pizza.price * orderPizza.amount;
          if (cost <= maxBudget) listOfOrdersWithinBudget.push(order);
        }
      }
    }
  }
  res.json(listOfOrdersWithinBudget);
});

export { orderSuggestionRouter };