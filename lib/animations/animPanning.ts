import { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

type AnimDirection = 'left' | 'right' | 'up' | 'down';

type AnimPanningOptions = {
	elementRef: RefObject<HTMLElement | null>;
	triggerRef?: RefObject<HTMLElement | null>;
	delay?: number;
	duration?: number;
	markers?: boolean;
	animOnce?: boolean;
	onScroll?: boolean;
	direction?: AnimDirection;
	from?: number;
	to?: number;
	fade?: 'in' | 'out';
	ease?: string;
	elemHitArea?: string;
	viewportHitArea?: string;
};

export function animPanning({
	elementRef,
	triggerRef,
	delay = 0,
	duration = 0.5,
	markers = false,
	animOnce = false,
	onScroll = true,
	direction = 'left',
	from = 100,
	to = 0,
	fade = 'in',
	ease = 'sine.inOut',
	elemHitArea = 'top',
	viewportHitArea = '95%',
}: AnimPanningOptions) {
	if (!elementRef.current) return;

	const el = elementRef.current;
	const triggerEL = triggerRef?.current ?? el;
	const isHorizontal = direction === 'left' || direction === 'right';
	const axis = isHorizontal ? 'xPercent' : 'yPercent';
	const entering = fade === 'in';
	const fromParams = {
		opacity: entering ? 0 : 1,
		[axis]: from,
	};
	const toParams = {
		opacity: entering ? 1 : 0,
		[axis]: to,
	};

	const panningTL = gsap.timeline({
		paused: true,
		delay,
		defaults: { ease },
	});

	gsap.set(el, { ...fromParams });
	panningTL.to(el, { duration, ...toParams });

	if (onScroll) {
		ScrollTrigger.create({
			trigger: triggerEL,
			start: `clamp(${elemHitArea} ${viewportHitArea})`,
			onEnter: () => panningTL.play(),
			markers,
		});

		if (!animOnce) {
			ScrollTrigger.create({
				trigger: triggerEL,
				start: 'top bottom',
				onLeaveBack: () => panningTL.pause(0),
				markers,
			});
		}
	} else {
		panningTL.play();
	}
}
