import express from "express";
import pizzasData from "../data/pizzas.json" assert { type: "json" };

const pizzasRouter = express.Router();
const pizzas = pizzasData;

pizzasRouter.get("/", (req, res) => {
    res.json(pizzas)
});

pizzasRouter.get("/:id", (req, res) => {
    const pizzaFromId = pizzas.pizzas.find((pizza) => pizza.id.toString() === req.params.id)
    res.json(pizzaFromId)
})

export { pizzasRouter }