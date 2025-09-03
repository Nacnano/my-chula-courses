const mongoose = require("mongoose");

const shrineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Shrine name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    type: {
      type: String,
      required: [true, "Shrine type is required"],
      enum: [
        "Buddhist Temple",
        "Hindu Temple",
        "Chinese Shrine",
        "Spirit House",
        "Other",
      ],
      default: "Other",
    },
    location: {
      address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
      },
      province: {
        type: String,
        required: [true, "Province is required"],
        trim: true,
      },
      district: {
        type: String,
        trim: true,
      },
      coordinates: {
        latitude: {
          type: Number,
          min: [-90, "Latitude must be between -90 and 90"],
          max: [90, "Latitude must be between -90 and 90"],
        },
        longitude: {
          type: Number,
          min: [-180, "Longitude must be between -180 and 180"],
          max: [180, "Longitude must be between -180 and 180"],
        },
      },
    },
    description: {
      type: String,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    established: {
      type: Number,
      min: [0, "Year must be positive"],
      max: [new Date().getFullYear(), "Year cannot be in the future"],
    },
    deity: {
      type: String,
      trim: true,
      maxlength: [100, "Deity name cannot exceed 100 characters"],
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    openingHours: {
      type: String,
      trim: true,
      default: "Open 24 hours",
    },
    contact: {
      phone: {
        type: String,
        trim: true,
        match: [/^[0-9\-\+\(\)\s]+$/, "Invalid phone number format"],
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      },
      website: {
        type: String,
        trim: true,
      },
    },
    rating: {
      type: Number,
      min: [0, "Rating must be between 0 and 5"],
      max: [5, "Rating must be between 0 and 5"],
      default: 0,
    },
    visitCount: {
      type: Number,
      min: [0, "Visit count must be positive"],
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    images: [
      {
        url: String,
        caption: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better performance
shrineSchema.index({ name: 1 });
shrineSchema.index({ type: 1 });
shrineSchema.index({ "location.province": 1 });
shrineSchema.index({ rating: -1 });
shrineSchema.index({ createdAt: -1 });

// Virtual for full address
shrineSchema.virtual("fullAddress").get(function () {
  return `${
    this.location.address
  }, ${this.location.district ? this.location.district + ", " : ""}${this.location.province}`;
});

module.exports = mongoose.model("Shrine", shrineSchema);
