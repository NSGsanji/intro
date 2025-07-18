// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Sticky header
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(255, 205, 255, 0.98)';
    header.style.borderBottom = '1px solid #ccc';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.borderBottom = '1px solid #e0e0e0';
  }
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-item').forEach(el => {
  observer.observe(el);
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert("Thank you for your message! I'll get back to you soon.");
  e.target.reset();
});


// Parallax scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});
// Social Links JavaScript - Enhanced Interactions

document.addEventListener('DOMContentLoaded', function() {
    initializeSocialLinks();
});

function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Add enhanced hover effects
    socialLinks.forEach(link => {
        // Mouse enter effect
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            addRippleEffect(this);
        });
        
        // Mouse leave effect
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click effect
        link.addEventListener('click', function(e) {
            addClickEffect(this);
            trackSocialClick(this.dataset.platform);
        });
        
        // Keyboard navigation
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Intersection Observer for animation on scroll
    observeSocialLinks();
}

// Add ripple effect on hover
function addRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 0, 0, 0.1)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '100%';
    ripple.style.height = '100%';
    ripple.style.marginLeft = '-50%';
    ripple.style.marginTop = '-50%';
    ripple.style.pointerEvents = 'none';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add click effect
function addClickEffect(element) {
    element.style.transform = 'translateY(-3px) scale(0.95)';
    
    setTimeout(() => {
        element.style.transform = 'translateY(-5px) scale(1.05)';
    }, 150);
}

// Track social media clicks (for analytics)
function trackSocialClick(platform) {
    console.log(`Social link clicked: ${platform}`);
    
    // You can add analytics tracking here
    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            'platform': platform,
            'event_category': 'engagement'
        });
    }
    
    // Example: Custom analytics
    if (typeof analytics !== 'undefined') {
        analytics.track('Social Link Clicked', {
            platform: platform,
            timestamp: new Date().toISOString()
        });
    }
}

// Animate social links on scroll into view
function observeSocialLinks() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const socialLinks = entry.target.querySelectorAll('.social-link');
                socialLinks.forEach((link, index) => {
                    setTimeout(() => {
                        link.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.3
    });
    
    const socialContainer = document.querySelector('.social-links');
    if (socialContainer) {
        observer.observe(socialContainer);
    }
}

// Copy social link to clipboard (useful feature)
function copySocialLink(platform) {
    const link = document.querySelector(`[data-platform="${platform}"]`);
    if (link) {
        navigator.clipboard.writeText(link.href).then(() => {
            showTooltip(link, 'Link copied!');
        });
    }
}

// Show temporary tooltip
function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.style.position = 'absolute';
    tooltip.style.bottom = '-40px';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.background = '#0000';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.zIndex = '1000';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.3s ease';
    
    element.appendChild(tooltip);
    
    // Trigger animation
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    // Remove after 2 seconds
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }, 2000);
}

// Utility function to update social links dynamically
function updateSocialLinks(newLinks) {
    const socialContainer = document.querySelector('.social-links');
    if (!socialContainer) return;
    
    // Clear existing links
    socialContainer.innerHTML = '';
    
    // Add new links
    newLinks.forEach(linkData => {
        const linkElement = createSocialLink(linkData);
        socialContainer.appendChild(linkElement);
    });
    
    // Reinitialize functionality
    initializeSocialLinks();
}

// Create a social link element
function createSocialLink(linkData) {
    const link = document.createElement('a');
    link.href = linkData.url;
    link.className = 'social-link';
    link.target = '_blank';
    link.setAttribute('data-platform', linkData.platform);
    link.innerHTML = linkData.svgIcon;
    
    return link;
}

// CSS for ripple animation (add to your CSS file)
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards !important;
    }
`;

// Inject CSS if not already present
if (!document.querySelector('#social-ripple-css')) {
    const style = document.createElement('style');
    style.id = 'social-ripple-css';
    style.textContent = rippleCSS;
    document.head.appendChild(style);
}

// Export functions for external use
window.SocialLinks = {
    updateLinks: updateSocialLinks,
    copyLink: copySocialLink,
    trackClick: trackSocialClick
};
