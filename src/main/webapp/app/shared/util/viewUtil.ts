export function isPresent<T>(t: T | undefined | null | void): t is T {
  return t !== undefined && t !== null;
}

export function scrollTo(idElement: string, heightDif: number = null): void {
  const elementById = document.getElementById(idElement);
  if (idElement !== null) {
    if (heightDif) {
      const yOffset = heightDif || 0;
      window.scrollTo({
        top: elementById.getBoundingClientRect().top + window.pageYOffset - heightDif,
        behavior: 'smooth',
      });
    } else {
      elementById.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}
