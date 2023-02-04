import express from "express";
import pizzasData from "../data/pizzas.json" assert { type: "json" };
import allergensData from "../data/allergens.json" assert { type: "json" };

const pizzaSearchRouter = express.Router();
const allergens = allergensData;
let data = {};

pizzaSearchRouter.get("/", (req, res) => {
  if (
    req.query["avoid-allergen"] !== undefined &&
    req.query["max-price"] === undefined
  ) {
    data = avoidAllergen(req);
  } else if (req.query["name"] !== undefined) {
    data = findPizzaWithName(req);
  } else if (
    req.query["avoid-allergen"] !== undefined &&
    req.query["max-price"] !== undefined
  ) {
    data = avoidAllergenAndMaxPrice(req);
  } else if (req.query["avoid-allergen-by-name"] !== undefined) {
    data = avoidAllergenByName(req);
  }
  res.json(data);
});

function avoidAllergenByName(req) {
    const allergenName = req.query["avoid-allergen-by-name"];
    const allergenId = allergens.allergens.find(
      (allergen) => allergen.name.toLowerCase() === allergenName.toLowerCase()
    ).id;
    // console.log("query : " + allergenId);
    // return avoidAllergen(allergenId);
    return avoidAllergen({ query: { "avoid-allergen": allergenId } });
}

function avoidAllergenAndMaxPrice(req) {
  const allergenId = parseInt(req.query["avoid-allergen"]);
  const maxPrice = parseInt(req.query["max-price"]);

  const pizzasWithoutAllergen = pizzasData.pizzas.filter(
    (pizza) => !pizza.allergens.includes(allergenId)
  );
  return pizzasWithoutAllergen.filter((pizza) => pizza.price <= maxPrice);
}

function avoidAllergen(req) {
  const allergenId = parseInt(req.query["avoid-allergen"]);
  const pizzasWithoutAllergen = pizzasData.pizzas.filter(
    (pizza) => !pizza.allergens.includes(allergenId)
  );
  return pizzasWithoutAllergen;
}

function findPizzaWithName(req) {
  const nameOfPizza = req.query["name"];
  console.log(nameOfPizza);
  const pizzaByName = pizzasData.pizzas.filter((pizza) => {
    if (pizza.name.toLowerCase() === nameOfPizza.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  });
  console.log(pizzaByName);
  return pizzaByName;
}

export { pizzaSearchRouter };
