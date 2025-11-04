const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("../config/mongodb");
const Hospital = require("../models/Hospital");

dotenv.config({ path: path.join(__dirname, "../config/config.env") });

const hospitalSeeds = [
  {
    name: "Chulalongkorn Hospital",
    address: "1873 Rama IV Rd",
    district: "Pathum Wan",
    province: "Bangkok",
    postalcode: "10330",
    tel: "026494000",
    region: "Central",
  },
  {
    name: "Siriraj Hospital",
    address: "2 Wang Lang Rd",
    district: "Bangkok Noi",
    province: "Bangkok",
    postalcode: "10700",
    tel: "024196000",
    region: "Central",
  },
  {
    name: "Chiang Mai University Hospital",
    address: "110 Inthawarorot Rd",
    district: "Muang",
    province: "Chiang Mai",
    postalcode: "50200",
    tel: "053935111",
    region: "Northern",
  },
];

const upsertHospitals = async () => {
  const operations = hospitalSeeds.map((hospital) => ({
    updateOne: {
      filter: { name: hospital.name },
      update: { $set: hospital },
      upsert: true,
    },
  }));

  const result = await Hospital.bulkWrite(operations);
  const upserts = result.upsertedCount || 0;
  const modified = result.modifiedCount || 0;
  console.log(`Seed complete. Upserted ${upserts}, modified ${modified}.`);
};

const clearHospitals = async () => {
  const outcome = await Hospital.deleteMany({});
  console.log(`Removed ${outcome.deletedCount} hospital records.`);
};

const run = async () => {
  try {
    await connectDB();

    if (process.argv.includes("--clear")) {
      await clearHospitals();
    } else {
      await upsertHospitals();
    }
  } catch (err) {
    console.error("Hospital seed failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

run();
