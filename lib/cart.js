const { cartItems, historyItems } = require("./data/index");
const { question } = require("./question/index");
const { customError} = require("./error/index")


async function cart() {
  console.log("\n=== MENU CART ===");
  console.log("1. Lihat Cart");
  console.log("2. Kembali");

  const choice = await question("Pilih menu (1-2): ");

  switch (choice) {
    case "1":
      if (cartItems.length === 0) {
        console.log("\nCart kosong.");
      } else {
        console.log("\n=== CART SAAT INI ===\n");
        let grandTotal = 0;

        cartItems.forEach((item, index) => {
          const subtotal = item.price * item.quantity;
          grandTotal += subtotal;

          console.log(`${index + 1}. ${item.name}`);
          console.log(`   Harga: Rp${item.price}`);
          console.log(`   Quantity: ${item.quantity}`);
          console.log(`   Subtotal: Rp${subtotal}`);
          console.log();
        });

        console.log(`GRAND TOTAL: Rp${grandTotal}`);
        console.log("=" + "=".repeat(30));

        const confirm = await question(
          "\nApakah Anda yakin ingin checkout? (Y/N): "
        );

        if (confirm.toLowerCase() === "y") {
          const customerName = await question("Masukkan nama pemesan: ");

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
          
          order.data.forEach((item, index) => {
            const subtotal = item.price * item.quantity;

            console.log(`${index + 1}. ${item.name}`);
            console.log(`   Harga: Rp${item.price}`);
            console.log(`   Quantity: ${item.quantity}`);
            console.log(`   Subtotal: Rp${subtotal}`);
            console.log();
          });
          
          console.log("Terima kasih atas pesanan Anda!");

          cartItems.length = 0;
        } else if(confirm.toLowerCase() === "n") {
          console.log("Checkout dibatalkan.");
        } else {
          throw new customError("Wrong input")
        }
      }
      break;

    case "3":
      console.log("Kembali ke menu utama...");
      return;

    default:
      throw new customError("Wrong Input")
  }

  const continueAction = await question(
    "\nIngin melakukan aksi lain di cart? (Y/N): "
  );
  if (continueAction.toLowerCase() === "y") {
    await cart(); 
  }else if (continueAction.toLowerCase() === "n"){
    console.log("Kembali ke menu utama...");
    return;
  } else{
    throw new customError("Wrong input")
  }
}

module.exports = {
  cart,

};
