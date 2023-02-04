import express from "express";
import ordersData from "../data/orders.json" assert { type: "json" };
import fs from "fs/promises";

const ordersRouter = express.Router();
const orders = ordersData;
const filePath = "./data/orders.json";

ordersRouter.use(express.json());

ordersRouter.get("/", (req, res) => {
  res.json(orders);
});

ordersRouter.get("/:id", (req, res) => {
  const orderWithId = orders.orders.find(
    (order) => order.id.toString() === req.params.id
  );
  res.json(orderWithId);
});

ordersRouter.post("/", async (req, res) => {
  const newOrder = req.body;
  orders.orders.push(newOrder);
  //entweder auf sync ändern oder fs/promise mit async/await
  try {
    await fs.writeFile(filePath, JSON.stringify(orders));
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
    return;
  }
  res.send("Order successfully added.");
});

ordersRouter.delete("/:id", (req, res) => {
  const idToDelete = req.params.id;
  orders.orders = orders.orders.filter(
    (order) => order.id.toString() !== idToDelete
  );
  //revise
  fs.writeFile(filePath, JSON.stringify(orders), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
  res.send("Order successfully deleted.");
});

ordersRouter.put("/:id", (req, res) => {
  const orderId = req.params.id;
  const newVersionOrder = req.body;
  const indexOfOrder = orders.orders.findIndex(
    (order) => order.id.toString() === orderId
  );

  orders.orders[indexOfOrder] = newVersionOrder;

  fs.writeFile(filePath, JSON.stringify(orders), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
  res.send("Order successfully updated");
});

export { ordersRouter };
