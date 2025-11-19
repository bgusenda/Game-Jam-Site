import { useRef, useEffect } from "react";

export function Card({ width, height, id, children }) {
    const ref = useRef(null);
    const motionAllowed = typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (!motionAllowed) return;
        const el = ref.current;
        if (!el) return;

        let animFrame = null;
        let pointerX = 0, pointerY = 0;
        let pending = false;

        const update = () => {
            pending = false;
            const rect = el.getBoundingClientRect();
            const x = pointerX - rect.left;
            const y = pointerY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotateX = ((y - cy) / cy) * -8; // invert for natural tilt
            const rotateY = ((x - cx) / cx) * 8;
            el.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px)`;
            el.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 18px 4px rgba(255,255,255,.35), 0 0 22px 6px rgba(0,200,255,.4)`;
        };

        const handleMove = (e) => {
            pointerX = e.clientX;
            pointerY = e.clientY;
            if (!pending) {
                pending = true;
                animFrame = requestAnimationFrame(update);
            }
        };

        const handleLeave = () => {
            el.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
            el.style.boxShadow = '';
        };

        el.addEventListener('mousemove', handleMove);
        el.addEventListener('mouseleave', handleLeave);

        return () => {
            el.removeEventListener('mousemove', handleMove);
            el.removeEventListener('mouseleave', handleLeave);
            if (animFrame) cancelAnimationFrame(animFrame);
        };
    }, [motionAllowed]);

    return (
        <div
            ref={ref}
            className="card-div container col jc-fx-start ai-center"
            style={{
                width: width,
                height: height,
            }}
            id={id}
        >
            {children}
        </div>
    );
}