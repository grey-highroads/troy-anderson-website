// Toggle off to restore the preserved fourteen-clip composition.
export const NINE_CLIP_HERO = true;
export type HeroPool = { visible: number[]; waiting: number[]; cursor: number };
export function initialHeroPool(total: number): HeroPool {
  return {visible: Array.from({length: Math.min(9, total)}, (_, i) => i), waiting: Array.from({length: Math.max(0, total - 9)}, (_, i) => i + 9), cursor: 0};
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
