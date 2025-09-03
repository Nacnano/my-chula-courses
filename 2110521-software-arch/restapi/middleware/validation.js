const { body, validationResult } = require("express-validator");

// Validation rules for shrine creation/update
const shrineValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ max: 100 })
      .withMessage("Name cannot exceed 100 characters")
      .trim(),

    body("type")
      .isIn([
        "Buddhist Temple",
        "Hindu Temple",
        "Chinese Shrine",
        "Spirit House",
        "Other",
      ])
      .withMessage("Invalid shrine type"),

    body("location.address")
      .notEmpty()
      .withMessage("Address is required")
      .trim(),

    body("location.province")
      .notEmpty()
      .withMessage("Province is required")
      .trim(),

    body("location.coordinates.latitude")
      .optional()
      .isFloat({ min: -90, max: 90 })
      .withMessage("Latitude must be between -90 and 90"),

    body("location.coordinates.longitude")
      .optional()
      .isFloat({ min: -180, max: 180 })
      .withMessage("Longitude must be between -180 and 180"),

    body("description")
      .optional()
      .isLength({ max: 1000 })
      .withMessage("Description cannot exceed 1000 characters"),

    body("established")
      .optional()
      .isInt({ min: 0, max: new Date().getFullYear() })
      .withMessage("Invalid establishment year"),

    body("rating")
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),

    body("contact.email")
      .optional()
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),

    body("contact.phone")
      .optional()
      .matches(/^[0-9\-\+\(\)\s]+$/)
      .withMessage("Invalid phone number format"),
  ];
};

// Check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  shrineValidationRules,
  validate,
};
