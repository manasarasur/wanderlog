/**
 * Wanderlog Travel Blog - Client Interaction & WP Plugin Simulators
 */

document.addEventListener("DOMContentLoaded", () => {
    initResponsiveMenu();
    initScrollEffects();
    initLazyLoading();
    initWordPressSimulations();
    initContactForm();
    initDestinationsMap();
    initGalleryLightbox();
    initSearchBarRedirect();
});

/* --- Responsive Menu Navigation --- */
function initResponsiveMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNavigation = document.querySelector(".main-navigation");
    
    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener("click", () => {
            mainNavigation.classList.toggle("is-active");
            const expanded = menuToggle.getAttribute("aria-expanded") === "true" || false;
            menuToggle.setAttribute("aria-expanded", !expanded);
            menuToggle.innerHTML = mainNavigation.classList.contains("is-active") ? "✕" : "☰";
        });
    }
    
    // Header shadow on scroll
    const header = document.querySelector(".site-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

/* --- Scroll Fade-in System --- */
function initScrollEffects() {
    const fadeElements = document.querySelectorAll(".fade-in");
    
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target); // Animates once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });
        
        fadeElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        fadeElements.forEach(el => el.classList.add("is-visible"));
    }
}

/* --- Lazy Loading Simulation --- */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll(".lazy-image");
    
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Simulate loading delay
                    setTimeout(() => {
                        img.classList.add("loaded");
                    }, 200);
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        lazyImages.forEach(img => img.classList.add("loaded"));
    }
}

/* --- Interactive WordPress Admin Bar & Plugin Simulation Drawers --- */
function initWordPressSimulations() {
    // Inject the Admin Bar & Drawers if present, or bind to existing (since we will write it directly in HTML templates)
    const btnCustomizer = document.getElementById("wp-admin-customizer-btn");
    const btnYoast = document.getElementById("wp-admin-yoast-btn");
    const btnGutenberg = document.getElementById("wp-admin-gutenberg-btn");
    const btnCache = document.getElementById("wp-admin-cache-btn");
    const btnSmush = document.getElementById("wp-admin-smush-btn");
    
    const customizerDrawer = document.getElementById("drawer-customizer");
    const yoastDrawer = document.getElementById("drawer-yoast");
    const overlay = document.querySelector(".drawer-overlay");
    
    const closeBtns = document.querySelectorAll(".drawer-close");
    
    // Drawers toggling
    if (btnCustomizer && customizerDrawer) {
        btnCustomizer.addEventListener("click", () => {
            closeAllDrawers();
            customizerDrawer.classList.add("show");
            overlay.classList.add("show");
        });
    }
    
    if (btnYoast && yoastDrawer) {
        btnYoast.addEventListener("click", () => {
            closeAllDrawers();
            yoastDrawer.classList.add("show");
            overlay.classList.add("show");
        });
    }
    
    if (overlay) {
        overlay.addEventListener("click", closeAllDrawers);
    }
    
    closeBtns.forEach(btn => {
        btn.addEventListener("click", closeAllDrawers);
    });
    
    function closeAllDrawers() {
        if (customizerDrawer) customizerDrawer.classList.remove("show");
        if (yoastDrawer) yoastDrawer.classList.remove("show");
        if (overlay) overlay.classList.remove("show");
    }
    
    // Astra Theme Customizer Sidebar aligned settings
    const layoutPresets = document.querySelectorAll(".layout-preset");
    layoutPresets.forEach(preset => {
        preset.addEventListener("click", () => {
            layoutPresets.forEach(p => p.classList.remove("active"));
            preset.classList.add("active");
            
            const layout = preset.getAttribute("data-layout");
            document.body.classList.remove("layout-right-sidebar", "layout-left-sidebar", "layout-no-sidebar");
            document.body.classList.add(`layout-${layout}`);
            
            showToastNotice(`Astra Theme Layout changed to: <strong>${layout.replace('-', ' ')}</strong>`);
        });
    });
    
    // Astra Theme Customizer Color presets
    const colorBtns = document.querySelectorAll(".color-option-btn");
    colorBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            colorBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const palette = btn.getAttribute("data-palette");
            document.body.classList.remove("palette-terracotta", "palette-olive", "palette-mustard");
            document.body.classList.add(`palette-${palette}`);
            
            showToastNotice(`Astra Colors updated to: <strong>${palette.toUpperCase()}</strong>`);
        });
    });
    
    // Gutenberg Block Outline Toggle
    if (btnGutenberg) {
        btnGutenberg.addEventListener("click", () => {
            const active = document.body.classList.toggle("editor-show-blocks");
            btnGutenberg.classList.toggle("active", active);
            
            if (active) {
                showToastNotice("Gutenberg Blocks highlighted. Hover sections to view Block types!");
                btnGutenberg.querySelector("span.ab-text").textContent = "Gutenberg: ON";
            } else {
                showToastNotice("Block highlights disabled.");
                btnGutenberg.querySelector("span.ab-text").textContent = "Gutenberg Mode";
            }
        });
    }
    
    // WP Fastest Cache Clear Simulator
    if (btnCache) {
        btnCache.addEventListener("click", () => {
            const icon = btnCache.querySelector(".ab-icon");
            const text = btnCache.querySelector(".ab-text");
            
            // Set Loading spinner state
            icon.innerHTML = "↻";
            icon.classList.add("spinner-rotate");
            text.textContent = "Purging Cache...";
            btnCache.style.pointerEvents = "none";
            
            setTimeout(() => {
                icon.innerHTML = "⚡";
                icon.classList.remove("spinner-rotate");
                text.textContent = "Clear Cache";
                btnCache.style.pointerEvents = "auto";
                
                showToastNotice("WP Fastest Cache: Purged! Page speed verified at <strong>0.08s (100% Cache Hit)</strong>.");
            }, 1200);
        });
    }
    
    // Smush Image Stats
    if (btnSmush) {
        btnSmush.addEventListener("click", () => {
            showToastNotice("Smush: all images optimized! <strong>1.46MB (46.8% saving)</strong> saved via lazy load & lossy compression.");
        });
    }
}

/* --- WordPress Toast Notices helper --- */
function showToastNotice(message) {
    // Remove existing notice if any
    const existing = document.querySelector(".wp-toast-notice");
    if (existing) {
        existing.remove();
    }
    
    // Build new notice
    const toast = document.createElement("div");
    toast.className = "wp-toast-notice";
    toast.innerHTML = `<span style="font-size: 1.1rem;">🔔</span> <span>${message}</span>`;
    document.body.appendChild(toast);
    
    // Trigger animation frame
    setTimeout(() => {
        toast.classList.add("show");
    }, 50);
    
    // Remove notice after 4 seconds
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

/* --- Contact Form 7 Response Simulation --- */
function initContactForm() {
    const form = document.getElementById("wpcf7-contact-form");
    const responseBox = document.getElementById("wpcf7-response-box");
    
    if (form && responseBox) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Basic fields validation
            const nameEl = form.querySelector('input[name="your-name"]');
            const emailEl = form.querySelector('input[name="your-email"]');
            const messageEl = form.querySelector('textarea[name="your-message"]');
            
            // Hide previous validation rules
            responseBox.style.display = "none";
            responseBox.className = "wpcf7-response-output";
            
            if (!nameEl.value || !emailEl.value || !messageEl.value) {
                responseBox.classList.add("wpcf7-validation-errors");
                responseBox.textContent = "One or more fields have an error. Please check and try again.";
                responseBox.style.display = "block";
                showToastNotice("Contact Form 7: Submission errors found.");
                return;
            }
            
            const submitBtn = form.querySelector(".wpcf7-submit");
            const origValue = submitBtn.value;
            submitBtn.value = "Sending...";
            submitBtn.disabled = true;
            
            // Simulate AJAX request
            setTimeout(() => {
                submitBtn.value = origValue;
                submitBtn.disabled = false;
                
                responseBox.classList.add("wpcf7-mail-sent-ok");
                responseBox.textContent = "Thank you for your message. It has been successfully sent!";
                responseBox.style.display = "block";
                
                // Clear input fields
                nameEl.value = "";
                emailEl.value = "";
                messageEl.value = "";
                
                showToastNotice("Contact Form 7: Message sent successfully.");
            }, 1500);
        });
    }
}

/* --- Destinations page interactive map pins & region tabs --- */
function initDestinationsMap() {
    const pins = document.querySelectorAll(".map-pin");
    const searchInput = document.getElementById("destination-search");
    const cards = document.querySelectorAll(".destination-card");
    const tabButtons = document.querySelectorAll(".filter-tab-btn");
    
    pins.forEach(pin => {
        pin.addEventListener("click", () => {
            const loc = pin.getAttribute("data-country");
            showToastNotice(`Navigating to reviews for: <strong>${loc}</strong>`);
            
            // Focus cards and filter if exists
            if (searchInput) {
                searchInput.value = loc;
                searchInput.dispatchEvent(new Event('input'));
            }
            
            // Scroll to destinations content area
            const listEl = document.getElementById("destinations-list-section");
            if (listEl) {
                listEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Live Search Filter for Destinations
    if (searchInput && cards.length > 0) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            // De-activate region tabs if typing
            tabButtons.forEach(btn => btn.classList.remove("active"));
            
            cards.forEach(card => {
                const title = card.querySelector(".destination-name").textContent.toLowerCase();
                const description = card.querySelector(".destination-desc").textContent.toLowerCase();
                const isMatch = title.includes(query) || description.includes(query);
                card.style.display = isMatch ? "flex" : "none";
            });
        });
    }

    // Region Tabs Filter
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const region = btn.getAttribute("data-region").toLowerCase().trim();
            if (searchInput) searchInput.value = ""; // Clear text search
            
            cards.forEach(card => {
                const cardRegion = card.getAttribute("data-region").toLowerCase().trim();
                if (region === "all" || cardRegion === region) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
            showToastNotice(`Filtered destinations by: <strong>${region.toUpperCase()}</strong>`);
        });
    });
}

/* --- Gallery Envira Lightbox Simulator --- */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    
    // Build and inject lightbox markup dynamically if it doesn't exist
    let lightbox = document.getElementById("gallery-lightbox");
    if (!lightbox && galleryItems.length > 0) {
        lightbox = document.createElement("div");
        lightbox.id = "gallery-lightbox";
        lightbox.className = "wp-lightbox-overlay";
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img class="lightbox-img" src="" alt="Lightbox image">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        const closeBtn = lightbox.querySelector(".lightbox-close");
        closeBtn.addEventListener("click", () => {
            lightbox.classList.remove("show");
            document.body.style.overflow = "auto";
        });
        
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("show");
                document.body.style.overflow = "auto";
            }
        });
    }
    
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const img = item.querySelector("img");
            const captionText = item.querySelector(".gallery-caption") ? item.querySelector(".gallery-caption").textContent : img.alt;
            
            const lightboxImg = lightbox.querySelector(".lightbox-img");
            const lightboxCap = lightbox.querySelector(".lightbox-caption");
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCap.textContent = captionText;
            
            lightbox.classList.add("show");
            document.body.style.overflow = "hidden"; // Prevent background scrolling
            
            showToastNotice(`Envira Gallery: Opened image <strong>${captionText}</strong> in Lightbox.`);
        });
    });
}

/* --- Search Bar Redirect & Filter Logic --- */
function initSearchBarRedirect() {
    const searchForm = document.getElementById("home-search-form");
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = searchForm.querySelector("input[name='s']");
            if (input && input.value.trim()) {
                window.location.href = `blog.html?s=${encodeURIComponent(input.value.trim())}`;
            }
        });
    }

    // Process search queries on blog page
    if (window.location.pathname.includes("blog.html")) {
        const params = new URLSearchParams(window.location.search);
        const searchVal = params.get("s");
        
        if (searchVal) {
            const sidebarSearchInput = document.getElementById("sidebar-search-input");
            if (sidebarSearchInput) {
                sidebarSearchInput.value = searchVal;
                // Wait small delay for other loads then trigger search filter
                setTimeout(() => {
                    filterBlogPosts(searchVal);
                }, 100);
            }
        }

        // Setup sidebar search input listener
        const sidebarSearchInput = document.getElementById("sidebar-search-input");
        if (sidebarSearchInput) {
            sidebarSearchInput.addEventListener("input", (e) => {
                filterBlogPosts(e.target.value);
            });
        }
    }
}

function filterBlogPosts(query) {
    const cleanQuery = query.toLowerCase().trim();
    const posts = document.querySelectorAll(".post-card");
    let matchCount = 0;
    
    posts.forEach(post => {
        const title = post.querySelector(".post-card-title").textContent.toLowerCase();
        const excerpt = post.querySelector(".post-excerpt").textContent.toLowerCase();
        const category = post.querySelector(".post-category-tag").textContent.toLowerCase();
        
        const isMatch = title.includes(cleanQuery) || excerpt.includes(cleanQuery) || category.includes(cleanQuery);
        post.style.display = isMatch ? "flex" : "none";
        if (isMatch) matchCount++;
    });
    
    showToastNotice(`Filtered Journal entries for: <strong>"${query}"</strong>. Found ${matchCount} matches.`);
}
