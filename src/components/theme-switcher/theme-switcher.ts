import { clamp } from '@morev/utils';

const easeOutSine = (amount: number) => Math.sin(amount * (Math.PI / 2));

const DAY_VARIANT_CLASSNAME = 'theme-switcher--variant-day';
const NIGHT_VARIANT_CLASSNAME = 'theme-switcher--variant-night';
const MINIMAL_DRAG_OFFSET = 24;
const MAX_DRAG_DISTANCE = 1280;
const MAX_EXTRA_OFFSET = .25;
const NO_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

(() => {
	const $switchButton = document.querySelector<HTMLButtonElement>('[data-theme-switcher]');
	if (!$switchButton) return;

	let pressedPageX: number | null = null;
	let shouldNotFireClick = false;

	const reset = () => {
		pressedPageX = null;
		shouldNotFireClick = false;
		$switchButton.style.removeProperty('--ts--extra-offset');
		$switchButton.classList.remove('is-dragging');
	};

	const getState = () => {
		return $switchButton.classList.contains(DAY_VARIANT_CLASSNAME)
			? 'day'
			: 'night';
	};

	const toggleOption = () => {
		$switchButton.classList.toggle(DAY_VARIANT_CLASSNAME);
		$switchButton.classList.toggle(NIGHT_VARIANT_CLASSNAME);

		const isNight = getState() === 'night';

		$switchButton.setAttribute('aria-checked', isNight.toString());
	};

	const setOffset = (currentPageX: number) => {
		if (!pressedPageX) return;
		if (NO_MOTION) return;

		const currentState = getState();
		if (currentState === 'day' && pressedPageX > currentPageX) return;
		if (currentState === 'night' && pressedPageX < currentPageX) return;

		const amount = clamp(Math.abs(pressedPageX - currentPageX), 0, MAX_DRAG_DISTANCE) / MAX_DRAG_DISTANCE;
		const extraOffset = easeOutSine(amount) * MAX_EXTRA_OFFSET;

		$switchButton.style.setProperty('--ts--extra-offset', extraOffset.toString());
	};

	document.addEventListener('click', (event: MouseEvent) => {
		if (event.target !== $switchButton) return;
		if (shouldNotFireClick) return;

		toggleOption();
	});

	document.addEventListener('pointerdown', (event: PointerEvent) => {
		if (event.target !== $switchButton) return;

		pressedPageX = event.pageX;
	});

	document.addEventListener('pointermove', (event: PointerEvent) => {
		if (!pressedPageX) return;

		requestAnimationFrame(() => setOffset(event.pageX));
		if (Math.abs(pressedPageX - event.pageX) > MINIMAL_DRAG_OFFSET) {
			$switchButton.classList.add('is-dragging');
		}
	});

	document.addEventListener('pointerup', (event: PointerEvent) => {
		if (!pressedPageX) return;
		$switchButton.classList.remove('is-dragging');

		const currentPageX = event.pageX;
		const currentState = getState();

		if (
			(currentState === 'day' && currentPageX > pressedPageX + MINIMAL_DRAG_OFFSET)
			|| (currentState === 'night' && currentPageX < pressedPageX - MINIMAL_DRAG_OFFSET)
		) {
			shouldNotFireClick = true;
			toggleOption();
		} else {
			shouldNotFireClick = false;
		}

		setTimeout(() => reset(), 0);
	});
})();
