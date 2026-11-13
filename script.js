document.addEventListener('DOMContentLoaded', () => {
    
    // 1. إجبار الفيديو على التشغيل
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        bgVideo.play().catch(e => console.log("Autoplay blocked"));
    }

    // منع السكرول في أول ما الصفحة تفتح (عشان شاشة الشروط)
    document.body.style.overflow = 'hidden';

    // ==========================================================================
    // 2. TERMS MODAL (شاشة الشروط والموافقة)
    // ==========================================================================
    const termsModal = document.getElementById('terms-modal');
    const agreeCheckbox = document.getElementById('agree-checkbox');
    const agreeBtn = document.getElementById('agree-btn');
    const introContainer = document.getElementById('intro-container');

    // تفعيل الزرار لما يدوس على المربع الصغير
    agreeCheckbox.addEventListener('change', () => {
        agreeBtn.disabled = !agreeCheckbox.checked;
    });

    // لما يدوس "I AGREE"
    agreeBtn.addEventListener('click', () => {
        // إخفاء شاشة الشروط
        termsModal.style.display = 'none';
        
        // إظهار حاوية الانترو عشان تبدأ الحركة
        introContainer.style.display = 'flex';

        // بدء الانترو السينمائي
        startCinematicIntro();
    });

    // ==========================================================================
    // 3. CINEMATIC INTRO (الانترو السينمائي)
    // ==========================================================================
    function startCinematicIntro() {
        // تأخير بسيط عشان نتأكد إن العناصر ظهرت في الشاشة قبل ما GSAP يشتغل
        setTimeout(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    introContainer.style.display = 'none';
                    document.body.style.overflow = 'auto'; // السماح بالسكرول
                    initScrollAnimations(); // تشغيل حركات السكرول
                }
            });

            tl.to('.intro-text', { opacity: 1, scale: 1.05, duration: 2.5, ease: 'power2.out' })
              .to('.intro-text', { duration: 1.5 })
              .to('.intro-text', { opacity: 0, scale: 1.2, duration: 0.2, ease: 'power4.in' })
              .to('.bar-top', { yPercent: 100, duration: 0.6, ease: 'power4.inOut' }, '+=0.1')
              .to('.bar-bottom', { yPercent: -100, duration: 0.6, ease: 'power4.inOut' }, '<')
              .to({}, { duration: 0.2 })
              .to('.bar-top', { yPercent: -100, duration: 1.2, ease: 'expo.inOut' })
              .to('.bar-bottom', { yPercent: 100, duration: 1.2, ease: 'expo.inOut' }, '<');
        }, 100);
    }

    // ==========================================================================
    // 4. SCROLL ANIMATIONS (حركات السكرول)
    // ==========================================================================
    function initScrollAnimations() {
        if(typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            gsap.from('.feature-card', { scrollTrigger: { trigger: '.features-grid', start: 'top 80%' }, y: 50, opacity: 0, duration: 0.8, stagger: 0.2 });
            gsap.from('.price-card', { scrollTrigger: { trigger: '.pricing-grid', start: 'top 80%' }, y: 50, opacity: 0, duration: 0.8, stagger: 0.2 });
            gsap.from('.step', { scrollTrigger: { trigger: '.steps-grid', start: 'top 85%' }, y: 30, opacity: 0, duration: 0.6, stagger: 0.15 });
            gsap.from('.testimonial-card', { scrollTrigger: { trigger: '.testimonial-grid', start: 'top 85%' }, y: 30, opacity: 0, duration: 0.6, stagger: 0.15 });
        }
    }

    // ==========================================================================
    // 5. FAQ ACCORDION (الأسئلة الشائعة)
    // ==========================================================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const parent = question.parentElement;
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== parent) item.classList.remove('active');
            });
            parent.classList.toggle('active');
        });
    });

    // ==========================================================================
    // 6. PAYMENT MODAL (مربع الدفع)
    // ==========================================================================
    const modal = document.getElementById('payment-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-plan-title');
    const openModalBtns = document.querySelectorAll('.open-payment');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const plan = this.getAttribute('data-plan');
            const price = this.getAttribute('data-price');
            
            if (modalTitle) {
                modalTitle.innerHTML = `${plan} <span>${price} EGP</span>`;
            }
            
            if (modal) {
                modal.classList.add('active');
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});