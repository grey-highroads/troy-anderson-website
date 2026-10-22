import { readSanity } from "@/lib/sanity/client";
import type { MediaPhoto } from "@/lib/sanity/media";

type PressResult = {
  heading?: string;
  intro?: string;
  photographyHeading?: string;
  photographyIntroduction?: string;
  downloadLabel?: string;
  emptyMessage?: string;
  photos?: (Omit<MediaPhoto, "key"> & { _key?: string })[];
};

export async function getPressContent() {
  const press = await readSanity<PressResult>("press");
  if (!press) return null;
  const photos = press.photos?.flatMap((photo) => {
    if (!photo._key || !photo.title || !photo.alt || !photo.width || !photo.height) return [];
    try {
      if (!["http:", "https:"].includes(new URL(photo.imageUrl).protocol)) return [];
    } catch { return []; }
    return [{ ...photo, key: photo._key }];
  }) ?? [];
  return { ...press, photos };
}
