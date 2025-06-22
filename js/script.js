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

    //disable right-click and keyboard shortcuts
function typeWriter(element, text, i = 0, speed = 50) {
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  alert('Right-click is disabled');
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
const textRotatorElements = document.querySelectorAll('.text-rotator');
textRotatorElements.forEach(element => {
    new TextRotator(element);
});

// Dynamic Section Loading
// This function dynamically loads a section's JavaScript file when needed
const loadSection = async (section) => {
  const { init } = await import(`./sections/${section}.js`);
  init();
};

// Load sections as needed
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#contact')) {
    loadSection('contact');
  }
});

// Add this to your existing JavaScript
function initTextAnimation() {
  const words = ["Junior Web Developer", "Frontend Specialist", "UI Enthusiast", "Code Lover"];
  let currentIndex = 0;
  const textElement = document.querySelector('.hero h2');
  
  function animateText() {
    gsap.to(textElement, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      ease: "power2.out",
      onComplete: () => {
        currentIndex = (currentIndex + 1) % words.length;
        textElement.textContent = words[currentIndex];
        gsap.to(textElement, {
          duration: 0.5,
          opacity: 1,
          y: 0,
          ease: "power2.out"
        });
      }
    });
  }
  
  // Change text every 3 seconds
  setInterval(animateText, 3000);
}

// Call it when DOM is loaded
document.addEventListener('DOMContentLoaded', initTextAnimation);

// In your main.js, add this animation code
function initAdvancedTextAnimations() {
  // Profession texts to cycle through
  const professions = [
    "Junior Web Developer",
    "Frontend Specialist",
    "UI/UX  Designer",
    "Creative Coder",
    "Problem Solver",
    "Mysql Database Intermediate",
  ];
  
  // Animation timeline
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  
  // Name animation
  tl.to(".name-animation", {
    duration: 0.8,
    opacity: 1,
    y: 0,
    scale: 1.1,
    color: "#0d6efd",
  })
  .to(".name-animation", {
    duration: 0.5,
    scale: 1,
    color: "#ffffff",
  });
  
  // Profession animation
  let currentProfessionIndex = 0;
  const professionElement = document.querySelector(".profession-text");
  
  function animateProfession() {
    // Get next profession
    currentProfessionIndex = (currentProfessionIndex + 1) % professions.length;
    const nextProfession = professions[currentProfessionIndex];
    
    // Create animation timeline for text change
    const professionTl = gsap.timeline();
    
    professionTl.to(professionElement, {
      duration: 0.3,
      opacity: 0,
      y: -20,
      onComplete: () => {
        professionElement.textContent = nextProfession;
      }
    })
    .to(professionElement, {
      duration: 0.4,
      opacity: 1,
      y: 0
    })
    .to(professionElement, {
      duration: 0.2,
      scale: 1.05,
      yoyo: true,
      repeat: 1
    });
    
    // Schedule next animation
    gsap.delayedCall(3, animateProfession);
  }
  
  // Initial profession animation
  tl.to(".profession-text", {
    duration: 0.8,
    opacity: 1,
    y: 0,
    onComplete: () => {
      // Start cycling professions after initial animation
      gsap.delayedCall(2, animateProfession);
    }
  });
  
  // Add some decorative elements animation
  tl.from(".hero p", {
    duration: 0.6,
    opacity: 0,
    y: 20,
    stagger: 0.1
  }, "-=0.4")
  .from(".hero .btn", {
    duration: 0.5,
    opacity: 0,
    y: 20,
    stagger: 0.15,
    ease: "back.out(1.7)"
  }, "-=0.3");
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Make sure GSAP and ScrollTrigger are loaded
  if (typeof gsap !== "undefined") {
    initAdvancedTextAnimations();
  } else {
    console.error("GSAP is not loaded");
  }
});