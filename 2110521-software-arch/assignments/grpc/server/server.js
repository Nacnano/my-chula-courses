require("dotenv").config();
const PROTO_PATH = "./restaurant.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const mongoose = require("mongoose");

// Import the Menu model
const Menu = require("../models/Menu");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

var restaurantProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// gRPC service implementations
server.addService(restaurantProto.RestaurantService.service, {
  // Get all menu items
  getAllMenu: async (_, callback) => {
    try {
      const menuItems = await Menu.find({});
      const formattedMenu = menuItems.map((item) => ({
        id: item._id.toString(),
        name: item.name,
        price: item.price,
      }));
      callback(null, { menu: formattedMenu });
    } catch (error) {
      console.error("Error fetching all menu items:", error);
      callback({
        code: grpc.status.INTERNAL,
        details: "Error fetching menu items",
      });
    }
  },

  // Get single menu item by ID
  get: async (call, callback) => {
    try {
      const menuItem = await Menu.findById(call.request.id);
      if (menuItem) {
        callback(null, {
          id: menuItem._id.toString(),
          name: menuItem.name,
          price: menuItem.price,
        });
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Menu item not found",
        });
      }
    } catch (error) {
      console.error("Error fetching menu item:", error);
      callback({
        code: grpc.status.INTERNAL,
        details: "Error fetching menu item",
      });
    }
  },

  // Insert new menu item
  insert: async (call, callback) => {
    try {
      const newMenuItem = new Menu({
        name: call.request.name,
        price: call.request.price,
      });

      const savedMenuItem = await newMenuItem.save();
      callback(null, {
        id: savedMenuItem._id.toString(),
        name: savedMenuItem.name,
        price: savedMenuItem.price,
      });
    } catch (error) {
      console.error("Error inserting menu item:", error);
      callback({
        code: grpc.status.INTERNAL,
        details: "Error creating menu item",
      });
    }
  },

  // Update existing menu item
  update: async (call, callback) => {
    try {
      const updatedMenuItem = await Menu.findByIdAndUpdate(
        call.request.id,
        {
          name: call.request.name,
          price: call.request.price,
        },
        { new: true }
      );

      if (updatedMenuItem) {
        callback(null, {
          id: updatedMenuItem._id.toString(),
          name: updatedMenuItem.name,
          price: updatedMenuItem.price,
        });
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Menu item not found",
        });
      }
    } catch (error) {
      console.error("Error updating menu item:", error);
      callback({
        code: grpc.status.INTERNAL,
        details: "Error updating menu item",
      });
    }
  },

  // Remove menu item
  remove: async (call, callback) => {
    try {
      const deletedMenuItem = await Menu.findByIdAndDelete(call.request.id);
      if (deletedMenuItem) {
        callback(null, {});
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Menu item not found",
        });
      }
    } catch (error) {
      console.error("Error removing menu item:", error);
      callback({
        code: grpc.status.INTERNAL,
        details: "Error removing menu item",
      });
    }
  },
});

const PORT = process.env.PORT || 30043;
server.bindAsync(
  `127.0.0.1:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error("Server failed to bind:", error);
      return;
    }
    console.log(`gRPC Server running at http://127.0.0.1:${PORT}`);
    server.start();
  }
);
