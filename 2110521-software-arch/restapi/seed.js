const mongoose = require("mongoose");
const Shrine = require("./models/Shrine");
require("dotenv").config();

const sampleShrines = [
  {
    name: "วัดพระแก้ว",
    type: "Buddhist Temple",
    location: {
      address: "พระนคร",
      province: "กรุงเทพมหานคร",
      district: "พระนคร",
      coordinates: {
        latitude: 13.7519,
        longitude: 100.4925,
      },
    },
    description:
      "วัดพระศรีรัตนศาสดาราม หรือวัดพระแก้ว เป็นวัดในพระบรมมหาราชวัง",
    established: 1784,
    deity: "พระพุทธมหามณีรัตนปฏิมากร",
    features: ["พระแก้วมรกต", "จิตรกรรมฝาผนัง", "พระที่นั่งไพศาลทักษิณ"],
    openingHours: "8:30-15:30",
    contact: {
      phone: "02-623-5500",
      website: "http://www.watphrakaew.com",
    },
    rating: 4.8,
    visitCount: 1500000,
    isActive: true,
  },
  {
    name: "ศาลเจ้าแม่กวนอิม",
    type: "Chinese Shrine",
    location: {
      address: "ถนนยาวราช",
      province: "กรุงเทพมหานคร",
      district: "สัมพันธวงศ์",
      coordinates: {
        latitude: 13.7397,
        longitude: 100.5067,
      },
    },
    description: "ศาลเจ้าแม่กวนอิมในย่านเยาวราช เป็นศาลเจ้าจีนที่มีชื่อเสียง",
    established: 1658,
    deity: "เจ้าแม่กวนอิม",
    features: ["เจ้าแม่กวนอิมพันมือ", "ธูปหอม", "โคมแดง"],
    openingHours: "6:00-18:00",
    contact: {
      phone: "02-222-0102",
    },
    rating: 4.5,
    visitCount: 250000,
    isActive: true,
  },
  {
    name: "ศาลพระภูมิ",
    type: "Spirit House",
    location: {
      address: "หน้าบิ๊กซี",
      province: "เชียงใหม่",
      district: "เมืองเชียงใหม่",
      coordinates: {
        latitude: 18.7883,
        longitude: 98.9853,
      },
    },
    description: "ศาลพระภูมิที่มีชื่เสียงในเชียงใหม่",
    established: 1995,
    deity: "พระภูมิเจ้าที่",
    features: ["ดอกไม้สด", "น้ำหอม", "เทียนไข"],
    openingHours: "Open 24 hours",
    rating: 4.2,
    visitCount: 50000,
    isActive: true,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing data
    await Shrine.deleteMany({});

    // Insert sample data
    await Shrine.insertMany(sampleShrines);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { sampleShrines, seedDatabase };
