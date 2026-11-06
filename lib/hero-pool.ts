// Toggle off to restore the preserved fourteen-clip composition.
export const NINE_CLIP_HERO = true;
export type HeroPool = { visible: number[]; waiting: number[]; cursor: number };
// Fisher–Yates: one fresh, stable selection per browser mount. An injectable
// RNG lets QA repeat a particular sequence without affecting production.
export function initialHeroPool(total: number, random = Math.random): HeroPool {
  const catalogue = Array.from({length: total}, (_, index) => index);
  for (let index = catalogue.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [catalogue[index], catalogue[other]] = [catalogue[other], catalogue[index]];
  }
  return {visible: catalogue.slice(0, 9), waiting: catalogue.slice(9), cursor: 0};
}
// Cycle through the waiting clips before returning outgoing ones to the pool.
// Keep the watched tile for focus return; replace exactly two other slots.
export function rotateHeroPool(pool: HeroPool, watched: number): HeroPool {
  const visible = [...pool.visible];
  const waiting = [...pool.waiting];
  const incoming = waiting.splice(0, 2);
  let cursor = pool.cursor;
  for (const clip of incoming) {
    while (visible[cursor % visible.length] === watched) cursor++;
    const slot = cursor++ % visible.length;
    waiting.push(visible[slot]);
    visible[slot] = clip;
  }
  return {visible, waiting, cursor: cursor % visible.length};
}
