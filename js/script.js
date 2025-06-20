// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // Scroll animations
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero text animation
    gsap.from(".hero h1", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out"
    });
    
    gsap.from(".hero h2", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 0.3
    });
    
    gsap.from(".hero p", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 0.6
    });
    
    gsap.from(".hero .btn", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 0.9,
        stagger: 0.2
    });
    
    // Section animations
    gsap.utils.toArray("section").forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
    
    // Skill bar animations
    gsap.utils.toArray(".progress-bar").forEach(bar => {
        const width = bar.style.width;
        bar.style.width = "0";
        
        ScrollTrigger.create({
            trigger: bar,
            start: "top 80%",
            onEnter: () => {
                gsap.to(bar, {
                    width: width,
                    duration: 1.5,
                    ease: "power3.out"
                });
            }
        });
    });
    
    // Project card hover animations
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  alert('Right-click is disabled');
});

document.addEventListener('keydown', function(e) {
  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
  if (e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && e.key === 'I') || 
      (e.ctrlKey && e.shiftKey && e.key === 'J') ||
      (e.ctrlKey && e.key === 'U')) {
    e.preventDefault();
    alert('Viewing source is disabled');
  }
});

// Initialize typewriter on home section heading
const homeHeading = document.querySelector('#home h1');
if (homeHeading) {
    const originalText = homeHeading.textContent;
    homeHeading.textContent = ''; // Clear the text
    typeWriter(homeHeading, originalText);
}

// Text Rotator Functionality
class TextRotator {
    constructor(element) {
        this.element = element;
        this.words = JSON.parse(element.getAttribute('data-rotate'));
        this.currentWordIndex = 0;
        this.isDeleting = false;
        this.text = '';
        this.typeSpeed = 100; // Adjust typing speed
        this.deleteSpeed = 50; // Adjust deleting speed
        this.delayBetweenWords = 2000; // Adjust delay
        
        this.type();
    }

    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            this.text = currentWord.substring(0, this.text.length - 1);
        } else {
            this.text = currentWord.substring(0, this.text.length + 1);
        }

        this.element.textContent = this.text;

        let typeSpeed = this.typeSpeed;
        
        if (this.isDeleting) {
            typeSpeed = this.deleteSpeed;
        }

        if (!this.isDeleting && this.text === currentWord) {
            typeSpeed = this.delayBetweenWords;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize text rotator
document.addEventListener('DOMContentLoaded', () => {
    const textRotators = document.querySelectorAll('.text-rotate');
    textRotators.forEach(rotator => new TextRotator(rotator));
});

//disable right click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert("Right-click is disabled on this page.");
});
