export type HeroRect = {left: number; top: number; width: number; height: number};

// Justified rows: widths follow the source aspect ratios. Choose row breaks
// that minimize proportional crop at the actual viewport shape, not fixed slots.
export function heroLayout(ratios: number[], aspect: number): HeroRect[] {
  let best: number[] = [ratios.length];
  let bestScore = Infinity;
  function consider(counts: number[]) {
    let index = 0;
    const sums = counts.map((count) => ratios.slice(index, index += count).reduce((a, b) => a + b, 0));
    const heights = sums.map((sum) => 1 / sum);
    const total = heights.reduce((a, b) => a + b, 0);
    const crop = Math.abs(Math.log(aspect * total));
    const imbalance = Math.log(Math.max(...heights) / Math.min(...heights));
    const score = crop + 0.12 * imbalance;
    if (score < bestScore) { bestScore = score; best = counts; }
  }
  function partitions(remaining: number, counts: number[]) {
    if (!remaining) { consider(counts); return; }
    if (counts.length >= 6) return;
    for (let count = 1; count <= Math.min(5, remaining); count++) partitions(remaining - count, [...counts, count]);
  }
  partitions(ratios.length, []);
  let index = 0;
  const sums = best.map((count) => ratios.slice(index, index += count).reduce((a, b) => a + b, 0));
  const totalHeight = sums.reduce((sum, ratio) => sum + 1 / ratio, 0);
  const result: HeroRect[] = [];
  let top = 0;
  index = 0;
  best.forEach((count, row) => {
    const height = (1 / sums[row]) / totalHeight;
    let left = 0;
    for (let column = 0; column < count; column++) {
      const width = ratios[index++] / sums[row];
      result.push({left, top, width, height});
      left += width;
    }
    top += height;
  });
  return result;
}
