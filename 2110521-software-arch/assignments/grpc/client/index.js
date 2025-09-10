require("dotenv").config();
const client = require("./client");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Home page - Get all menu items
app.get("/", (req, res) => {
  client.getAllMenu(null, (err, data) => {
    if (!err) {
      res.render("menu", {
        results: data.menu,
      });
    } else {
      console.error("Error fetching menu:", err);
      res.render("menu", {
        results: [],
        error: "Failed to load menu items",
      });
    }
  });
});

// Save new menu item
app.post("/save", (req, res) => {
  let newMenuItem = {
    name: req.body.name,
    price: parseInt(req.body.price),
  };

  client.insert(newMenuItem, (err, data) => {
    if (err) {
      console.error("Error creating menu item:", err);
      res.redirect("/?error=Failed to create menu item");
    } else {
      console.log("New Menu created successfully", data);
      res.redirect("/");
    }
  });
});

// Update menu item
app.post("/update", (req, res) => {
  const updateMenuItem = {
    id: req.body.id,
    name: req.body.name,
    price: parseInt(req.body.price),
  };

  console.log("Updating Item:", updateMenuItem);

  client.update(updateMenuItem, (err, data) => {
    if (err) {
      console.error("Error updating menu item:", err);
      res.redirect("/?error=Failed to update menu item");
    } else {
      console.log("Menu Item updated successfully", data);
      res.redirect("/");
    }
  });
});

// Remove menu item
app.post("/remove", (req, res) => {
  client.remove({ id: req.body.menuItem_id }, (err, _) => {
    if (err) {
      console.error("Error removing menu item:", err);
      res.redirect("/?error=Failed to remove menu item");
    } else {
      console.log("Menu Item removed successfully");
      res.redirect("/");
    }
  });
});

const PORT = process.env.CLIENT_PORT || 3000;
app.listen(PORT, () => {
  console.log("Client server running at port %d", PORT);
});
