const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require("express");
const cors = require("cors");
const app = express();
const main = express();

admin.initializeApp();

app.use(cors());
main.use("/api/", app);
main.use(cors());
main.use(express.json());
main.use(express.urlencoded({extended: false}));

exports.webApi = functions.https.onRequest(main);

const db = admin.firestore();
const productsCollection = "products";

app.get("/", (req, res) => {
  res.send("Api Game Shop");
});

// Creates new product
app.post("/products", async (req, res) => {
  try {
    const product = {
      name: req.body["name"],
      img: req.body["img"],
      price: req.body["price"],
      platform: req.body["platform"],
      genres: req.body["genres"],
    };

    const newDoc = await db.collection(productsCollection).add(product);
    res.status(201).send(`New product added. ID: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send("Invalid information!");
  }
});

// Get all products
app.get("/products", async (req, res) => {
  try {
    const productsQuery = await db.collection(productsCollection).get();
    const products = [];

    productsQuery.forEach((doc) => {
      products.push({
        i: doc.id,
        data: doc.data(),
      });
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get single product
app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;

  db.collection(productsCollection).doc(productId).get()
    .then( product => {
      if (!product.exists) throw new Error("Product not found");
      res.status(200).json({id: product.id, data: product.data()});
    })
    .catch((error) => {
      res.status(500).send({"error" : "Product not found"});
    });
});

app.delete("/products/:productId", (req, res) => {
  db.collection(productsCollection).doc(req.params.productId).delete()
    .then(() => res.status(204).send("Product deleted"))
    .catch((error) => res.status(500).send(error));
});

app.put("/products/:productId", async (req, res) => {

  await db.collection(productsCollection).doc(req.params.productId).set(req.body, {merge:true})
    .then(()=>res.json({id: req.params.productId}))
    .catch((error) => res.status(500).send(error));
});

app.all("*", (req, res) => {
  res.status(404).send({"error": "Resource not found"})
});
