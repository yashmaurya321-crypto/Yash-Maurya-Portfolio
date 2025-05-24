// Advanced GSAP Animations for Yash Maurya Portfolio

// Register GSAP plugins (if needed)
gsap.registerPlugin(ScrollTrigger);

// Initial setup - hide elements for animation
gsap.set([".nav", ".heading h1", ".second-h1", ".blogtext h4", ".heading-2", ".hero-footer a"], {
  opacity: 0,
  y: 50
});

// Create timeline for page load animations
const tl = gsap.timeline({ delay: 0.5 });

// 1. Animate navigation with stagger
tl.to(".nav", {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power3.out"
})

// 2. Animate main heading with proper text handling
.to(".heading h1", {
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: "power4.out",
  onStart: function() {
    // Add typing effect to the main heading while preserving HTML
    const heading = document.querySelector(".heading h1");
    const originalText = "HELLO! I AM YASH MAURYA";
    const words = originalText.split(" ");
    heading.innerHTML = "";
    
    let wordIndex = 0;
    let charIndex = 0;
    
    const typeWriter = () => {
      if (wordIndex < words.length) {
        const currentWord = words[wordIndex];
        
        if (charIndex < currentWord.length) {
          if (wordIndex === 3) { // "YASH" is the 4th word (index 3)
            if (charIndex === 0) {
              heading.innerHTML += '<span style="color: #78BEFF;" class="yash-highlight">';
            }
            heading.innerHTML += currentWord.charAt(charIndex);
            if (charIndex === currentWord.length - 1) {
              heading.innerHTML += '</span>';
              // Start floating animation after YASH is complete
              setTimeout(() => {
                gsap.to(".yash-highlight", {
                  y: -10,
                  duration: 2,
                  ease: "power2.inOut",
                  yoyo: true,
                  repeat: -1
                });
              }, 500);
            }
          } else {
            heading.innerHTML += currentWord.charAt(charIndex);
          }
          charIndex++;
          setTimeout(typeWriter, 80);
        } else {
          heading.innerHTML += " ";
          wordIndex++;
          charIndex = 0;
          setTimeout(typeWriter, 200);
        }
      }
    };
    typeWriter();
  }
}, "-=0.8")

// 3. Animate second heading with slide effect
.to(".second-h1", {
  opacity: 1,
  x: 0,
  y: 0,
  duration: 1,
  ease: "power3.out"
}, "-=0.6")

// 4. Animate location text
.to(".blogtext h4", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: "power2.out"
}, "-=0.4")

// 5. Animate availability text with scale effect
.to(".heading-2", {
  opacity: 1,
  y: 0,
  scale: 1,
  duration: 1,
  ease: "elastic.out(1, 0.8)"
}, "-=0.3")

// 6. Animate footer links with stagger
.to(".hero-footer a", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out"
}, "-=0.5");

// Advanced hover animations for navigation
const navLinks = document.querySelectorAll(".nav a, .nav h2");
navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    gsap.to(link, {
      scale: 1.1,
      color: "#78BEFF",
      duration: 0.3,
      ease: "power2.out"
    });
  });
  
  link.addEventListener("mouseleave", () => {
    gsap.to(link, {
      scale: 1,
      color: "white",
      duration: 0.3,
      ease: "power2.out"
    });
  });
});

// Floating animation will be triggered after typewriter creates the span
// This section is now handled within the typewriter callback above

// Advanced hover effects for footer links
const footerLinks = document.querySelectorAll(".hero-footer a");
footerLinks.forEach(link => {
  // Create a timeline for each link
  const linkTl = gsap.timeline({ paused: true });
  
  linkTl.to(link, {
    scale: 1.05,
    color: "#78BEFF",
    duration: 0.3,
    ease: "power2.out"
  })
  .to(link.querySelector("i"), {
    rotation: 45,
    x: 5,
    y: -5,
    duration: 0.3,
    ease: "power2.out"
  }, 0);
  
  link.addEventListener("mouseenter", () => linkTl.play());
  link.addEventListener("mouseleave", () => linkTl.reverse());
});

// Parallax scrolling effect for headings
gsap.to(".heading h1", {
  yPercent: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".heading",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

gsap.to(".second-h1", {
  yPercent: -30,
  ease: "none",
  scrollTrigger: {
    trigger: ".heading",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

// Advanced Custom Cursor System - Fixed Version
let mouse = { x: 0, y: 0 };

// Hide default cursor on body
document.body.style.cursor = 'none';
document.querySelector('*').style.cursor = 'none';

// Create custom cursor elements
const cursorInner = document.createElement('div');
const cursorOuter = document.createElement('div');

// Inner cursor (small dot)
cursorInner.className = 'cursor-inner';
cursorInner.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: #78BEFF;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
`;

// Outer cursor (ring)
cursorOuter.className = 'cursor-outer';
cursorOuter.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  border: 2px solid rgba(120, 190, 255, 0.4);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99998;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(2px);
`;

// Add cursors to body
document.body.appendChild(cursorInner);
document.body.appendChild(cursorOuter);

// Track mouse movement
document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  
  // Immediately update inner cursor
  gsap.set(cursorInner, {
    x: mouse.x,
    y: mouse.y
  });
});

// Smooth outer cursor animation
gsap.to(cursorOuter, {
  duration: 0.6,
  repeat: -1,
  ease: "none",
  motionPath: {
    path: "M0,0",
    autoRotate: false
  },
  onRepeat: function() {
    gsap.set(cursorOuter, {
      x: mouse.x,
      y: mouse.y
    });
  }
});

// Alternative smoother approach for outer cursor
let outerX = 0, outerY = 0;
function animateOuterCursor() {
  outerX += (mouse.x - outerX) * 0.1;
  outerY += (mouse.y - outerY) * 0.1;
  
  gsap.set(cursorOuter, {
    x: outerX,
    y: outerY
  });
  
  requestAnimationFrame(animateOuterCursor);
}
animateOuterCursor();

// Enhanced cursor interactions
const interactiveElements = document.querySelectorAll('a, button, .nav h2, .hero-footer a');

interactiveElements.forEach(el => {
  el.style.cursor = 'none'; // Ensure default cursor is hidden
  
  el.addEventListener('mouseenter', () => {
    gsap.to(cursorInner, {
      scale: 2,
      backgroundColor: '#ffffff',
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(cursorOuter, {
      scale: 1.5,
      borderColor: '#78BEFF',
      borderWidth: '3px',
      duration: 0.3,
      ease: "power2.out"
    });
  });
  
  el.addEventListener('mouseleave', () => {
    gsap.to(cursorInner, {
      scale: 1,
      backgroundColor: '#78BEFF',
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(cursorOuter, {
      scale: 1,
      borderColor: 'rgba(120, 190, 255, 0.4)',
      borderWidth: '2px',
      duration: 0.3,
      ease: "power2.out"
    });
  });
});

// Special effects for main heading
const mainHeading = document.querySelector(".heading h1");
if (mainHeading) {
  mainHeading.style.cursor = 'none';
  
  mainHeading.addEventListener('mouseenter', () => {
    gsap.to(cursorInner, {
      scale: 0.5,
      duration: 0.2
    });
    gsap.to(cursorOuter, {
      scale: 2.5,
      borderColor: '#78BEFF',
      borderWidth: '1px',
      duration: 0.3
    });
    
    // Add text to cursor
    cursorOuter.innerHTML = '<span style="color: #78BEFF; font-size: 12px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-weight: bold; pointer-events: none;">CLICK</span>';
  });

  mainHeading.addEventListener('mouseleave', () => {
    gsap.to(cursorInner, {
      scale: 1,
      duration: 0.2
    });
    gsap.to(cursorOuter, {
      scale: 1,
      borderColor: 'rgba(120, 190, 255, 0.4)',
      borderWidth: '2px',
      duration: 0.3
    });
    cursorOuter.innerHTML = '';
  });
}

// Click effects
document.addEventListener('mousedown', () => {
  gsap.to(cursorInner, {
    scale: 0.8,
    duration: 0.1
  });
  gsap.to(cursorOuter, {
    scale: 1.2,
    duration: 0.1
  });
});

document.addEventListener('mouseup', () => {
  gsap.to(cursorInner, {
    scale: 1,
    duration: 0.2,
    ease: "back.out(1.7)"
  });
  gsap.to(cursorOuter, {
    scale: 1,
    duration: 0.2,
    ease: "back.out(1.7)"
  });
});

// Show/hide cursor when entering/leaving window
document.addEventListener('mouseenter', () => {
  gsap.to([cursorInner, cursorOuter], {
    opacity: 1,
    duration: 0.3
  });
});

document.addEventListener('mouseleave', () => {
  gsap.to([cursorInner, cursorOuter], {
    opacity: 0,
    duration: 0.3
  });
});

// Make sure cursor is visible on load
gsap.set([cursorInner, cursorOuter], { opacity: 1 });

// Text scramble effect for second heading
function scrambleText(element, finalText, duration = 2000) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let iteration = 0;
  
  const interval = setInterval(() => {
    element.textContent = finalText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return finalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");
    
    if (iteration >= finalText.length) {
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
}

// Apply scramble effect on hover for second heading
const secondHeading = document.querySelector(".second-h1");
const originalText = secondHeading.textContent;

secondHeading.addEventListener("mouseenter", () => {
  scrambleText(secondHeading, originalText, 1000);
});

// Glitch effect for availability text
function createGlitchEffect() {
  const availabilityText = document.querySelector(".heading-2 h5");
  
  gsap.set(availabilityText, {
    textShadow: "0 0 0 transparent"
  });
  
  const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
  
  glitchTl.to(availabilityText, {
    textShadow: "2px 0 #ff0000, -2px 0 #00ffff",
    duration: 0.1,
    ease: "power2.inOut"
  })
  .to(availabilityText, {
    textShadow: "-2px 0 #ff0000, 2px 0 #00ffff",
    duration: 0.1,
    ease: "power2.inOut"
  })
  .to(availabilityText, {
    textShadow: "0 0 0 transparent",
    duration: 0.1,
    ease: "power2.inOut"
  });
}

// Start glitch effect after initial load
setTimeout(createGlitchEffect, 3000);

// Responsive animations for mobile
const mm = gsap.matchMedia();

mm.add("(max-width: 768px)", () => {
  // Adjust animations for mobile
  gsap.set(".heading h1", { fontSize: "clamp(2rem, 8vw, 3rem)" });
  gsap.set(".second-h1", { marginLeft: "20px" });
  
  // Mobile-specific hover effects
  footerLinks.forEach(link => {
    link.addEventListener("touchstart", () => {
      gsap.to(link, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out"
      });
    });
    
    link.addEventListener("touchend", () => {
      gsap.to(link, {
        scale: 1,
        duration: 0.1,
        ease: "power2.out"
      });
    });
  });
});

// Performance optimization - pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.resume();
  }
});

// Smooth scroll behavior for future navigation
gsap.utils.toArray("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: target,
        ease: "power3.inOut"
      });
    }
  });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Advanced GSAP animations loaded successfully!');
});
const skillsTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".skills",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate title
        skillsTl.to(".skills-title", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Animate orbits
        skillsTl.to(".skills-orbit", {
            opacity: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.5");

        // Animate center skill
        skillsTl.to(".center-skill", {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.3");

        // Animate skill items
        skillsTl.to('.skill-item[data-orbit="1"]', {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.4");

        skillsTl.to('.skill-item[data-orbit="2"]', {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.3");

        skillsTl.to('.skill-item[data-orbit="3"]', {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.7)"
        }, "-=0.2");

        // Animate floating particles
        gsap.set(".particle", {
            x: () => Math.random() * window.innerWidth,
            y: () => Math.random() * window.innerHeight,
            opacity: 0
        });

        gsap.to(".particle", {
            opacity: 0.6,
            duration: 2,
            stagger: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: ".skills",
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none pause"
            }
        });

        // Continuous floating animation for particles
        gsap.to(".particle", {
            y: "-=50",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                each: 0.5,
                from: "random"
            }
        });

        // Hover animations for skill items
        document.querySelectorAll('.skill-item, .center-skill').forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    scale: 1.2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Add pulsing effect to center skill
        gsap.to(".center-skill", {
            boxShadow: "0 0 50px rgba(120, 190, 255, 0.8)",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });

        document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.log('GSAP not loaded, using fallback animations');
        return;
    }

    // Initialize GSAP master timeline
    const masterTimeline = gsap.timeline();
    
    // Get DOM elements with descriptive names
    const pageTitle = document.querySelector('.section-title');
    const verticalLine = document.querySelector('.timeline-line');
    const jobExperiences = document.querySelectorAll('.experience-item');
    
    // Set initial states
    gsap.set(pageTitle, { opacity: 0, y: 30 });
    gsap.set(verticalLine, { scaleY: 0, transformOrigin: 'top center' });
    gsap.set(jobExperiences, { opacity: 0, y: 50 });
    
    // Animate page title entrance
    masterTimeline.to(pageTitle, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Animate vertical timeline line growth
    masterTimeline.to(verticalLine, {
        scaleY: 1,
        duration: 1.5,
        ease: 'power2.out'
    }, '-=0.5');
    
    // Animate each job experience card
    jobExperiences.forEach((experienceContainer, itemIndex) => {
        const isLeftAligned = experienceContainer.classList.contains('left');
        const jobCard = experienceContainer.querySelector('.experience-card');
        const timelineDot = experienceContainer.querySelector('.timeline-dot');
        const techSkills = experienceContainer.querySelectorAll('.tech-tag');
        
        // Set initial positions for job cards
        gsap.set(jobCard, {
            x: isLeftAligned ? -50 : 50,
            opacity: 0
        });
        
        // Set initial state for timeline dots
        gsap.set(timelineDot, {
            scale: 0,
            opacity: 0
        });
        
        // Animate the entire experience item
        masterTimeline.to(experienceContainer, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, `-=${itemIndex === 0 ? 0.6 : 0.3}`);
        
        // Animate job cards
        masterTimeline.to(jobCard, {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.2)'
        }, '-=0.6');
        
        // Animate timeline dots
        masterTimeline.to(timelineDot, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.7)'
        }, '-=0.4');
    });
    
    // Add hover animations for job cards
    jobExperiences.forEach(experienceContainer => {
        const jobCard = experienceContainer.querySelector('.experience-card');
        const timelineDot = experienceContainer.querySelector('.timeline-dot');
        
        jobCard.addEventListener('mouseenter', () => {
            gsap.to(jobCard, {
                y: -8,
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(timelineDot, {
                scale: 1.5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        jobCard.addEventListener('mouseleave', () => {
            gsap.to(jobCard, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(timelineDot, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Animate technology skill tags on hover
    const skillTags = document.querySelectorAll('.tech-tag');
    skillTags.forEach(skillTag => {
        skillTag.addEventListener('mouseenter', () => {
            gsap.to(skillTag, {
                scale: 1.1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        skillTag.addEventListener('mouseleave', () => {
            gsap.to(skillTag, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
    
    // Simple parallax effect
    document.addEventListener('mousemove', (mouseEvent) => {
        const mouseXPosition = mouseEvent.clientX / window.innerWidth;
        
        gsap.to(verticalLine, {
            x: (mouseXPosition - 0.5) * 10,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    console.log('GSAP animations initialized successfully');
});


  document.addEventListener('DOMContentLoaded', function() {
            // Animate section header
            gsap.to('.section-header', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                delay: 0.3
            });

            // Animate project cards on scroll
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach((card, index) => {
                gsap.fromTo(card, 
                    {
                        opacity: 0,
                        y: 100,
                        scale: 0.9
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse'
                        },
                        delay: index * 0.1
                    }
                );

                // Parallax effect for project images
                const projectImage = card.querySelector('.project-image');
                gsap.to(projectImage, {
                    y: -30,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                });

                // Hover animations
                card.addEventListener('mouseenter', () => {
                    gsap.to(card.querySelector('.project-image'), {
                        scale: 1.05,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                    
                    gsap.to(card.querySelectorAll('.tech-tag'), {
                        y: -5,
                        duration: 0.3,
                        stagger: 0.05,
                        ease: 'power2.out'
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card.querySelector('.project-image'), {
                        scale: 1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                    
                    gsap.to(card.querySelectorAll('.tech-tag'), {
                        y: 0,
                        duration: 0.3,
                        stagger: 0.05,
                        ease: 'power2.out'
                    });
                });
            });

            // Animate floating elements
            const floatingDots = document.querySelectorAll('.floating-dot');
            floatingDots.forEach((dot, index) => {
                gsap.to(dot, {
                    y: 'random(-50, 50)',
                    x: 'random(-30, 30)',
                    duration: 'random(4, 8)',
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: index * 0.5
                });
            });

            // Stagger animation for tech tags
            ScrollTrigger.batch('.tech-tag', {
                onEnter: (elements) => {
                    gsap.from(elements, {
                        opacity: 0,
                        y: 20,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'power2.out'
                    });
                }
            });

            // Button hover effects
            const projectLinks = document.querySelectorAll('.project-link');
            projectLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    gsap.to(link, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                link.addEventListener('mouseleave', () => {
                    gsap.to(link, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });

            // Refresh ScrollTrigger on window resize
            window.addEventListener('resize', () => {
                ScrollTrigger.refresh();
            });
        });

        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';


        document.addEventListener('DOMContentLoaded', function() {
            
            // Animate contact header
            gsap.to('.contact-header', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.contact-header',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Animate contact info and form
            gsap.to('.contact-info', {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.contact-content',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });

            gsap.to('.contact-form', {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: 0.2,
                scrollTrigger: {
                    trigger: '.contact-content',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Animate info items with stagger
            const infoItems = document.querySelectorAll('.info-item');
            infoItems.forEach((item, index) => {
                const delay = parseFloat(item.getAttribute('data-delay')) || 0;
                
                gsap.to(item, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    delay: delay,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        toggleActions: 'play none none reverse'
                    }
                });

                // Add hover animation
                item.addEventListener('mouseenter', () => {
                    gsap.to(item.querySelector('.info-icon'), {
                        scale: 1.1,
                        rotation: 5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                item.addEventListener('mouseleave', () => {
                    gsap.to(item.querySelector('.info-icon'), {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });

            // Animate form elements
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach((group, index) => {
                gsap.fromTo(group, 
                    {
                        opacity: 0,
                        y: 30
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: '.contact-form-container',
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

            // Animate submit button
            gsap.fromTo('.submit-btn', 
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    delay: 0.5,
                    scrollTrigger: {
                        trigger: '.submit-btn',
                        start: 'top 90%',
                        end: 'bottom 10%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Animate footer content
            gsap.to('.footer-content', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.footer',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Animate social links
            const socialLinks = document.querySelectorAll('.social-link');
            socialLinks.forEach((link, index) => {
                const delay = parseFloat(link.getAttribute('data-delay')) || 0;
                
                gsap.to(link, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'back.out(1.7)',
                    delay: delay,
                    scrollTrigger: {
                        trigger: '.social-links',
                        start: 'top 90%',
                        end: 'bottom 10%',
                        toggleActions: 'play none none reverse'
                    }
                });

                // Add hover animation
                link.addEventListener('mouseenter', () => {
                    gsap.to(link, {
                        scale: 1.1,
                        rotation: 10,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                link.addEventListener('mouseleave', () => {
                    gsap.to(link, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });

            // Animate footer bottom
            gsap.to('.footer-bottom', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                delay: 0.3,
                scrollTrigger: {
                    trigger: '.footer-bottom',
                    start: 'top 90%',
                    end: 'bottom 10%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Animate background gradients
            const bgGradients = document.querySelectorAll('.bg-gradient');
            bgGradients.forEach((gradient, index) => {
                gsap.to(gradient, {
                    rotation: 360,
                    duration: 20,
                    repeat: -1,
                    ease: 'none',
                    delay: index * 2
                });

                gsap.to(gradient, {
                    scale: 1.2,
                    duration: 8,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: index * 1
                });
            });

            // Form submission animation
            const form = document.querySelector('form');
            const submitBtn = document.querySelector('.submit-btn');
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Button loading animation
                gsap.to(submitBtn, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        submitBtn.textContent = 'Message Sent! ✓';
                        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                        
                        setTimeout(() => {
                            submitBtn.textContent = 'Send Message';
                            submitBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                            form.reset();
                        }, 3000);
                    }
                });
            });

            // Parallax effect for form inputs
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    gsap.to(input, {
                        scale: 1.02,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                input.addEventListener('blur', () => {
                    gsap.to(input, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });

            // Refresh ScrollTrigger on window resize
            window.addEventListener('resize', () => {
                ScrollTrigger.refresh();
            });
        });

        (function(){
    // Slide In Panel
	var panelTriggers = document.getElementsByClassName('js-mix-panel-trigger');
	if( panelTriggers.length > 0 ) {
		for(var i = 0; i < panelTriggers.length; i++) {
			(function(i){
				var panelClass = 'js-mix-panel-'+panelTriggers[i].getAttribute('data-panel'),
					panel = document.getElementsByClassName(panelClass)[0];
				// open panel when clicking on trigger btn
				panelTriggers[i].addEventListener('click', function(event){
					event.preventDefault();
					addClass(panel, 'mix-panel--is-visible');
				});
				//close panel when clicking on 'x' or outside the panel
				panel.addEventListener('click', function(event){
					if( hasClass(event.target, 'js-mix-close') || hasClass(event.target, panelClass)) {
						event.preventDefault();
						removeClass(panel, 'mix-panel--is-visible');
					}
				});
			})(i);
		}
	}
	
	function hasClass(el, className) {
	  	if (el.classList) return el.classList.contains(className);
	  	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
	function addClass(el, className) {
	 	if (el.classList) el.classList.add(className);
	 	else if (!hasClass(el, className)) el.className += " " + className;
	}
	function removeClass(el, className) {
	  	if (el.classList) el.classList.remove(className);
	  	else if (hasClass(el, className)) {
	    	var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
	    	el.className=el.className.replace(reg, ' ');
	  	}
	}
})();