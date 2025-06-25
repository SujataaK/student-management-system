const { body, validationResult } = require('express-validator');

const studentValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('age').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
  body('course').notEmpty().withMessage('Course is required')
];

const validateStudent = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({ field: err.param, message: err.msg }));
    return res.status(400).json({ errors: formattedErrors });
  }
  next();
};

module.exports = {
  studentValidationRules,
  validateStudent
};
