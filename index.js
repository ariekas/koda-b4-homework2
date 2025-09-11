const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let listProduk = [
  {
    name: "PAN Reguler Pizza",
    price: 124000,
  },
  {
    name: "PAN Personal Pizza",
    price: 56000,
  },
  {
    name: "PAN Large Pizza",
    price: 163000,
  },
  {
    name: "Beef Lasagna",
    price: 74000,
  },
  {
    name: "Cheese Beef Fusilli",
    price: 72001,
  },
  {
    name: "Oriental Chicken Rice",
    price: 58000,
  },
  {
    name: "Cheese Rolls",
    price: 41000,
  },
  {
    name: "Mushroom Soup",
    price: 25000,
  },
  {
    name: "Chicken Royale",
    price: 50001,
  },
  {
    name: "Garlic Bread",
    price: 37000,
  },
]

let storageProduct = []

let historyProduct = []

function menuUtama() {
  console.log("Selamat datang di Pizza Hut, Silahkan pilih menu: ")
  console.log("1. Lihat Menu")
  console.log("2. Lihat Keranjang")
  console.log("3. Lihat History")
  console.log("4. EXIT")
  console.log("========================================")
  rl.question("Masukan Angka untuk memilih menu: ", (inputMenu) => {
    inputMenu = parseInt(inputMenu)
    console.log("========================================")
    switch (inputMenu) {
    case 1:
      tambahMenu()
      break
    case 2:
      calcuCart()
      break
    case 3:
      history()
      break
    case 4:
      console.log("Datang kembali")
      rl.close()
      break
    default:
      rl.close()
    }
  })
}

function history() {
  console.log("History Pesanan Anda:")

  let indexHistory = 0
  while (historyProduct[indexHistory] !== undefined) {
    let order = historyProduct[indexHistory]
    console.log(`Pesanan ke-${indexHistory + 1}:`)
    
    for (const item in order.items) {
      if (item !== "Total") {
        console.log(`  ${item}: Rp ${order.items[item]}`)
      }
    }
    console.log(`Total: Rp ${order.total}`)
    indexHistory++
  }

  console.log("========================================")
  rl.question("Kemblai ke menu utama? (y): ", (inputConfim) => {
    if(inputConfim === "y"){
      menuUtama()
    }else{
      menuUtama()
    }
  })

}

function calcuCart() {
  let indexCart = 0
  let subtotalPerItem = {}

  while (storageProduct[indexCart] !== undefined) {
    if (subtotalPerItem[storageProduct[indexCart].name]) {
      subtotalPerItem[storageProduct[indexCart].name] +=
        storageProduct[indexCart].price
    } else {
      subtotalPerItem[storageProduct[indexCart].name] = storageProduct[indexCart].price
    }
    indexCart++
  }

  let total = 0
  console.log("List Cart Anda:")
  for (let item in subtotalPerItem) {
    console.log(`Item: ${item}, Subtotal: ${subtotalPerItem[item]}`)
    total += subtotalPerItem[item]
  }

  subtotalPerItem["Total"] = total

  if (total === 0) {
    console.log("Tidak ada Produk dalam cart")
  } else {
    console.log(`Total: ${total}`)
  }

  console.log("========================================")
  rl.question("Comfirmasi Beli? (Y/N): ", (inputCart) => {
    if (inputCart === "y") {
      historyProduct = [
        ...historyProduct,
        {
          items: subtotalPerItem,
          total: total
        }
      ]
      storageProduct = []
      menuUtama()
    } else {
      menuUtama()
    }
  })
}

function tambahMenu() {
  let indexProduct = 0
  while (listProduk[indexProduct] !== undefined) {
    console.log(`${indexProduct}. ${listProduk[indexProduct].name}: ${listProduk[indexProduct].price}`)
    indexProduct++
  }
  console.log("========================================")
  rl.question("Pilih Menu(Masukan angka Index): ", (inputProduk) => {
    inputProduk = parseInt(inputProduk)
    let dataInput = {
      ...listProduk[inputProduk],
    }
    storageProduct = [...storageProduct, dataInput]

    console.log("========================================")
    console.log("List Pesanan Anda:")
    let indexListProduct = 0
    while (storageProduct[indexListProduct] !== undefined) {
      console.log(`${storageProduct[indexListProduct].name}`)
      indexListProduct++
    }

    console.log("========================================")
    rl.question("Pesan lagi? (Y/N): ", (inputFinist) => {
      if (inputFinist === "y") {
        tambahMenu()
      } else {
        menuUtama()
      }
    })
  })
}

menuUtama()
