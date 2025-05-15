const mongoose = require("mongoose");
const Joi = require("joi");

// Create Student Schema
const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    minlength: 5,
    maxlength: 255,
  },
  studentNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{11}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  studentGrade: {
    type: String,
    enum: ["1prep", "2prep", "3prep", "1high", "2high", "3high"],
    required: true
  },
  studentCash: {
    type: Number,
    default: 0,
    min: 0
  },
  boughtMonths: [{
    monthId: Number,
    name: String,
    grade: Number,
    price: Number,
    purchaseDate: {
      type: Date,
      default: Date.now
    }
  }],
  assignedTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },
  codeStatus: {
    type: Boolean,
    default: false,
  },
  activateDate: {
    type: Date,
    default: Date.now
  },
  watchedClasses: [String],
  role: {
    type: String,
    default: 'student',
    enum: ['student']
  }
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);


// Validate Student Login (number + optional password)

function validateStudentRegistration(data) {
  const schema = Joi.object({
    studentName: Joi.string().min(1).max(50).required()
      .messages({
        'string.empty': 'اسم الطالب مطلوب',
        'string.min': 'اسم الطالب قصير جدًا',
        'string.max': 'اسم الطالب طويل جدًا',
      }),

    email: Joi.string().email().min(5).max(255).required()
      .messages({
        'string.empty': 'البريد الإلكتروني مطلوب',
        'string.email': 'صيغة البريد الإلكتروني غير صحيحة',
        'string.min': 'البريد الإلكتروني قصير جدًا',
        'string.max': 'البريد الإلكتروني طويل جدًا',
      }),

    studentNumber: Joi.string().pattern(/^\d{11}$/).required()
      .messages({
        'string.empty': 'رقم الموبايل مطلوب',
        'string.pattern.base': 'رقم الموبايل يجب أن يكون 11 رقم',
      }),

    password: Joi.string().min(8).max(1024).required()
      .messages({
        'string.empty': 'كلمة المرور مطلوبة',
        'string.min': 'كلمة المرور قصيرة جدًا، يجب ألا تقل عن 8 أحرف',
        'string.max': 'كلمة المرور طويلة جدًا',
      }),

    studentGrade: Joi.string().valid("1prep", "2prep", "3prep", "1high", "2high", "3high").required()
      .messages({
        'any.only': 'الصف الدراسي غير صحيح',
        'string.empty': 'الصف الدراسي مطلوب',
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

function validateStudentLogin(data) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .messages({
        'string.email': 'صيغة البريد الإلكتروني غير صحيحة',
      }),
    
    studentNumber: Joi.string()
      .pattern(/^\d{11}$/)
      .messages({
        'string.pattern.base': 'رقم الموبايل يجب أن يتكون من 11 رقم',
      }),

    password: Joi.string()
      .required()
      .min(8)
      .max(1024)
      .messages({
        'string.empty': 'كلمة المرور مطلوبة',
        'string.min': 'كلمة المرور قصيرة جدًا',
        'string.max': 'كلمة المرور طويلة جدًا',
      }),
  })
  .xor('email', 'studentNumber')
  .messages({
    'object.missing': 'يرجى إدخال البريد الإلكتروني أو رقم الموبايل',
  });

  return schema.validate(data, { abortEarly: false });
};
function validateStudentUpdate(data) {
  const schema = Joi.object({
    studentName: Joi.string()
      .min(1)
      .max(50)
      .messages({
        'string.min': 'الاسم قصير جدًا',
        'string.max': 'الاسم طويل جدًا',
      }),

    email: Joi.string()
      .email()
      .messages({
        'string.email': 'صيغة البريد الإلكتروني غير صحيحة',
      }),

    studentNumber: Joi.string()
      .pattern(/^\d{11}$/)
      .messages({
        'string.pattern.base': 'رقم الموبايل يجب أن يكون 11 رقم',
      }),

    password: Joi.string()
      .min(8)
      .max(1024)
      .messages({
        'string.min': 'كلمة المرور قصيرة جدًا',
        'string.max': 'كلمة المرور طويلة جدًا',
      }),

    studentGrade: Joi.string()
      .valid("1prep", "2prep", "3prep", "1high", "2high", "3high")
      .messages({
        'any.only': 'الصف الدراسي غير صحيح',
      }),
  });

  return schema.validate(data, { abortEarly: false });
};



// Export The Student Model And Validation Functions
module.exports = {
  Student,
  validateStudentRegistration,
  validateStudentLogin,
  validateStudentUpdate
};
