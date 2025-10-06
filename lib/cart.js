// cart.js
const { cartItems, historyItems } = require("./data/index");
const { question } = require("./question/index");
const { customError } = require("./error/index");

async function cart() {
  try {
    console.log("\n=== MENU CART ===");
    console.log("1. Lihat Cart");
    console.log("2. Kembali");

    const choice = await question("Pilih menu (1-2): ");

    if (!["1", "2"].includes(choice)) {
      throw new customError("Input tidak valid, harap pilih 1 atau 2.");
    }

    switch (choice) {
      case "1":
        if (cartItems.length === 0) {
          console.log("\nCart kosong.");
        } else {
          console.log("\n=== CART SAAT INI ===\n");
          let grandTotal = 0;

          cartItems.forEach(({ name, price, quantity }, index) => {
            const subtotal = price * quantity;
            grandTotal += subtotal;

            console.log(`${index + 1}. ${name}`);
            console.log(`   Harga: Rp${price}`);
            console.log(`   Quantity: ${quantity}`);
            console.log(`   Subtotal: Rp${subtotal}\n`);
          });

          console.log(`GRAND TOTAL: Rp${grandTotal}`);
          console.log("=" + "=".repeat(30));

          const confirm = await question(
            "\nApakah Anda yakin ingin checkout? (Y/N): "
          );

          if (!["y", "n"].includes(confirm.toLowerCase())) {
            throw new customError("Input tidak valid! Gunakan Y atau N.");
          }

          if (confirm.toLowerCase() === "y") {
            const customerName = await question("Masukkan nama pemesan: ");

            if (!customerName.trim()) {
              throw new customError("Nama pemesan tidak boleh kosong!");
            }

            const order = {
              no_order: Math.floor(Math.random() * 10000),
              order_name: customerName,
              order_date: new Date().toLocaleString(),
              data: [...cartItems],
              total: grandTotal,
            };

            historyItems.push(order);

            console.log("\n=== CHECKOUT BERHASIL ===");
            console.log(`No Order: ${order.no_order}`);
            console.log(`Nama Pemesan: ${order.order_name}`);
            console.log(`Total: Rp${order.total}`);
            console.log(`List produk:`);

            order.data.forEach(({ name, price, quantity }, index) => {
              const subtotal = price * quantity;
              console.log(`${index + 1}. ${name}`);
              console.log(`   Harga: Rp${price}`);
              console.log(`   Quantity: ${quantity}`);
              console.log(`   Subtotal: Rp${subtotal}\n`);
            });

            console.log("Terima kasih atas pesanan Anda!");
            cartItems.length = 0;
          } else {
            console.log("Checkout dibatalkan.");
          }
        }
        break;

      case "2":
        console.log("Kembali ke menu utama...");
        return;
    }

    const continueAction = await question(
      "\nIngin melakukan aksi lain di cart? (Y/N): "
    );

    if (!["y", "n"].includes(continueAction.toLowerCase())) {
      throw new customError("Input tidak valid! Gunakan Y atau N.");
    }

    if (continueAction.toLowerCase() === "y") {
      await cart();
    } else {
      console.log("Kembali ke menu utama...");
      return;
    }
  } catch (err) {
    if (err instanceof customError) {
      console.log(`\n[ERROR]: ${err.message}\n`);
    } else {
      console.error("\n[ERROR TIDAK TERDUGA]:", err);
    }

    await cart();
  }
}

module.exports = { cart };
