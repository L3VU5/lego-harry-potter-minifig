import { pickRandom } from "../src/utils/helpers";

describe("pickRandom", () => {
  it("returns the requested number of different items", () => {
    const picked = pickRandom([1, 2, 3, 4, 5, 6, 7, 8], 5);

    expect(picked).toHaveLength(5);
    expect(new Set(picked).size).toBe(5);
  });

  it("returns every item when the list is shorter than the count", () => {
    expect(pickRandom([1, 2], 5).sort()).toEqual([1, 2]);
  });

  it("does not modify the input", () => {
    const items = [1, 2, 3];
    pickRandom(items, 2);

    expect(items).toEqual([1, 2, 3]);
  });

  it("returns an empty list for an empty input", () => {
    expect(pickRandom([], 3)).toEqual([]);
  });
});
