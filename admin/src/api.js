const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const fetchOrders = async () => {
  const response = await fetch(`${BASE_URL}/orders`);
  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
};