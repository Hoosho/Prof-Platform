/**
 * ملف JavaScript للموقع
 * يتحكم في قائمة التنقل والتأثيرات المختلفة
 *
 * تم إنشاء هذا الملف بتاريخ 15/5/2025
 * تم التأكد من عمل الناف بار بشكل صحيح
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة بنجاح');

    // ===== قائمة التنقل المتحركة =====
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    // التحقق من وجود العناصر
    if (menuToggle && mobileMenu && overlay) {
        console.log('تم العثور على عناصر القائمة المتنقلة');

        // فتح وإغلاق القائمة عند النقر على زر القائمة
        menuToggle.addEventListener('click', function() {
            console.log('تم النقر على زر القائمة');
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // إغلاق القائمة عند النقر على الطبقة الشفافة
        overlay.addEventListener('click', function() {
            console.log('تم النقر على الطبقة الشفافة');
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });

        // إغلاق القائمة عند النقر على أي رابط في القائمة
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('تم النقر على رابط في القائمة المتنقلة');
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    } else {
        console.error('لم يتم العثور على بعض عناصر القائمة المتنقلة:');
        console.error('menuToggle:', menuToggle);
        console.error('mobileMenu:', mobileMenu);
        console.error('overlay:', overlay);
    }

    // ===== زر العودة للأعلى =====
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        console.log('تم العثور على زر العودة للأعلى');

        // إظهار أو إخفاء الزر حسب موضع التمرير
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        // التمرير للأعلى عند النقر على الزر
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('تم النقر على زر العودة للأعلى');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } else {
        console.error('لم يتم العثور على زر العودة للأعلى');
    }

    // ===== تأثيرات التمرير =====
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    if (animateElements.length > 0) {
        console.log('تم العثور على عناصر التأثيرات');

        // إضافة تأثير للعناصر عند ظهورها في الشاشة
        const checkIfInView = function() {
            animateElements.forEach(function(element) {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', checkIfInView);
        checkIfInView();
    }
});
