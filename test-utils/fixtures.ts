import type { Minifig } from "../src/types";

export const minifigs: Minifig[] = Array.from({ length: 8 }, (_, index) => ({
  set_num: `fig-00${index}`,
  name: `Wizard ${index}`,
  num_parts: 4 + index,
  set_img_url: `https://img.test/fig-00${index}.jpg`,
  set_url: `https://rebrickable.test/minifigs/fig-00${index}/`,
}));

export const minifigsResponse = { count: minifigs.length, results: minifigs };

export const partsResponse = {
  count: 2,
  results: [
    { id: 1, part: { part_num: "3626", name: "Minifig Head", part_img_url: "https://img.test/3626.jpg" } },
    { id: 2, part: { part_num: "973", name: "Minifig Torso", part_img_url: null } },
  ],
};

export const jsonResponse = (body: unknown, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => body,
});
