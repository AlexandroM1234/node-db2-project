const express = require("express");

const knex = require("knex");

const knexfile = require("./knexfile");

const db = knex(knexfile.development);

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting cars" });
      console.log("error getting cars", err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id })
    .then((car) => {
      res.status(200).json(car);
    })
    .catch((err) => {
      res.status(500).json({ error: "error retrieving data" });
      console.log("messed up getting car with that id", err);
    });
});

router.post("/", (req, res) => {
  const newCar = req.body;
  db("cars")
    .insert(newCar)
    .then((car) => {
      res.status(201).json(car);
    })
    .catch((err) => {
      res.status(500).json({ error: "error adding a new car" });
      console.log("you messed up adding a new car", err);
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("cars")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count) {
        res.status(200).json(changes);
      } else {
        res
          .status(404)
          .json({ error: "a car with that id could not be found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "error updating a post " });
      console.log("error updating a post", err);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id })
    .delete({ id })
    .then((post) => {
      if (post) {
        res.status(200).json({ message: "post was deleted" });
      } else {
        res
          .status(404)
          .json({ message: "post with that id could not be found" });
      }
    });
});

module.exports = router;
