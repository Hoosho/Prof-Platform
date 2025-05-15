const mongoose = require('mongoose');
const Joi = require('joi');
// Teacher --> has many --> Months --> has many --> Classes

// Create Month Schema
const monthSchema = new mongoose.Schema({
    orderOfTheMonth : {
        type : Number,
        required : true,
        enum : [1,2,3,4,5,6,7,8,9,10,11,12],
    },
    name: {
        type : String,
        required : true,
        enum : ['يناير','فبراير','مارس','ابريل','مايو','يونيو','يوليو','اغسطس','سبتمبر','اكتوبر','نوفمبر','ديسمبر']
    },
    grade: {
        type : Number,
        required : true,
        enum : [1,2,3,4,5,6]
    },
    priceOfMonth: {
        type : Number,
        required : true,
        min : 0,
        max : 1000,
    },
    teacherId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Teacher',
        required : true
    }
}, { timestamps: true });


// Create Class Schema
const classSchema = new mongoose.Schema({
    orderOfTheClass : {
        type : Number,
        required : true,
        enum : [1,2,3,4,5,6,7,8,9,10,11,12],
    },
    title : {
        type : String,
        required : true,
        minlength : 0,
        maxlength : 80,
    },
    description : {
        type : String,
        required : true,
        minlength : 0,
        maxlength : 100,
    },
    grade : {
        type : Number,
        required : true,
        enum : [1,2,3,4,5,6],
    },
    url : {
        type : String,
        required : true,
        minlength : 0,
        maxlength : 100,
        match : /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
    },
    pdf : {
        type : String,
        required : true,
        match : /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
    },
    exam : {
        type : String,
        required : true,
        minlength : 0,
        maxlength : 100,
        match : /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
    },
    monthId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Month',
        required : true,
    }
  }, { timestamps : true });

// Create Teacher Schema
const teacherSchema = new mongoose.Schema({
    teacherName: { 
        type : String,
        required : true,
        minlength : 0,
        maxlength : 40,
    },
    teacherNumber: { 
        type: String, 
        required: true,
        unique : true,
        match : /^\d{11}$/,

    },
    email : {
        type : String,
        required : true,
        unique : true,
        match : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        minlength : 5,
        maxlength : 255,
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        maxlength : 1024,
    },
    availableMonths: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Month',
        }],
      
      availableClasses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
        }],
    role : {
        type : String,
        default : 'student',
        enum : ['teacher','admin'],
    }
}, { timestamps : true });



// Function to Validate Teacher Registration
function validateTeacherRegistration(teacherData) {
    const schema = Joi.object({
        teacherName: Joi.string()
            .required()
            .min(1)
            .max(40)
            .messages({
                'string.empty': 'الاسم مطلوب',
                'string.min': 'الاسم قصير جدًا',
                'string.max': 'الاسم طويل جدًا',
            }),
        teacherNumber: Joi.string()
            .required()
            .pattern(/^\d{11}$/)
            .messages({
                'string.empty': 'رقم الموبايل مطلوب',
                'string.pattern.base': 'رقم الموبايل يجب أن يتكون من 11 رقم',
            }),
        email: Joi.string()
            .required()
            .email()
            .messages({
                'string.empty': 'البريد الإلكتروني مطلوب',
                'string.email': 'صيغة البريد الإلكتروني غير صحيحة',
            }),
        password: Joi.string()
            .required()
            .min(8)
            .max(1024)
            .messages({
                'string.empty': 'كلمة المرور مطلوبة',
                'string.min': 'كلمة المرور قصيرة جدًا، يجب أن تكون 8 أحرف على الأقل',
                'string.max': 'كلمة المرور طويلة جدًا',
            }),
    });
    return schema.validate(teacherData, { abortEarly: false });
}

// Function to Validate Teacher Login
function validateTeacherLogin(teacherData) {
    const schema = Joi.object({
        teacherNumber: Joi.string()
            .pattern(/^\d{11}$/)
            .messages({
                'string.pattern.base': 'رقم الموبايل يجب أن يتكون من 11 رقم',
            }),
        email: Joi.string()
            .email()
            .messages({
                'string.email': 'صيغة البريد الإلكتروني غير صحيحة',
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
    }).xor('teacherNumber', 'email')
      .messages({
          'object.missing': 'يرجى إدخال إما البريد الإلكتروني أو رقم الهاتف فقط',
          'object.xor': 'يرجى إدخال البريد الإلكتروني أو رقم الهاتف فقط، وليس الاثنين معًا',
      });

    return schema.validate(teacherData, { abortEarly: false });
}

// Function to Validate Month Registration
function validateMonthRegistration(monthData) {
    const schema = Joi.object({
        orderOfTheMonth: Joi.number()
            .required()
            .valid(...Array.from({length: 12}, (_, i) => i + 1))
            .messages({
                'any.only': 'ترتيب الشهر غير صحيح',
                'number.base': 'ترتيب الشهر يجب أن يكون رقم',
                'any.required': 'ترتيب الشهر مطلوب',
            }),
        name: Joi.string()
            .required()
            .valid('يناير','فبراير','مارس','ابريل','مايو','يونيو','يوليو','اغسطس','سبتمبر','اكتوبر','نوفمبر','ديسمبر')
            .messages({
                'any.only': 'اسم الشهر غير صالح',
                'string.empty': 'اسم الشهر مطلوب',
            }),
        grade: Joi.number()
            .required()
            .valid(1, 2, 3, 4, 5, 6)
            .messages({
                'any.only': 'الصف غير صحيح',
                'any.required': 'الصف مطلوب',
            }),
        priceOfMonth: Joi.number()
            .required()
            .min(0)
            .max(1000)
            .messages({
                'number.base': 'السعر يجب أن يكون رقم',
                'number.min': 'السعر لا يمكن أن يكون أقل من 0',
                'number.max': 'السعر لا يمكن أن يزيد عن 1000',
            }),
    });
    return schema.validate(monthData, { abortEarly: false });
}

// Function to Validate Class Registration
function validateClassRegistration(classData) {
    const schema = Joi.object({
        orderOfTheClass: Joi.number()
            .required()
            .valid(...Array.from({length: 12}, (_, i) => i + 1))
            .messages({
                'any.only': 'ترتيب الحصة غير صحيح',
                'any.required': 'ترتيب الحصة مطلوب',
            }),
        title: Joi.string()
            .required()
            .max(80)
            .messages({
                'string.empty': 'العنوان مطلوب',
                'string.max': 'العنوان طويل جدًا',
            }),
        description: Joi.string()
            .required()
            .max(100)
            .messages({
                'string.empty': 'الوصف مطلوب',
                'string.max': 'الوصف طويل جدًا',
            }),
        grade: Joi.number()
            .required()
            .valid(1, 2, 3, 4, 5, 6)
            .messages({
                'any.only': 'الصف غير صحيح',
                'any.required': 'الصف مطلوب',
            }),
        url: Joi.string()
            .required()
            .pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/)
            .messages({
                'string.empty': 'رابط الفيديو مطلوب',
                'string.pattern.base': 'صيغة رابط الفيديو غير صحيحة',
            }),
        pdf: Joi.string()
            .required()
            .pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/)
            .messages({
                'string.empty': 'رابط الـ PDF مطلوب',
                'string.pattern.base': 'صيغة رابط الـ PDF غير صحيحة',
            }),
        exam: Joi.string()
            .required()
            .pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/)
            .messages({
                'string.empty': 'رابط الامتحان مطلوب',
                'string.pattern.base': 'صيغة رابط الامتحان غير صحيحة',
            }),
    });
    return schema.validate(classData, { abortEarly: false });
}

// Function to Validate Teacher Update
function validateTeacherUpdate(teacherData) {
    const schema = Joi.object({
        teacherName: Joi.string()
            .min(1)
            .max(40)
            .messages({
                'string.min': 'الاسم قصير جدًا',
                'string.max': 'الاسم طويل جدًا',
            }),
        teacherNumber: Joi.string()
            .pattern(/^\d{11}$/)
            .messages({
                'string.pattern.base': 'رقم الموبايل يجب أن يتكون من 11 رقم',
            }),
        email: Joi.string()
            .email()
            .messages({
                'string.email': 'صيغة البريد الإلكتروني غير صحيحة',
            }),
        password: Joi.string()
            .min(8)
            .max(1024)
            .messages({
                'string.min': 'كلمة المرور قصيرة جدًا',
                'string.max': 'كلمة المرور طويلة جدًا',
            }),
    });
    return schema.validate(teacherData, { abortEarly: false });
}

// Function to Validate Month Update
function validateMonthUpdate(monthData) {
    const schema = Joi.object({
        orderOfTheMonth: Joi.number()
            .valid(...Array.from({length: 12}, (_, i) => i + 1))
            .messages({
                'any.only': 'ترتيب الشهر غير صحيح',
                'number.base': 'ترتيب الشهر يجب أن يكون رقم',
            }),
        name: Joi.string()
            .valid('يناير','فبراير','مارس','ابريل','مايو','يونيو','يوليو','اغسطس','سبتمبر','اكتوبر','نوفمبر','ديسمبر')
            .messages({
                'any.only': 'اسم الشهر غير صالح',
            }),
        grade: Joi.number()
            .valid(1, 2, 3, 4, 5, 6)
            .messages({
                'any.only': 'الصف غير صحيح',
            }),
        priceOfMonth: Joi.number()
            .min(0)
            .max(1000)
            .messages({
                'number.min': 'السعر لا يمكن أن يكون أقل من 0',
                'number.max': 'السعر لا يمكن أن يزيد عن 1000',
            }),
    });
    return schema.validate(monthData, { abortEarly: false });
}

// Function to Validate Class Update
function validateClassUpdate(classData) {
    const schema = Joi.object({
        orderOfTheClass: Joi.number()
            .valid(...Array.from({length: 12}, (_, i) => i + 1))
            .messages({
                'any.only': 'ترتيب الحصة غير صحيح',
            }),
        title: Joi.string()
            .max(80)
            .messages({
                'string.max': 'العنوان طويل جدًا',
            }),
        description: Joi.string()
            .max(100)
            .messages({
                'string.max': 'الوصف طويل جدًا',
            }),
        grade: Joi.number()
            .valid(1, 2, 3, 4, 5, 6)
            .messages({
                'any.only': 'الصف غير صحيح',
            }),
        url: Joi.string()
            .pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/)
            .messages({
                'string.pattern.base': 'صيغة رابط الفيديو غير صحيحة',
            }),
        pdf: Joi.string()
            .pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/)
            .messages({
                'string.pattern.base': 'صيغة رابط الـ PDF غير صحيحة',
            }),
        exam: Joi.string()
            .pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/)
            .messages({
                'string.pattern.base': 'صيغة رابط الامتحان غير صحيحة',
            }),
    });
    return schema.validate(classData, { abortEarly: false });
}


// Export The Model And Validation Functions
const Teacher = mongoose.model("Teacher", teacherSchema);
const Month = mongoose.model("Month", monthSchema);
const Class = mongoose.model("Class", classSchema);
module.exports = {
    Teacher,
    Month,
    Class,
    validateTeacherRegistration,
    validateTeacherLogin,
    validateMonthRegistration,
    validateClassRegistration,
    validateTeacherUpdate,
    validateMonthUpdate,
    validateClassUpdate
};

// | تحسين                      | النوع        | مهم؟    |
// | -------------------------- | ------------ | ------- |
// | تشفير الباسورد             | أمان         | 🔥 جدًا |
// | حذف الباسورد من الاستجابات | أمان         | 🔥      |
// | rate limiting              | أمان         | ✅       |
// | helmet / cors              | أمان         | ✅       |
// | indexing                   | أداء         | ✅       |
// | lean queries               | أداء         | ✅       |
// | custom error messages      | تجربة مستخدم | اختياري |
// | validation fixes (Joi)     | دقة          | ✅       |
// | منع تغيير `role`           | أمان         | 🔥      |
