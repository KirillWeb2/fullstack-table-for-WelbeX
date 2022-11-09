import { IPagination } from "./../types/Pagination";

export const getPagination = (page: number, max: number): IPagination[] => {
  const result: IPagination[] = [];

  // определение минимума и максимума
  let min = page - 2 >= 1 ? page - 2 : 1;
  let maximum = (page + 2) * 10 <= max ? page + 2 : Math.ceil(max / 10);

  // итерация от минимума, до максимума
  for (let i = min; i <= maximum; i++) {
    result.push({
      value: i,
      active: i === page ? true : false,
    });
  }

  return result;
};
