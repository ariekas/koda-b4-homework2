const { buyProduct } = require("./lib/menu");
const { question, exiting } = require("./lib/question/index");
const {cart} = require("./lib/cart")
const {history} = require("./lib/history")

async function menuUtama() {
  console.log("Selamat datang di Pizza Hut, Silahkan pilih menu: ")
  console.log("1. Lihat Menu")
  console.log("2. Lihat Keranjang")
  console.log("3. Lihat History")
  console.log("4. EXIT")
  console.log("========================================")

  const inputMenu = parseInt(
    await question("Masukan angka untuk memilih menu: ")
  )

  switch (inputMenu) {
    case 1:
    await buyProduct()
    await menuUtama()
      break;
    case 2:
      await cart()
      await menuUtama()
      break;
    case 3:
      await history()
      await menuUtama()
      break;
    case 4:
      console.log("exiting");
      exiting();
      break;
    default:
      console.log("menu tidak ada");
      exiting();
      break;
  }
}

menuUtama()
