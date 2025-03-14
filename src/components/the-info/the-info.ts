(() => {
	const trigger = document.querySelector<HTMLButtonElement>('[data-the-info-trigger]');
	const dialog = document.querySelector<HTMLDialogElement>('[data-the-info-dialog]');
	const contents = document.querySelector<HTMLDivElement>('[data-the-info-contents]');

	if (!trigger || !dialog || !contents) return;

	trigger.addEventListener('click', () => {
		dialog.showModal();
	});

	document.addEventListener('click', (event: MouseEvent) => {
		if ((event.target as HTMLElement).closest('[data-the-info-trigger]') === trigger) return;
		if (!(event.target as HTMLElement).closest('[data-the-info-contents]')) {
			dialog.close();
		}
	});
})();
