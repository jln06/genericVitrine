/*
 * Function used to workaround https://github.com/microsoft/TypeScript/issues/16069
 * es2019 alternative `const filteredArr = myArr.flatMap((x) => x ? x : []);`
 */
export function isPresent<T>(t: T | undefined | null | void): t is T {
  return t !== undefined && t !== null;
}

export function scrollTo(idElement: string): void {
  // @ts-ignore
  if (idElement) document.getElementById(idElement).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
}
