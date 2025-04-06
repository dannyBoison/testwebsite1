document.addEventListener("DOMContentLoaded", function () {
    // ✅ Hamburger menu toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
        }
    });

    // ✅ Navbar scroll behavior
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ✅ Slideshow
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        const slides = document.querySelectorAll(".custom-card-slide");
        slides.forEach((slide) => (slide.style.display = "none"));

        slideIndex++;
        if (slideIndex > slides.length) slideIndex = 1;

        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 4000);
    }

    // ✅ Counter animation on scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    observer.observe(document.querySelector('#custom-about-us'));

    // ✅ Counter values
    function runCounters() {
        animateCounter("decade-counter", 0, 5, 1500, ["day", "week", "year", "decade"]);
        animateCounter("landmark-counter", 0, 250, 2000);
        animateCounter("area-counter", 0, 4.1, 1800, [], true); // true = isFloat
        animateCounter("clients-counter", 0, 35000, 3000);
        animateCounter("mncs-counter", 0, 150, 2000);
    }

    function animateCounter(id, start, end, duration, labelSteps = [], isFloat = false) {
        const el = document.getElementById(id);
        const unitEl = el.nextElementSibling;
        let current = start;

        const steps = Math.ceil(end - start);
        const stepTime = Math.max(1, Math.floor(duration / steps));

        let timer = setInterval(() => {
            current += isFloat ? 0.1 : 1;

            if (isFloat) {
                current = parseFloat(current.toFixed(1));
            }

            el.textContent = isFloat ? current.toFixed(1) : current;

            if (labelSteps.length && current <= labelSteps.length) {
                unitEl.textContent = `+ ${labelSteps[Math.floor(current) - 1]}`;
            }

            if (current >= end) {
                clearInterval(timer);

                if (labelSteps.length) {
                    unitEl.textContent = "+ decades";
                }
                if (id === "area-counter") {
                    el.textContent = end.toFixed(1);
                    unitEl.textContent = "+ million sq. meters";
                }
                if (id === "landmark-counter") {
                    unitEl.textContent = "+ landmarks";
                }
                if (id === "clients-counter") {
                    unitEl.textContent = "+ satisfied customers";
                }
                if (id === "mncs-counter") {
                    unitEl.textContent = "+ MNCs";
                }
            }
        }, stepTime);
    }

    // ✅ Unique Projects Carousel
    let uniqueSlideIndex = 0;
    const uniqueSlides = document.querySelectorAll(".carousel-slide");
    const carousel = document.querySelector(".unique-carousel");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    function moveUniqueSlide(n) {
        uniqueSlideIndex += n;

        if (uniqueSlideIndex >= uniqueSlides.length) uniqueSlideIndex = 0;
        if (uniqueSlideIndex < 0) uniqueSlideIndex = uniqueSlides.length - 1;

        showUniqueSlides();
    }

    function showUniqueSlides() {
        const slideWidth = uniqueSlides[0].offsetWidth;
        carousel.style.transition = "transform 0.5s ease-in-out";
        carousel.style.transform = `translateX(-${uniqueSlideIndex * slideWidth}px)`;
    }

    showUniqueSlides();

    setInterval(function () {
        moveUniqueSlide(1);
    }, 4000);

    prevButton.addEventListener("click", function () {
        moveUniqueSlide(-1);
    });

    nextButton.addEventListener("click", function () {
        moveUniqueSlide(1);
    });

    // ✅ Typewriter effect
    const heading = document.getElementById("typewriter-heading");
    const text = "We Design Your World With Our Hearts";
    let index = 0;
    let deleting = false;

    function typeWriterLoop() {
        if (!deleting && index <= text.length) {
            heading.textContent = text.substring(0, index++);
        } else if (deleting && index >= 0) {
            heading.textContent = text.substring(0, index--);
        }

        if (index === text.length) {
            deleting = true;
            setTimeout(typeWriterLoop, 1500);
        } else if (index === 0 && deleting) {
            deleting = false;
            setTimeout(typeWriterLoop, 800);
        } else {
            setTimeout(typeWriterLoop, deleting ? 50 : 100);
        }
    }

    typeWriterLoop();

    // ✅ Awards reveal on scroll
    const awards = document.querySelectorAll('.award-item');

    function revealAwards() {
        const scrollPosition = window.scrollY + window.innerHeight;

        awards.forEach(award => {
            if (award.offsetTop < scrollPosition) {
                award.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealAwards);
    revealAwards();

    // ✅ Testimonials Slide
    let currentTestimonial = 0;
    const slides = document.querySelectorAll(".testimonial-slide");

    function showNextTestimonial() {
        slides[currentTestimonial].classList.remove("active");
        currentTestimonial = (currentTestimonial + 1) % slides.length;
        slides[currentTestimonial].classList.add("active");
    }

    setInterval(showNextTestimonial, 5000);

    // ✅ Read More Toggle with Fade In
   

    const readMoreBtn = document.querySelector('.read-more-btn');
    const moreContent = document.getElementById('more-legacy-content');

    readMoreBtn.addEventListener('click', function () {
        moreContent.classList.toggle('show');
        if (moreContent.classList.contains('show')) {
            moreContent.style.display = 'block';
            setTimeout(() => {
                moreContent.style.opacity = 1;
            }, 10);
            readMoreBtn.textContent = 'Read Less';
        } else {
            moreContent.style.opacity = 0;
            setTimeout(() => {
                moreContent.style.display = 'none';
            }, 300);
            readMoreBtn.textContent = 'Read More';
        }
    });
});
