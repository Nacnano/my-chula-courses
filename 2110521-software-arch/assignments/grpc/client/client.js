const PROTO_PATH = "../restaurant.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

var restaurantService =
  grpc.loadPackageDefinition(packageDefinition).RestaurantService;
const client = new restaurantService(
  "localhost:30043",
  grpc.credentials.createInsecure()
);

module.exports = client;
