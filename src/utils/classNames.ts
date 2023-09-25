type Mods = Record<string, boolean | string>;

export function classNames(
	cls: string,
	mods: Mods = {},
	additional: string[] = []
): string {
	return [
		cls,
		...additional,
		...Object.entries(mods)
			.filter(([_, val]) => Boolean(val))
			.map(([className]) => className),
		
	].join(' ');
}