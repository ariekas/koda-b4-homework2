const { historyItems } = require("./data/index");

async function history() {
    try {
        if (!Array.isArray(historyItems)) {
            throw new Error("Data history tidak valid. Harus berupa array.");
        }

        if (historyItems.length === 0) {
            console.log("\n=== HISTORY KOSONG ===");
            console.log("Belum ada pesanan yang pernah dibuat.");
            return;
        }

        console.log("\n" + "=".repeat(50));
        console.log("                  HISTORY PESANAN");
        console.log("=".repeat(50));

        historyItems.forEach((order, index) => {
            const { no_order, order_name, order_date, total, data } = order;

            console.log(`\n PESANAN ${index + 1}`);
            console.log("-".repeat(30));
            console.log(` No Order     : ${no_order || "Tidak diketahui"}`);
            console.log(` Nama Pemesan : ${order_name || "Tidak diketahui"}`);
            console.log(` Tanggal      : ${order_date || "Tidak diketahui"}`);
            console.log(` Total        : Rp${Number(total || 0).toLocaleString()}`);

            if (!Array.isArray(data) || data.length === 0) {
                console.log("   Tidak ada item di dalam pesanan ini.");
            } else {
                console.log("\n Detail Items:");
                data.forEach((item, itemIndex) => {
                    if (!item || typeof item !== "object") {
                        console.warn(`   Item ke-${itemIndex + 1} tidak valid, dilewati.`);
                        return;
                    }

                    const { name, price, quantity } = item;
                    const validPrice = Number(price) || 0;
                    const validQuantity = Number(quantity) || 0;
                    const subtotal = validPrice * validQuantity;

                    console.log(`   ${itemIndex + 1}. ${name || "Nama tidak tersedia"}`);
                    console.log(`      Harga    : Rp${validPrice.toLocaleString()}`);
                    console.log(`      Quantity : ${validQuantity}`);
                    console.log(`      Subtotal : Rp${subtotal.toLocaleString()}`);

                    if (itemIndex < data.length - 1) {
                        console.log("      " + "-".repeat(20));
                    }
                });
            }

            console.log("\n" + "=".repeat(50));
        });

        const totalPesanan = historyItems.length;
        const totalKeseluruhan = historyItems.reduce(
            (sum, order) => sum + (Number(order.total) || 0),
            0
        );

        console.log(`\n Total Pesanan: ${totalPesanan}`);
        console.log(` Total Keseluruhan: Rp${totalKeseluruhan.toLocaleString()}`);
    } catch (error) {
        console.error("\nTerjadi kesalahan saat menampilkan history:");
        console.error(error.message);
    }
}

module.exports = { history };
