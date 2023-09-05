/*
 * Function used to workaround https://github.com/microsoft/TypeScript/issues/16069
 * es2019 alternative `const filteredArr = myArr.flatMap((x) => x ? x : []);`
 */
export function formatDateToyyyyMMdd(date: Date): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0, ajoute 1
  const day = date.getDate().toString().padStart(2, '0');

  return year + month + day;
}
