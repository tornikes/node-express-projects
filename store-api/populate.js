require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

async function start() {
  try {
    const conn = await connectDB(process.env.MONGODB_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    conn.disconnect();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

start();
