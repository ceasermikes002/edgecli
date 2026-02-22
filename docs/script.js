/**
 * EdgeCLI Documentation - Interactive Features
 * Staff Engineer Level Implementation
 */

(function() {
    'use strict';

    // ============================================
    // Smooth Scroll with Offset
    // ============================================
    
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offset = 20; // Offset from top
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active state
                    updateActiveNavLink(this);
                }
            });
        });
    }

    // ============================================
    // Active Navigation Highlighting
    // ============================================
    
    function updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.style.backgroundColor = '';
            link.style.color = '';
        });
        
        if (activeLink) {
            activeLink.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
            activeLink.style.color = 'white';
        }
    }

    // ============================================
    // Scroll Spy - Highlight Current Section
    // ============================================
    
    function initScrollSpy() {
        const sections = document.querySelectorAll('.section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        function highlightNavOnScroll() {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.style.backgroundColor = '';
                        link.style.color = '';
                        
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                            link.style.color = 'white';
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', highlightNavOnScroll);
        highlightNavOnScroll(); // Initial call
    }

    // ============================================
    // Copy Code Button
    // ============================================
    
    function initCopyCodeButtons() {
        const codeBlocks = document.querySelectorAll('.code-block');
        
        codeBlocks.forEach(block => {
            const button = document.createElement('button');
            button.className = 'copy-button';
            button.textContent = 'Copy';
            button.setAttribute('aria-label', 'Copy code to clipboard');
            
            button.addEventListener('click', async function() {
                const code = block.querySelector('code').textContent;
                
                try {
                    await navigator.clipboard.writeText(code);
                    button.textContent = 'Copied!';
                    button.style.backgroundColor = '#10b981';
                    
                    setTimeout(() => {
                        button.textContent = 'Copy';
                        button.style.backgroundColor = '';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                    button.textContent = 'Failed';
                    
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                }
            });
            
            block.style.position = 'relative';
            block.appendChild(button);
        });
    }

    // ============================================
    // Back to Top Button
    // ============================================
    
    function initBackToTop() {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.innerHTML = '↑';
        button.setAttribute('aria-label', 'Back to top');
        button.style.display = 'none';
        
        document.body.appendChild(button);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                button.style.display = 'flex';
            } else {
                button.style.display = 'none';
            }
        });
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // Search Functionality (Basic)
    // ============================================
    
    function initSearch() {
        // This is a placeholder for future search implementation
        // Could integrate with Algolia, Lunr.js, or custom solution
        console.log('Search functionality ready for implementation');
    }

    // ============================================
    // Keyboard Navigation
    // ============================================
    
    function initKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search (future feature)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                console.log('Search shortcut triggered');
            }
        });
    }

    // ============================================
    // Initialize All Features
    // ============================================
    
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        initSmoothScroll();
        initScrollSpy();
        initCopyCodeButtons();
        initBackToTop();
        initSearch();
        initKeyboardNav();
        
        console.log('EdgeCLI Documentation initialized');
    }

    // Start initialization
    init();

})();
