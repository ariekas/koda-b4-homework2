const { listProduk, cartItems } = require("./data/index");
const { question } = require("./question/index");
const { customError } = require("./error/index")


async function buyProduct() {
  const data = listProduk
    .map(
      (items, index) =>
        `No: ${index + 1} Nama: ${items.name} - Price ${items.price}`
    )
    .join("\n \n");
  console.log("\n=== Daftar Menu ===\n" + data + "\n");
  const selectMenu = await question("Pilih menu yang inggin di beli:");
  const pilihIndex = parseInt(selectMenu) - 1;
  const menu = listProduk[pilihIndex];

  const cart = cartItems.find((produk) => produk.name === menu.name);

  if (cart) {
    cart.quantity += 1;
  } else {
    cartItems.push({ ...menu, quantity: 1 });
  }

  console.log("\n=== Pesanan ===\n");
  cartItems.forEach((item) => {
    console.log(
      `${item.name} x ${item.quantity} = Rp${item.price * item.quantity}`
    );
  });
  console.log("\n===============");
  const comfirm = await question("Beli lagi? (Y/N) : ");
  if (comfirm.toLowerCase() === "y") {
    await buyProduct();
  } else if (comfirm.toLowerCase() === "n") {
    console.log("\nPesanan ditambahkan ke cart.");
    console.log("Silakan pilih menu 'Cart' untuk melakukan checkout.");
  } else {
    throw new customError("Wrong Input");
  }
}

module.exports = {
  buyProduct,
};
