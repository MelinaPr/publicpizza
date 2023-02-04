import express from "express";
import allergensData from "../data/allergens.json" assert { type: "json" };

const allergensRouter = express.Router();
const allergens = allergensData;

allergensRouter.get("/", (req, res) => {
  res.json(allergens);
});

allergensRouter.get("/:id", (req, res) => {
  const allergenWithId = allergens.allergens.find(
    (allergen) => allergen.id.toString() === req.params.id
  );
  res.json(allergenWithId);
});

export { allergensRouter };
