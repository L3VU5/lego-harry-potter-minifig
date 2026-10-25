import { fetchMinifigParts, fetchMinifigs } from "../src/api/rebrickable";
import { jsonResponse, minifigsResponse, partsResponse } from "../test-utils/fixtures";

const fetchMock = jest.fn();

beforeEach(() => {
  fetchMock.mockReset();
  globalThis.fetch = fetchMock as unknown as typeof fetch;
  process.env.EXPO_PUBLIC_REBRICKABLE_KEY = "test-key";
});

describe("Rebrickable API", () => {
  it("searches Harry Potter minifigs with a large page size", async () => {
    fetchMock.mockResolvedValue(jsonResponse(minifigsResponse));

    await expect(fetchMinifigs()).resolves.toEqual(minifigsResponse);

    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(url.pathname).toBe("/api/v3/lego/minifigs/");
    expect(url.searchParams.get("search")).toBe("harry potter");
    expect(url.searchParams.get("page_size")).toBe("500");
    expect(url.searchParams.get("key")).toBe("test-key");
  });

  it("requests the parts of one minifig", async () => {
    fetchMock.mockResolvedValue(jsonResponse(partsResponse));

    await fetchMinifigParts("fig-001");

    expect(new URL(fetchMock.mock.calls[0][0]).pathname).toBe("/api/v3/lego/minifigs/fig-001/parts/");
  });

  it("explains a missing API key without calling the network", async () => {
    delete process.env.EXPO_PUBLIC_REBRICKABLE_KEY;

    await expect(fetchMinifigs()).rejects.toThrow(/EXPO_PUBLIC_REBRICKABLE_KEY/);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reports a rejected key", async () => {
    fetchMock.mockResolvedValue(jsonResponse({}, 401));

    await expect(fetchMinifigs()).rejects.toThrow("Rebrickable rejected the API key.");
  });

  it("reports other HTTP errors with the status", async () => {
    fetchMock.mockResolvedValue(jsonResponse({}, 500));

    await expect(fetchMinifigs()).rejects.toThrow("(500)");
  });

  it("reports a network failure", async () => {
    fetchMock.mockRejectedValue(new TypeError("Network request failed"));

    await expect(fetchMinifigs()).rejects.toThrow(/Could not reach Rebrickable/);
  });
});
