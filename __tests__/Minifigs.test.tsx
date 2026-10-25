import type { ComponentProps } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";

import Minifigs from "../src/screens/Minifigs";
import { jsonResponse, minifigs, minifigsResponse } from "../test-utils/fixtures";
import { createTestQueryClient } from "../test-utils/queryClient";

const navigate = jest.fn();
const fetchMock = jest.fn();

async function renderScreen() {
  const client = createTestQueryClient();
  const props = { navigation: { navigate }, route: { key: "minifigs", name: "minifigs" } } as unknown as ComponentProps<typeof Minifigs>;

  return render(
    <QueryClientProvider client={client}>
      <Minifigs {...props} />
    </QueryClientProvider>
  );
}

beforeEach(() => {
  navigate.mockReset();
  fetchMock.mockReset();
  globalThis.fetch = fetchMock as unknown as typeof fetch;
});

describe("Minifigs screen", () => {
  it("offers a draw once the minifigs are loaded", async () => {
    fetchMock.mockResolvedValue(jsonResponse(minifigsResponse));
    await renderScreen();

    expect(await screen.findByText("DRAW FREE MINIFIG!")).toBeTruthy();
    expect(screen.getByText(/out of 8 and pick one/)).toBeTruthy();
  });

  it("draws five cards and only enables choosing after one is selected", async () => {
    fetchMock.mockResolvedValue(jsonResponse(minifigsResponse));
    await renderScreen();

    await fireEvent.press(await screen.findByText("DRAW FREE MINIFIG!"));

    expect(screen.getAllByRole("radio")).toHaveLength(5);
    const choose = screen.getByRole("button", { name: "CHOOSE FIGURE" });
    expect(choose).toBeDisabled();

    await fireEvent.press(screen.getAllByRole("radio")[0]);

    expect(screen.getByRole("button", { name: "CHOOSE FIGURE" })).toBeEnabled();
  });

  it("passes the chosen minifig to the order form", async () => {
    fetchMock.mockResolvedValue(jsonResponse(minifigsResponse));
    await renderScreen();

    await fireEvent.press(await screen.findByText("DRAW FREE MINIFIG!"));
    const card = screen.getAllByRole("radio")[0];
    const name = card.props.accessibilityLabel as string;
    const expected = minifigs.find((minifig) => minifig.name === name)!;

    await fireEvent.press(card);
    await fireEvent.press(screen.getByRole("button", { name: "CHOOSE FIGURE" }));

    expect(navigate).toHaveBeenCalledWith("orderDetails", {
      minifig: { setNum: expected.set_num, title: expected.name, imageUrl: expected.set_img_url },
    });
  });

  it("opens the details page of a card", async () => {
    fetchMock.mockResolvedValue(jsonResponse(minifigsResponse));
    await renderScreen();

    await fireEvent.press(await screen.findByText("DRAW FREE MINIFIG!"));
    await fireEvent.press(screen.getAllByText("Show details")[0]);

    expect(navigate).toHaveBeenCalledWith("browser", { uri: expect.stringContaining("rebrickable.test/minifigs/") });
  });

  it("shows the error and retries", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}, 500)).mockResolvedValue(jsonResponse(minifigsResponse));
    await renderScreen();

    expect(await screen.findByText(/Rebrickable answered with an error \(500\)/)).toBeTruthy();

    await fireEvent.press(screen.getByText("TRY AGAIN"));

    await waitFor(() => expect(screen.getByText("DRAW FREE MINIFIG!")).toBeTruthy());
  });
});
