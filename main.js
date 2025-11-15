// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const reservationForm = document.getElementById('reservationForm');
const header = document.querySelector('.header');

// Mobile Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Form Validation and Submission
if (reservationForm) {
    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(reservationForm);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!data.name || !data.phone || !data.service) {
            alert('이름, 연락처, 서비스 선택은 필수 입력사항입니다.');
            return;
        }
        
        // Phone number validation
        const phoneRegex = /^[0-9]{10,11}$/;
        const cleanPhone = data.phone.replace(/[^0-9]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            alert('올바른 전화번호를 입력해주세요.');
            return;
        }
        
        // Show loading state
        const submitBtn = reservationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '전송 중...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            alert('예약 상담 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            reservationForm.reset();
            
            // Send KakaoTalk notification (if KakaoTalk API is available)
            sendKakaoNotification(data);
            
        } catch (error) {
            alert('죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.');
            console.error('Form submission error:', error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// KakaoTalk Notification Function
function sendKakaoNotification(data) {
    // This is a placeholder function - implement actual KakaoTalk API integration
    console.log('KakaoTalk notification would be sent with data:', data);
    
    // Example KakaoTalk API integration:
    /*
    if (window.Kakao && window.Kakao.isInitialized()) {
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: 'REVINK 예약 상담 신청',
                description: `이름: ${data.name}\n서비스: ${getServiceName(data.service)}\n연락처: ${data.phone}`,
                imageUrl: 'https://example.com/revink-logo.jpg',
                link: {
                    mobileWebUrl: 'https://revink.com',
                    webUrl: 'https://revink.com'
                }
            },
            buttons: [
                {
                    title: '관리자 페이지',
                    link: {
                        mobileWebUrl: 'https://revink.com/admin',
                        webUrl: 'https://revink.com/admin'
                    }
                }
            ]
        });
    }
    */
}

// Helper function to get service name
function getServiceName(service) {
    const services = {
        'smp': '두피문신 (SMP)',
        'styling': '헤어 스타일링',
        'care': '두피 케어',
        'consultation': '상담'
    };
    return services[service] || service;
}

// Phone Number Auto-formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^0-9]/g, '');
        let formattedValue = '';
        
        if (value.length < 4) {
            formattedValue = value;
        } else if (value.length < 7) {
            formattedValue = value.slice(0, 3) + '-' + value.slice(3);
        } else if (value.length < 11) {
            formattedValue = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
        } else {
            formattedValue = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
        }
        
        e.target.value = formattedValue;
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .review-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Social Media Links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-instagram')) {
            // Open Instagram
            window.open('https://instagram.com/revink_official', '_blank');
        } else if (icon.classList.contains('fa-kakao')) {
            // Open KakaoTalk channel
            window.open('https://pf.kakao.com/OnYourRevink', '_blank');
        } else if (icon.classList.contains('fa-phone')) {
            // Make phone call
            window.location.href = 'tel:010-2932-9092';
        }
    });
});

// Add mobile menu styles dynamically
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 40px 20px;
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Auto-refresh functionality (optional)
// Uncomment the following lines if you want the page to refresh periodically
/*
setInterval(() => {
    if (document.hidden) {
        location.reload();
    }
}, 300000); // Refresh every 5 minutes when tab is hidden
*/