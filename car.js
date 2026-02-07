document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Sticky Navbar Transformation
    // ==========================================
    // We use the class name from the NEW HTML structure: .navbar
    const navbar = document.querySelector('.navbar');

    // SAFETY CHECK: Only run this code if the navbar actually exists
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    } else {
        console.warn("Sticky Navbar Warning: No element with class '.navbar' found. The sticky header feature won't work.");
    }


    // ==========================================
    // 2. Car Filtering System
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carItems = document.querySelectorAll('.car-item');

    // SAFETY CHECK: Only run if filter buttons exist
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // a. Remove 'active' class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // b. Add 'active' class to clicked button
                button.classList.add('active');

                // c. Get the filter value clicked
                const filterValue = button.getAttribute('data-filter');

                // d. Loop through all cars and show/hide based on filter
                carItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');

                    // SAFETY CHECK: Ensure the car item has a category data attribute
                    if (itemCategory) {
                        if (filterValue === 'all' || filterValue === itemCategory) {
                            item.style.display = 'block';
                            // Re-trigger animation for filtered items
                            // We use a slight delay to allow the display:block to take effect first
                            setTimeout(() => item.classList.add('appear'), 50);
                        } else {
                            item.style.display = 'none';
                            item.classList.remove('appear');
                        }
                    }
                });
            });
        });
    }


    // ==========================================
    // 3. Scroll Animations (Intersection Observer)
    // ==========================================
    // This makes elements fade in as they enter the screen

    const fadeElements = document.querySelectorAll('.fade-in');

    // SAFETY CHECK: Only proceed if IntersectionObserver is supported by the browser
    // and if there are actually elements to animate.
    if ('IntersectionObserver' in window && fadeElements.length > 0) {

        const appearOptions = {
            threshold: 0.2, // Element must be 20% visible to trigger
            rootMargin: "0px 0px -50px 0px" // Trigger slightly before it enters fully
        };

        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('appear');
                    // Stop watching once it has appeared so it doesn't re-animate
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, appearOptions);

        fadeElements.forEach(element => {
            appearOnScroll.observe(element);
        });

    } else if (fadeElements.length > 0) {
        // Fallback for older browsers that don't support IntersectionObserver:
        // Just show all elements immediately so they aren't invisible.
        fadeElements.forEach(element => {
             element.classList.add('appear');
             element.style.opacity = 1;
             element.style.transform = 'translateY(0)';
        });
    }
});