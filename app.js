/* ==========================================================================
   PREMIUM MOTION SYSTEM (GSAP + ScrollTrigger)
   --------------------------------------------------------------------------
   Tuning: edit the MOTION config below (durations, eases, offsets, staggers).
   Reduced motion: handled in `reduceMotion` below - content is shown
   immediately, no tweens are created, counters show final values.
   Without JS/GSAP: HTML/CSS render all content statically.
   Targets use [data-motion] attributes so selectors stay decoupled from styling.
   ========================================================================== */
(function () {
    "use strict";

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        return; // CDN blocked: static, fully readable page
    }

    gsap.registerPlugin(ScrollTrigger);

    // ---------- CONFIG (tune here) ----------
    const MOTION = {
        ease: { soft: "power3.out", strong: "power4.out" },
        intro: { duration: 0.9, stagger: 0.12, y: 40 },
        reveal: { duration: 0.9, stagger: 0.15, y: 50, start: "top 80%" },
        counter: { duration: 2.2, start: "top 80%" },
        routes: { duration: 1.6, stagger: 0.25, start: "top 70%" },
        tilt: { max: 4 }
    };

    // ---------- ACCESSIBILITY / DEVICE ----------
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;

    const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
    const fmt = (n) => Math.floor(n).toLocaleString("es-CL");
    // Lighter motion on small screens
    const dist = (v) => (isMobile ? v * 0.5 : v);

    if (reduceMotion) {
        return; // static page: content already visible, counters show final values
    }

    document.documentElement.classList.add("motion-ready");

    // ---------- 1) INTRO TIMELINE (~1.8s) ----------
    function intro() {
        const items = $$('[data-motion="hero-item"]');
        const tl = gsap.timeline({ defaults: { ease: MOTION.ease.soft } });

        tl.from('[data-motion="hero-bg"]', {
            scale: 1.12, duration: 2, ease: "power2.out"
        }, 0);

        tl.from(items, {
            autoAlpha: 0,
            y: dist(MOTION.intro.y),
            duration: MOTION.intro.duration,
            stagger: MOTION.intro.stagger
        }, 0.15);

        return tl;
    }

    // ---------- 2) SCROLL REVEALS ----------
    function reveals() {
        // Stats
        gsap.from($$('[data-motion="stat"]'), {
            autoAlpha: 0, y: dist(MOTION.reveal.y),
            duration: MOTION.reveal.duration, stagger: MOTION.reveal.stagger,
            ease: MOTION.ease.soft,
            scrollTrigger: { trigger: ".stats", start: MOTION.reveal.start, once: true }
        });

        // Story text
        $$(".story > *").length && gsap.from(".story > *", {
            autoAlpha: 0, y: dist(40), duration: MOTION.reveal.duration,
            stagger: MOTION.reveal.stagger, ease: MOTION.ease.soft,
            scrollTrigger: { trigger: ".story", start: MOTION.reveal.start, once: true }
        });

        // Benchmark cards
        gsap.from($$('[data-motion="card"]'), {
            autoAlpha: 0, y: dist(MOTION.reveal.y), scale: 0.96,
            duration: MOTION.reveal.duration, stagger: MOTION.reveal.stagger,
            ease: MOTION.ease.soft, clearProps: "transform",
            scrollTrigger: { trigger: ".cards", start: MOTION.reveal.start, once: true }
        });

        // Phone split reveal (title + visual)
        const phoneTl = gsap.timeline({
            defaults: { ease: MOTION.ease.strong },
            scrollTrigger: { trigger: ".phone-section", start: "top 70%", once: true }
        });
        phoneTl.from(".phone-section h2", { autoAlpha: 0, y: dist(40), duration: 0.9 })
               .from("#phone", { autoAlpha: 0, y: dist(60), scale: 0.95, duration: 1.1 }, 0.15);

        // Closing CTA
        gsap.from(".closing h1", {
            autoAlpha: 0, y: dist(50), duration: 1.1, stagger: 0.25,
            ease: MOTION.ease.strong,
            scrollTrigger: { trigger: ".closing", start: "top 65%", once: true }
        });
    }

    // ---------- COUNTERS ----------
    function counters() {
        $$(".counter").forEach((el) => {
            const end = parseInt(el.dataset.value, 10);
            if (isNaN(end)) return;
            const state = { n: 0 };
            el.textContent = fmt(0);
            gsap.to(state, {
                n: end, duration: MOTION.counter.duration, ease: "power2.out",
                onUpdate: () => { el.textContent = fmt(state.n); },
                onComplete: () => { el.textContent = fmt(end); },
                scrollTrigger: { trigger: el, start: MOTION.counter.start, once: true }
            });
        });
    }

    // ---------- ROUTES ----------
    function routes() {
        gsap.to(".route", {
            strokeDashoffset: 0,
            duration: MOTION.routes.duration, stagger: MOTION.routes.stagger,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".world", start: MOTION.routes.start, once: true }
        });
    }

    // ---------- 3) MICROINTERACTIONS (desktop only, transforms only) ----------
    function micro() {
        if (isTouch || isMobile) return;

        $$('[data-motion="card"]').forEach((card) => {
            const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
            const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
            card.addEventListener("pointermove", (e) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                ry(px * MOTION.tilt.max);
                rx(-py * MOTION.tilt.max);
            });
            card.addEventListener("pointerleave", () => { rx(0); ry(0); });
            gsap.set(card, { transformPerspective: 800 });
        });

        const phone = document.querySelector("#phone");
        if (phone) {
            phone.addEventListener("pointerenter", () => gsap.to(phone, { y: -8, duration: 0.5, ease: MOTION.ease.soft }));
            phone.addEventListener("pointerleave", () => gsap.to(phone, { y: 0, duration: 0.5, ease: MOTION.ease.soft }));
        }
    }

    intro();
    reveals();
    counters();
    routes();
    micro();
})();
