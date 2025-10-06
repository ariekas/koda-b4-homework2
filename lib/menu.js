const { listProduk, cartItems } = require("./data/index");
const { question } = require("./question/index");
const { customError } = require("./error/index");

async function buyProduct() {
  try {
    let continueBuying = true;

    while (continueBuying) {
      console.log("\n=== Daftar Menu ===\n");
      listProduk.forEach(({ name, price }, index) => {
        console.log(`No: ${index + 1} Nama: ${name} - Harga: Rp${price}`);
      });

      const selectMenu = await question("\nPilih menu yang ingin dibeli: ");
      const pilihIndex = parseInt(selectMenu) - 1;

      if (isNaN(pilihIndex) || pilihIndex < 0 || pilihIndex >= listProduk.length) {
        throw new customError("Input tidak valid! Pilih nomor menu yang tersedia.");
      }

      const menu = listProduk[pilihIndex];
      const existingCart = cartItems.find(({ name }) => name === menu.name);

      if (existingCart) {
        existingCart.quantity += 1;
      } else {
        cartItems.push({ ...menu, quantity: 1 });
      }

      console.log("\n=== Pesanan Saat Ini ===\n");
      cartItems.forEach(({ name, price, quantity }) => {
        console.log(`${name} x ${quantity} = Rp${price * quantity}`);
      });
      console.log("\n========================");

      const confirm = await question("Beli lagi? (Y/N): ");

      if (confirm.toLowerCase() === "y") {
        continueBuying = true;
      } else if (confirm.toLowerCase() === "n") {
        continueBuying = false;
        console.log("\nPesanan ditambahkan ke cart.");
        console.log("Silakan pilih menu 'Cart' untuk melakukan checkout.");
      } else {
        throw new customError("Input salah! Gunakan hanya 'Y' atau 'N'.");
      }
    }
  } catch (error) {
    console.error(`\nTerjadi kesalahan: ${error.message}`);
  }
}

module.exports = {
  buyProduct,
};