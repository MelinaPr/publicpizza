import express from "express";
import { allergensRouter } from "./routes/allergens.js";
import { pizzasRouter } from "./routes/pizzas.js";
import { pizzaSearchRouter } from "./routes/pizza-search.js";
import { ordersRouter } from "./routes/orders.js";
import { orderSuggestionRouter } from "./routes/order-suggestion.js";

const app = express();
const port = 3000;

// loads static content (./public/index.html) into localhost:3000/pizza/list
app.use("/pizza/list", express.static("./public"));

app.use("/api/allergens", allergensRouter);

app.use(`/api/pizzas`, pizzasRouter);

app.use(`/api/pizza-search`, pizzaSearchRouter);

app.use(`/api/orders`, ordersRouter);

app.use(`/api/order-suggestion`, orderSuggestionRouter);

app.listen(port);