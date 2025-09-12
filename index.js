const { buyProduct } = require("./lib/menu");
const { question, exiting } = require("./lib/question/index");

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
    buyProduct()
      break;
    case 2:
      console.log("lihat cart")
      exiting()
      break;
    case 3:
      console.log("lihat history");
      exiting();
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
