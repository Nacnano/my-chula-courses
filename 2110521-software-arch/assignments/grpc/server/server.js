const PROTO_PATH = "./restaurant.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const mongoose = require("mongoose");
const Menu = require("./models/Menu"); // Import the Menu model
require("dotenv").config(); // Load environment variables from .env file

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.error("MongoDB connection error:", err));

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const restaurantProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

// Implement the gRPC service methods to interact with MongoDB
server.addService(restaurantProto.RestaurantService.service, {
  getAllMenu: async (_, callback) => {
    try {
      const menu = await Menu.find({});
      callback(null, { menu });
    } catch (err) {
      callback({ code: grpc.status.INTERNAL, details: "Error fetching menu" });
    }
  },

  get: async (call, callback) => {
    try {
      const menuItem = await Menu.findById(call.request.id);
      if (menuItem) {
        callback(null, menuItem);
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Menu item not found",
        });
      }
    } catch (err) {
      callback({
        code: grpc.status.INTERNAL,
        details: "Error finding menu item",
      });
    }
  },

  insert: async (call, callback) => {
    try {
      const { name, price } = call.request;
      const newMenuItem = new Menu({ name, price });
      const savedItem = await newMenuItem.save();
      callback(null, savedItem);
    } catch (err) {
      callback({
        code: grpc.status.INTERNAL,
        details: "Error creating menu item",
      });
    }
  },

  update: async (call, callback) => {
    try {
      const { id, name, price } = call.request;
      const updatedItem = await Menu.findByIdAndUpdate(
        id,
        { name, price },
        { new: true }
      );
      if (updatedItem) {
        callback(null, updatedItem);
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Menu item not found",
        });
      }
    } catch (err) {
      callback({
        code: grpc.status.INTERNAL,
        details: "Error updating menu item",
      });
    }
  },

  remove: async (call, callback) => {
    try {
      const removedItem = await Menu.findByIdAndDelete(call.request.id);
      if (removedItem) {
        callback(null, {});
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Menu item not found",
        });
      }
    } catch (err) {
      callback({
        code: grpc.status.INTERNAL,
        details: "Error removing menu item",
      });
    }
  },
});

server.bindAsync(
  "127.0.0.1:30043",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Server bind error:", err);
      return;
    }
    console.log(`gRPC Server running at http://127.0.0.1:${port}`);
    server.start();
  }
);
