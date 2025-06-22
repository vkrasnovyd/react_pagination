export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getPageItems(
  itemsList: string[],
  { perPage, pageNumber }: { perPage: number; pageNumber: number },
): string[] {
  const maxPages = Math.ceil(itemsList.length / perPage);
  const firstElementId = (pageNumber - 1) * perPage;
  const lastElementId =
    pageNumber < maxPages ? firstElementId + perPage - 1 : itemsList.length;

  return [...itemsList].slice(firstElementId, lastElementId + 1);
}
