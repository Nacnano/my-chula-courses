const Shrine = require("../models/Shrine");

// @desc    Get all shrines
// @route   GET /api/shrines
// @access  Public
const getShrines = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    // Filter by type
    if (req.query.type) {
      query.type = req.query.type;
    }

    // Filter by province
    if (req.query.province) {
      query["location.province"] = new RegExp(req.query.province, "i");
    }

    // Search by name
    if (req.query.search) {
      query.name = new RegExp(req.query.search, "i");
    }

    // Filter by active status
    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === "true";
    }

    // Sort options
    let sortOptions = { createdAt: -1 };
    if (req.query.sort) {
      switch (req.query.sort) {
        case "name":
          sortOptions = { name: 1 };
          break;
        case "rating":
          sortOptions = { rating: -1 };
          break;
        case "visitCount":
          sortOptions = { visitCount: -1 };
          break;
      }
    }

    const shrines = await Shrine.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Shrine.countDocuments(query);

    res.status(200).json({
      success: true,
      count: shrines.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: shrines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get single shrine
// @route   GET /api/shrines/:id
// @access  Public
const getShrine = async (req, res) => {
  try {
    const shrine = await Shrine.findById(req.params.id);

    if (!shrine) {
      return res.status(404).json({
        success: false,
        message: "Shrine not found",
      });
    }

    res.status(200).json({
      success: true,
      data: shrine,
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Shrine not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Create new shrine
// @route   POST /api/shrines
// @access  Public
const createShrine = async (req, res) => {
  try {
    const shrine = await Shrine.create(req.body);

    res.status(201).json({
      success: true,
      message: "Shrine created successfully",
      data: shrine,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Update shrine
// @route   PUT /api/shrines/:id
// @access  Public
const updateShrine = async (req, res) => {
  try {
    const shrine = await Shrine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!shrine) {
      return res.status(404).json({
        success: false,
        message: "Shrine not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Shrine updated successfully",
      data: shrine,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors,
      });
    }

    // Handle invalid ObjectId
    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Shrine not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Delete shrine
// @route   DELETE /api/shrines/:id
// @access  Public
const deleteShrine = async (req, res) => {
  try {
    const shrine = await Shrine.findByIdAndDelete(req.params.id);

    if (!shrine) {
      return res.status(404).json({
        success: false,
        message: "Shrine not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Shrine deleted successfully",
      data: shrine,
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Shrine not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get shrine statistics
// @route   GET /api/shrines/stats
// @access  Public
const getShrineStats = async (req, res) => {
  try {
    const stats = await Shrine.aggregate([
      {
        $group: {
          _id: null,
          totalShrines: { $sum: 1 },
          averageRating: { $avg: "$rating" },
          totalVisits: { $sum: "$visitCount" },
        },
      },
    ]);

    const typeStats = await Shrine.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    const provinceStats = await Shrine.aggregate([
      {
        $group: {
          _id: "$location.province",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: stats[0] || {
          totalShrines: 0,
          averageRating: 0,
          totalVisits: 0,
        },
        byType: typeStats,
        byProvince: provinceStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getShrines,
  getShrine,
  createShrine,
  updateShrine,
  deleteShrine,
  getShrineStats,
};
