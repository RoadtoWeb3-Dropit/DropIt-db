/**
 * This file contains our routes for the user object.
 */

// Define our router variable from Express and User variable which makes use of the MongoDB schema we created.
const router = require("express").Router();
const Drop = require("../models/drop.model");

// get all drops
router.route("/").get((req, res) => {
  Drop.find() //
    .then((drops) => res.json(drops)) //
    .catch((err) => res.status(400).json("Error: " + err));
});

// get all drops by organizer
router.get("/:organizer", (req, res) => {
  Drop.find({ organizerWallet: req.params.organizer}) 
    .then((d) => res.json(d))
    .catch((err) => res.status(400).json("Error: " + err));
 });
 

// create new drop
router.post("/", (req, res) => {
  console.log(req.body);
  const drop = new Drop({
    organizerWallet: req.body.organizerWallet,
    registeredWallets: [],
    dropStatus: req.body.dropStatus,
    id: req.body.id
  });

  drop.save()
  .then(() => res.json("drop added"))
  .catch((err) => res.status(400).json("Error: " + err));
})

// add wallet to drop 
router.post("/:drop", (req, res) => {
  Drop.find({ id: req.params.drop })
  .then((drop) => {
    let wallets = drop[0].registeredWallets;
    wallets.push(req.body.wallet);

    return Drop.updateOne({ id: req.params.drop }, {$set: { registeredWallets: wallets }})
  })
  .then(() => res.json("wallet added"))
  .catch((err) => res.status(400).json("Error: " + err));
})
 
module.exports = router;
