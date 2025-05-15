👨‍🏫 أولًا: الـ Teacher (المعلم)

كل معلم يقدر يكون عنده:

    مجموعة من الشهور الدراسية.

    وكل شهر فيه مجموعة حصص.

الحقول الخاصة بالمعلم:
الحقل	النوع	الشرح
teacherName	String	اسم المعلم
teacherNumber	String (11 رقم)	رقم الهاتف
email	String	البريد الإلكتروني
password	String	كلمة السر
availableMonths	Array of Months	الشهور المتاحة للمعلم
availableClasses	Array of Classes	الحصص المتاحة
role	Enum	(teacher / admin)
🗓️ ثانيًا: الـ Month (الشهر)
الحقول الخاصة بالشهر:
الحقل	النوع	الشرح
orderOfTheMonth	Number	ترتيب الشهر من 1 إلى 12
name	String	اسم الشهر (يناير، فبراير، ...إلخ)
grade	Number	الصف الدراسي (1 إلى 6)
priceOfMonth	Number	سعر الشهر
teacherId	ObjectId	المعلم المسؤول عن الشهر
📚 ثالثًا: الـ Class (الحصة)
الحقول:
الحقل	النوع	الشرح
orderOfTheClass	Number	ترتيب الحصة
title	String	عنوان الحصة
description	String	وصف الحصة
grade	Number	الصف الدراسي
url, pdf, exam	String	روابط لفيديو/PDF/امتحان
monthId	ObjectId	الشهر اللي الحصة فيه
👨‍🎓 رابعًا: الـ Student (الطالب)
الحقول:
الحقل	النوع	الشرح
studentName	String	اسم الطالب
email	String	البريد الإلكتروني
studentNumber	String	رقم الموبايل
password	String	كلمة السر
studentGrade	Enum	الصف الدراسي (إعدادي / ثانوي)
studentCash	Number	الرصيد الحالي
boughtMonths	Array	الشهور اللي اشتراها الطالب
assignedTeacher	ObjectId	المعلم اللي مرتبط به الطالب
codeStatus	Boolean	حالة التفعيل
watchedClasses	Array	الحصص اللي شافها الطالب
✅ أنواع التحقق (Validation):

    باستخدام Joi بنعمل تحقق من:

        البيانات عند التسجيل.

        البيانات عند التعديل.

        البيانات عند تسجيل الدخول.

مثال بسيط 👇

لما طالب يحاول يسجل، بيتأكد النظام إن:

    الاسم مش فاضي.

    الإيميل صحيح.

    رقم الموبايل 11 رقم.

    الصف الدراسي أحد القيم المسموحة.

    وهكذا...