// Shapes of the Rebrickable API responses used by the app (only the fields we read).
export type Minifig = {
  set_num: string;
  name: string;
  num_parts: number;
  set_img_url: string | null;
  set_url: string;
};

export type MinifigsResponse = {
  count: number;
  results: Minifig[];
};

export type MinifigPart = {
  id: number;
  part: {
    part_num: string;
    name: string;
    part_img_url: string | null;
  };
};

export type PartsResponse = {
  count: number;
  results: MinifigPart[];
};

// What the user picked, passed along the checkout screens.
export type SelectedMinifig = {
  setNum: string;
  title: string;
  imageUrl: string | null;
};

export type OrderDetails = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

export type RootStackParamList = {
  minifigs: undefined;
  orderDetails: { minifig: SelectedMinifig };
  orderSummary: { minifig: SelectedMinifig; orderDetails: OrderDetails };
  browser: { uri: string };
};
