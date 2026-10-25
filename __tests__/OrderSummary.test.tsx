import type { ComponentProps } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";

import OrderSummary from "../src/screens/OrderSummary";
import { jsonResponse, partsResponse } from "../test-utils/fixtures";
import { createTestQueryClient } from "../test-utils/queryClient";

const popTo = jest.fn();
const fetchMock = jest.fn();

const minifig = { setNum: "fig-001", title: "Harry Potter", imageUrl: "https://img.test/fig-001.jpg" };
const orderDetails = {
  fullName: "Hermione Granger",
  email: "hermione@hogwarts.edu",
  address: "4 Privet Drive",
  city: "Little Whinging",
  state: "Surrey",
  zipCode: "12345",
};

async function renderScreen() {
  const client = createTestQueryClient();
  const props = {
    navigation: { popTo },
    route: { key: "orderSummary", name: "orderSummary", params: { minifig, orderDetails } },
  } as unknown as ComponentProps<typeof OrderSummary>;

  return render(
    <QueryClientProvider client={client}>
      <OrderSummary {...props} />
    </QueryClientProvider>
  );
}

beforeEach(() => {
  popTo.mockReset();
  fetchMock.mockReset();
  globalThis.fetch = fetchMock as unknown as typeof fetch;
});

describe("OrderSummary screen", () => {
  it("lists the parts of the chosen minifig, not of the previous one", async () => {
    fetchMock.mockResolvedValue(jsonResponse(partsResponse));
    await renderScreen();

    expect(await screen.findByText("Minifig Head")).toBeTruthy();
    expect(screen.getByText("This minifig has 2 parts:")).toBeTruthy();
    expect(new URL(fetchMock.mock.calls[0][0]).pathname).toBe("/api/v3/lego/minifigs/fig-001/parts/");
  });

  it("shows where the order is going", async () => {
    fetchMock.mockResolvedValue(jsonResponse(partsResponse));
    await renderScreen();

    expect(await screen.findByText("Hermione Granger")).toBeTruthy();
    expect(screen.getByText("4 Privet Drive, Little Whinging, Surrey 12345")).toBeTruthy();
  });

  it("submits the order and returns to the draw screen", async () => {
    fetchMock.mockResolvedValue(jsonResponse(partsResponse));
    await renderScreen();

    await fireEvent.press(await screen.findByRole("button", { name: "SUBMIT ORDER" }));

    expect(await screen.findByText("Sending your order…")).toBeTruthy();
    await waitFor(() => expect(popTo).toHaveBeenCalledWith("minifigs"), { timeout: 3000 });
  });

  it("does not log the personal data of the order", async () => {
    const log = jest.spyOn(console, "log").mockImplementation(() => undefined);
    fetchMock.mockResolvedValue(jsonResponse(partsResponse));
    await renderScreen();

    await fireEvent.press(await screen.findByRole("button", { name: "SUBMIT ORDER" }));
    await waitFor(() => expect(popTo).toHaveBeenCalled(), { timeout: 3000 });

    expect(log).not.toHaveBeenCalled();
    log.mockRestore();
  });

  it("shows an error with a retry when the parts cannot be loaded", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}, 500)).mockResolvedValue(jsonResponse(partsResponse));
    await renderScreen();

    expect(await screen.findByText(/error \(500\)/)).toBeTruthy();
    await fireEvent.press(screen.getByText("TRY AGAIN"));

    expect(await screen.findByText("Minifig Torso")).toBeTruthy();
  });
});
