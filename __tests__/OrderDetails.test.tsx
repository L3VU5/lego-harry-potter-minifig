import type { ComponentProps } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";

import OrderDetails from "../src/screens/OrderDetails";

const navigate = jest.fn();
const minifig = { setNum: "fig-001", title: "Harry Potter", imageUrl: null };

async function renderScreen() {
  const props = {
    navigation: { navigate },
    route: { key: "orderDetails", name: "orderDetails", params: { minifig } },
  } as unknown as ComponentProps<typeof OrderDetails>;

  return render(<OrderDetails {...props} />);
}

const fill = (label: string, value: string) => fireEvent.changeText(screen.getByLabelText(label), value);

beforeEach(() => navigate.mockReset());

describe("OrderDetails screen", () => {
  it("starts with a disabled submit button", async () => {
    await renderScreen();

    expect(screen.getByRole("button", { name: "VIEW SUMMARY" })).toBeDisabled();
    expect(screen.getByText("Harry Potter")).toBeTruthy();
  });

  it("validates the email and zip code formats", async () => {
    await renderScreen();

    await fill("Email", "nope");
    await fireEvent(screen.getByLabelText("Email"), "blur");
    await fill("Zip code", "12");
    await fireEvent(screen.getByLabelText("Zip code"), "blur");

    expect(await screen.findByText("Invalid email format.")).toBeTruthy();
    expect(await screen.findByText("Use 12345 or 12345-6789.")).toBeTruthy();
  });

  it("requires every field", async () => {
    await renderScreen();

    await fireEvent(screen.getByLabelText("Full name"), "blur");

    expect(await screen.findByText("Full name is required.")).toBeTruthy();
  });

  it("sends the valid form to the summary together with the minifig", async () => {
    await renderScreen();

    await fill("Full name", "Hermione Granger");
    await fill("Email", "hermione@hogwarts.edu");
    await fill("Address", "4 Privet Drive");
    await fill("City", "Little Whinging");
    await fill("State", "Surrey");
    await fill("Zip code", "12345");

    await waitFor(() => expect(screen.getByRole("button", { name: "VIEW SUMMARY" })).toBeEnabled());
    await fireEvent.press(screen.getByRole("button", { name: "VIEW SUMMARY" }));

    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith("orderSummary", {
        minifig,
        orderDetails: {
          fullName: "Hermione Granger",
          email: "hermione@hogwarts.edu",
          address: "4 Privet Drive",
          city: "Little Whinging",
          state: "Surrey",
          zipCode: "12345",
        },
      })
    );
  });
});
