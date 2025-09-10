const client = require("./client");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route to get all menu items
app.get("/", (req, res) => {
  client.getAllMenu(null, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching menu data");
    }
    res.render("menu", {
      results: data.menu,
    });
  });
});

// Route to save a new menu item
app.post("/save", (req, res) => {
  let newMenuItem = {
    name: req.body.name,
    price: req.body.price,
  };
  client.insert(newMenuItem, (err, data) => {
    if (err) throw err;
    console.log("New Menu created successfully", data);
    res.redirect("/");
  });
});

// Route to update a menu item
app.post("/update", (req, res) => {
  const updateMenuItem = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
  };
  client.update(updateMenuItem, (err, data) => {
    if (err) throw err;
    console.log("Menu Item updated successfully", data);
    res.redirect("/");
  });
});

// Route to remove a menu item
app.post("/remove", (req, res) => {
  client.remove({ id: req.body.menuItem_id }, (err, _) => {
    if (err) throw err;
    console.log("Menu Item removed successfully");
    res.redirect("/");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Web Server running at port %d", PORT);
});
