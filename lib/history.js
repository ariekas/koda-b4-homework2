const {  historyItems } = require("./data/index");

async function history() {
    if (historyItems.length === 0) {
        console.log("\n=== HISTORY KOSONG ===");
        console.log("Belum ada pesanan yang pernah dibuat.");
        return;
    }

    console.log("\n" + "=".repeat(50));
    console.log("                  HISTORY PESANAN");
    console.log("=".repeat(50));
    
    historyItems.forEach((order, index) => {
        console.log(`\n PESANAN ${index + 1}`);
        console.log("-".repeat(30));
        console.log(` No Order     : ${order.no_order}`);
        console.log(` Nama Pemesan : ${order.order_name}`);
        console.log(` Tanggal      : ${order.order_date}`);
        console.log(` Total        : Rp${order.total.toLocaleString()}`);
        
        console.log("\n Detail Items:");
        order.data.forEach((item, itemIndex) => {
            const subtotal = item.price * item.quantity;
            console.log(`   ${itemIndex + 1}. ${item.name}`);
            console.log(`      Harga    : Rp${item.price.toLocaleString()}`);
            console.log(`      Quantity : ${item.quantity}`);
            console.log(`      Subtotal : Rp${subtotal.toLocaleString()}`);
            if (itemIndex < order.data.length - 1) {
                console.log("      " + "-".repeat(20));
            }
        });
        
        console.log("\n" + "=".repeat(50));
    });
    
    console.log(`\n Total Pesanan: ${historyItems.length}`);
    console.log(` Total Keseluruhan: Rp${historyItems.reduce((sum, order) => sum + order.total, 0).toLocaleString()}`);
    
}

module.exports = {
    history
}


