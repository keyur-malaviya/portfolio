// ========================================
// SMOOTH SCROLLING ANIMATION
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and text elements
document.querySelectorAll('.stat-box, .timeline-item, .project-card, .edu-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ========================================
// PROGRESSIVE SKILL BAR ANIMATION
// ========================================

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar && !progressBar.style.width) {
                const finalWidth = progressBar.parentElement.parentElement.querySelector('.skill-name').textContent;
                progressBar.style.animation = 'none';
                setTimeout(() => {
                    progressBar.style.animation = 'slideInLeft 1.5s ease-out forwards';
                }, 100);
            }
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(99, 102, 241, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========================================
// INTERACTIVE HOVER EFFECTS
// ========================================

document.querySelectorAll('.stat-box, .project-card, .edu-card, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// FLOATING ANIMATION FOR SHAPES
// ========================================

const shapes = document.querySelectorAll('.shape');
shapes.forEach((shape, index) => {
    const duration = 6000 + index * 1000;
    const yMovement = 30 + index * 10;
    
    let position = 0;
    let direction = 1;
    
    setInterval(() => {
        position += direction * 0.5;
        if (position > yMovement) direction = -1;
        if (position < -yMovement) direction = 1;
        shape.style.transform = `translateY(${position}px)`;
    }, 16);
});

// ========================================
// CURSOR EFFECT (Optional Enhancement)
// ========================================

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Create subtle parallax effect
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        const rect = shape.getBoundingClientRect();
        const shapeX = rect.left + rect.width / 2;
        const shapeY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
            Math.pow(mouseX - shapeX, 2) + Math.pow(mouseY - shapeY, 2)
        );

        if (distance < 300) {
            const angle = Math.atan2(mouseY - shapeY, mouseX - shapeX);
            const moveX = Math.cos(angle) * 5;
            const moveY = Math.sin(angle) * 5;
            shape.style.filter = `blur(${1 + distance / 100}px)`;
        }
    });
});

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================

const buttons = document.querySelectorAll('.btn, .tech-tag, .skill-tag');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statBox = entry.target;
            const h3 = statBox.querySelector('h3');
            const text = h3.textContent;
            
            // Extract number from text
            const numberMatch = text.match(/\d+/);
            if (numberMatch) {
                const finalNumber = parseInt(numberMatch[0]);
                let currentNumber = 0;
                const increment = Math.ceil(finalNumber / 30);
                
                const counter = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        currentNumber = finalNumber;
                        clearInterval(counter);
                    }
                    h3.textContent = currentNumber + '+';
                }, 30);
            }
            
            countObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box').forEach(box => {
    countObserver.observe(box);
});

// ========================================
// ADD RIPPLE KEYFRAME
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// LAZY LOADING IMAGES (if any)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-secondary)';
        }
    });
});

// ========================================
// PAGE LOAD ANIMATION
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeIn 0.5s ease-in';
});

// Add fade-in animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(styleSheet);

console.log('Portfolio loaded successfully!');
