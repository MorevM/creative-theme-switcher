import { bemClassnames } from '@morev/bem-classnames';

const bemFactory = bemClassnames({
	delimiters: {
		element: '__',
		modifier: '--',
		modifierValue: '-',
	},
	hyphenate: true,
	namespace: '',
});

export const useBem = (block: string) => bemFactory(block);
