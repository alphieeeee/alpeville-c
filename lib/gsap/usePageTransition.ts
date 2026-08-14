import gsap from "gsap";

export const usePageTransition = () => {
	const pageTransitionIn = () => {
		const mainEl = document.getElementById('main-container')
		const overlayEl = document.querySelectorAll('.transition-overlay')
		if (mainEl && overlayEl.length) {
			gsap.set(mainEl, { autoAlpha: 0 })
			gsap.to(overlayEl, { duration: 0.6, autoAlpha: 0, ease: 'sine.out', force3D: true })
			gsap.to(mainEl, { duration: 0.6, autoAlpha: 1, ease: 'sine.out', force3D: true })
		}
	}

	return {
		pageTransitionIn,
	}
}
