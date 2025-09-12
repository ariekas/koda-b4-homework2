const { cartItems, historyItems } = require("./data/index");
const { question, exiting } = require("./question/index");

async function cart() {
  cartItems.forEach((items) => {
    if (typeof items.quantity === "number") {
      const subtotal = items.price * items.quantity;
 
      items = { ...items, subtotal };
      const total = items.subtotal + items.subtotal;
      items = { ...items, total };
      historyItems.push(items);

    }
});


const data = historyItems
    .map(
      (items, index) =>
        `No : ${index + 1} = Nama : ${items.name} - Price: ${
          items.price
        } - Quantity: ${items.quantity} - Subtotal: ${items.subtotal} - total ${items.total} `
    )
    .join("\n");

//   console.log(historyItems);
    console.log(data);
}

module.exports = {
  cart,
};
