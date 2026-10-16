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
        tilt: { max: 4 },
        // Auto slides: show = seconds each slide stays visible, duration = transition,
        // resume = seconds of inactivity after manual interaction before auto-play restarts,
        // swipe = horizontal px threshold for touch/pointer swipe
        slides: { show: 3.8, duration: 1.1, ease: "power3.inOut", resume: 4, swipe: 50, stagger: 0.08 }
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

        // Benchmark slides (wrapper reveals; individual slides are driven by slides())
        gsap.from(".cards", {
            autoAlpha: 0, y: dist(MOTION.reveal.y),
            duration: MOTION.reveal.duration,
            ease: MOTION.ease.soft, clearProps: "transform,opacity,visibility",
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

    // ---------- 4) AUTO SLIDES (After Effects style crossfade + zoom) ----------
    // Slides = [data-slide] children of a [data-slides] container.
    // Only transform/opacity are animated. Without JS the slides render as a plain grid.
    function slides() {
        const root = document.querySelector("[data-slides]");
        if (!root) return;
        const items = $$("[data-slide]", root);
        if (items.length < 2) return;

        const C = MOTION.slides;
        let index = 0;
        let timer = null;       // auto-advance delayed call
        let resumeTimer = null; // restart after manual interaction
        let tween = null;
        let hovering = false;
        let inView = true;

        root.classList.add("slides-ready");
        root.setAttribute("tabindex", "0");
        root.setAttribute("role", "region");
        root.setAttribute("aria-roledescription", "carousel");
        root.setAttribute("aria-label", root.dataset.label || "Slides");

        // Dots indicator
        const dotsWrap = document.createElement("div");
        dotsWrap.className = "slide-dots";
        dotsWrap.setAttribute("role", "group");
        dotsWrap.setAttribute("aria-label", "Seleccionar slide");
        const dots = items.map((_, i) => {
            const b = document.createElement("button");
            b.type = "button";
            b.className = "slide-dot";
            b.setAttribute("aria-label", "Ir al slide " + (i + 1) + " de " + items.length);
            b.addEventListener("click", () => { go(i); manual(); });
            dotsWrap.appendChild(b);
            return b;
        });
        root.insertAdjacentElement("afterend", dotsWrap);

        const inner = (el) => $$("h3, p, img", el);

        function paintDots() {
            dots.forEach((d, i) => {
                const on = i === index;
                d.classList.toggle("is-active", on);
                d.setAttribute("aria-current", on ? "true" : "false");
            });
            items.forEach((el, i) => el.setAttribute("aria-hidden", i === index ? "false" : "true"));
        }

        // Initial state: only the first slide visible
        gsap.set(items, { autoAlpha: 0, scale: 1.04 });
        gsap.set(items[0], { autoAlpha: 1, scale: 1 });
        paintDots();

        function go(next) {
            next = (next + items.length) % items.length;
            if (next === index) return;
            const out = items[index];
            const inc = items[next];
            index = next;
            paintDots();

            if (tween) tween.progress(1); // finish previous transition cleanly
            gsap.set(inc, { zIndex: 2 });
            gsap.set(out, { zIndex: 1 });

            tween = gsap.timeline({ defaults: { ease: C.ease, duration: C.duration } })
                .to(out, { autoAlpha: 0, scale: 1.06 }, 0)
                .fromTo(inc, { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1 }, 0)
                // Layered AE-like feel: inner elements follow with a stagger
                .fromTo(inner(inc), { y: dist(24), autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, stagger: C.stagger }, 0.15);
        }

        function stop() { if (timer) { timer.kill(); timer = null; } }
        function play() {
            stop();
            if (hovering || !inView || document.hidden) return;
            timer = gsap.delayedCall(C.show, () => { go(index + 1); play(); });
        }
        // Manual interaction: pause, then resume after a few seconds
        function manual() {
            stop();
            if (resumeTimer) resumeTimer.kill();
            resumeTimer = gsap.delayedCall(C.resume, play);
        }

        // Pause on hover (desktop only)
        if (!isTouch) {
            root.addEventListener("pointerenter", () => { hovering = true; stop(); });
            root.addEventListener("pointerleave", () => { hovering = false; manual(); });
        }

        // Keyboard: arrow keys
        root.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") { go(index + 1); manual(); e.preventDefault(); }
            else if (e.key === "ArrowLeft") { go(index - 1); manual(); e.preventDefault(); }
        });

        // Swipe (pointer events, horizontal threshold)
        let startX = null, startY = 0;
        root.addEventListener("pointerdown", (e) => { startX = e.clientX; startY = e.clientY; });
        root.addEventListener("pointerup", (e) => {
            if (startX === null) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            startX = null;
            if (Math.abs(dx) >= C.swipe && Math.abs(dx) > Math.abs(dy)) {
                go(dx < 0 ? index + 1 : index - 1);
                manual();
            }
        });
        root.addEventListener("pointercancel", () => { startX = null; });

        // Only run while visible / tab active
        ScrollTrigger.create({
            trigger: root, start: "top bottom", end: "bottom top",
            onToggle: (self) => { inView = self.isActive; inView ? play() : stop(); }
        });
        document.addEventListener("visibilitychange", () => { document.hidden ? stop() : play(); });

        play();
    }

    intro();
    reveals();
    counters();
    routes();
    micro();
    slides();
})();
