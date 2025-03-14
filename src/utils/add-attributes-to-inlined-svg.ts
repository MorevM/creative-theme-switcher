import { tsObject } from '@morev/utils';

export const addAttributesToInlinedSvg = (
	source: string,
	attributesMap: Record<string, string>,
) => {
	const insertionString = tsObject.entries(attributesMap)
		.reduce<string[]>((acc, [key, value]) => {
			acc.push(`${key}="${value}"`);
			return acc;
		}, [])
		.join(' ');
	return source.replace('<svg ', `<svg ${insertionString}`);
};
