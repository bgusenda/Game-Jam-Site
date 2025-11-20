import { useEffect, useRef } from "react";

/**
 * Magnet (versão com física de mola semelhante a MagneticButton)
 * Props originais preservadas; agora usa animação suave com spring + damping.
 * - padding: influencia o raio (threshold) de ativação.
 * - magnetStrength: se >1 converte para força (1/magnetStrength). Se entre 0-1 usa diretamente.
 * - disabled: desativa totalmente o efeito e reseta posição.
 * - wrapperClassName / innerClassName: classes adicionais para container e inner.
 */
const Magnet = ({
	children,
	padding = 100,
	disabled = false,
	magnetStrength = 2,
	wrapperClassName = "",
	innerClassName = "",
	...props
}) => {
	const wrapperRef = useRef(null);
	const innerRef = useRef(null);

	// Refs para física
	const targetRef = useRef({ x: 0, y: 0 });
	const posRef = useRef({ x: 0, y: 0 });
	const velRef = useRef({ x: 0, y: 0 });
	const runningRef = useRef(false);
	const frameRef = useRef(null);

	// Constantes de física (afinadas para suavidade)
	const SPRING_K = 0.08;
	const DAMPING = 0.18;
	const SCALE_MAX = 0.05; // +5% máx

	// Converter semântica antiga (dividir delta por magnetStrength) para fator [0-1]
	const strength = magnetStrength <= 1 ? magnetStrength : 1 / magnetStrength;

	useEffect(() => {
		const el = innerRef.current;
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
			if (disabled || !wrapperRef.current) return;
			const rect = wrapperRef.current.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			const dx = e.clientX - cx;
			const dy = e.clientY - cy;
			const dist = Math.hypot(dx, dy);

			// Threshold aproximado: metade do maior lado + padding
			const threshold = Math.max(rect.width, rect.height) / 2 + padding;

			if (dist < threshold) {
				const ratio = 1 - dist / threshold; // aproximação progressiva
				const moveX = dx * ratio * strength;
				const moveY = dy * ratio * strength;
				setTarget(moveX, moveY);
			} else {
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

			// Força de mola
			const ax = (tgt.x - pos.x) * SPRING_K;
			const ay = (tgt.y - pos.y) * SPRING_K;
			vel.x += ax;
			vel.y += ay;

			// Amortecimento
			vel.x *= 1 - DAMPING;
			vel.y *= 1 - DAMPING;

			pos.x += vel.x;
			pos.y += vel.y;

			// Escala elástica baseada na distância alvo
			const intendedDist = Math.hypot(tgt.x, tgt.y);
			const thresholdEstimate = padding + 120; // valor auxiliar p/ normalização
			const norm = Math.min(1, intendedDist / (thresholdEstimate * strength));
			const scale = 1 + norm * SCALE_MAX;

			el.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;

			// Parar quando estabiliza
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
			// Reset visual ao desmontar ou se disabled mudar para true
			el.style.transform = "translate3d(0px,0px,0) scale(1)";
			posRef.current = { x: 0, y: 0 };
			velRef.current = { x: 0, y: 0 };
			targetRef.current = { x: 0, y: 0 };
		};
	}, [padding, strength, disabled]);

	// Se ficar disabled em runtime: reset imediato
	useEffect(() => {
		if (disabled && innerRef.current) {
			targetRef.current = { x: 0, y: 0 };
			posRef.current = { x: 0, y: 0 };
			velRef.current = { x: 0, y: 0 };
			innerRef.current.style.transform = "translate3d(0px,0px,0) scale(1)";
		}
	}, [disabled]);

	return (
		<div
			ref={wrapperRef}
			className={wrapperClassName}
			style={{ position: "relative", display: "inline-block" }}
			{...props}
		>
			<div
				ref={innerRef}
				className={`magnetic-btn ${innerClassName}`.trim()}
				type="button"
				aria-label="magnetic button"
				style={{ willChange: "transform" }}
			>
				{children}
			</div>
		</div>
	);
};

export default Magnet;
