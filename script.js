document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('openBtn');
    const letter = document.getElementById('letter');

    openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEnvelope();
    });

    envelope.addEventListener('click', () => {
        if (!envelope.classList.contains('open')) {
            openEnvelope();
        }
    });

    function openEnvelope() {
        // Phase 1: Open Flap & Slide Letter Up partially
        envelope.classList.add('open');

        // Phase 2: Expand to fullscreen smoothly (FLIP technique)
        setTimeout(() => {
            expandLetter();
        }, 800); // Wait for the slide-up to establish
    }

    function expandLetter() {
        // 1. First: Get current position/size
        const first = letter.getBoundingClientRect();

        // MOVEMENT: Move letter to body to escape stacking contexts
        document.body.appendChild(letter);

        // 2. Last: Apply class to set final state
        document.body.classList.add('fullscreen-mode');

        // 3. Invert: Calculate changes
        const last = letter.getBoundingClientRect();

        const deltaX = first.left - last.left;
        const deltaY = first.top - last.top;
        const deltaW = first.width / last.width;
        const deltaH = first.height / last.height;

        // Apply the inversion transform immediately (no transition)
        letter.style.transition = 'none';
        letter.style.transformOrigin = 'top left'; // Pivot from top-left for easier math
        letter.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`;

        // 4. Play: Force reflow, then remove transform to let CSS transition take over
        requestAnimationFrame(() => {
            // Force reflow
            letter.offsetHeight;

            // Enable transition
            letter.style.transition = 'transform 0.8s cubic-bezier(0.2, 0, 0.2, 1)';

            // Clear styles to let it animate to the CSS defined 'Last' state (centered)
            letter.style.transformOrigin = 'center center'; // Reset origin
            letter.style.transform = 'translate(-50%, -50%) scale(1)'; // Match CSS final state
        });
    }
});
