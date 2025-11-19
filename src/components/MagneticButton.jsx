import { useEffect, useRef } from "react";

/**
 * MagneticButton
 * Atrai o botão em direção ao cursor dentro de um raio (threshold), com retorno elástico.
 * Implementação usa física simples (mola + amortecimento) para suavidade e leve overshoot natural.
 * Props:
 *  - children: conteúdo interno
 *  - threshold (number, px): distância máxima para iniciar atração (default 220)
 *  - strength (number 0-1): fator da aproximação ao cursor (default 0.35)
 * Observações:
 *  - Escala aumenta até +5% conforme aproxima do alvo calculado.
 *  - Fora do threshold ou ao sair da janela o botão retorna ao centro com amortecimento.
 */
export default function MagneticButton({ children, threshold = 220, strength = 0.35 }) {
  const ref = useRef(null);

  // Physics refs
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const runningRef = useRef(false);
  const frameRef = useRef(null);

  // Tunable physics constants (spring + damping)
  const SPRING_K = 0.08; // stiffness
  const DAMPING = 0.18;  // energy loss
  const SCALE_MAX = 0.05; // max scale increase (5%)

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function setTarget(x, y) {
      targetRef.current.x = x;
      targetRef.current.y = y;
      if (!runningRef.current) {
        runningRef.current = true;
        animate();
      }
    }

    function handleMouseMove(e) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < threshold) {
        // Normalize attraction strength by distance remaining
        const ratio = 1 - dist / threshold; // closer center => bigger ratio
        const moveX = dx * ratio * strength;
        const moveY = dy * ratio * strength;
        setTarget(moveX, moveY);
      } else {
        // Outside threshold -> return to center
        setTarget(0, 0);
      }
    }

    function handleMouseLeave() {
      setTarget(0, 0);
    }

    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      const pos = posRef.current;
      const vel = velRef.current;
      const tgt = targetRef.current;

      // Spring force toward target
      const ax = (tgt.x - pos.x) * SPRING_K;
      const ay = (tgt.y - pos.y) * SPRING_K;

      vel.x += ax;
      vel.y += ay;

      // Damping
      vel.x *= (1 - DAMPING);
      vel.y *= (1 - DAMPING);

      pos.x += vel.x;
      pos.y += vel.y;

      // Scale based on intended distance (elastic feel)
      const intendedDist = Math.hypot(tgt.x, tgt.y);
      const norm = Math.min(1, intendedDist / (threshold * strength));
      const scale = 1 + norm * SCALE_MAX;

      el.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;

      // Stop loop when settled near target
      if (
        Math.abs(vel.x) < 0.01 &&
        Math.abs(vel.y) < 0.01 &&
        Math.abs(pos.x - tgt.x) < 0.2 &&
        Math.abs(pos.y - tgt.y) < 0.2
      ) {
        runningRef.current = false;
        cancelAnimationFrame(frameRef.current);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [threshold, strength]);

  return (
    <button ref={ref} className="magnetic-btn" type="button" aria-label="magnetic button">
      {children}
    </button>
  );
}
