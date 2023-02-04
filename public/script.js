const data = JSON.stringify({
  id: 5,
  pizzas: [{ id: 3, amount: 1 }],
  date: {
    year: 2023,
    month: 1,
    day: 1,
    hour: 16,
    minute: 55,
  },
  customer: {
    name: "Test McTest",
    email: "Test@Testexample.com",
    address: { city: "vienna", street: "dritte gasse 9" },
  },
});

const main = () => {
  addEventListenersToButtons();
};

const addEventListenersToButtons = () => {
  const orderNow = document.getElementsByClassName("order-now");
    console.log(orderNow)
  for (const orderNowButton of orderNow) {
    orderNowButton.addEventListener("click", postOrder);
  }
};

const postOrder = async () => {
  const url = "http://localhost:3000/api/orders";
  await fetch(url, {
    method: "Post",
    headers: {
      "Content-Type": "application/json"
    },
    body: data,
  });
};

main();