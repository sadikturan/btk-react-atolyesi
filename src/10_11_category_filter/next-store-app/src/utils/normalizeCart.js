export function normalizeCart(cart) {
  const baseUrl = process.env.NEXT_PUBLIC_MEDIA_URL;

  return {
    ...cart,
    items: cart.items.map((item) => ({
      ...item,
      image: item.image.startsWith("http")
        ? item.image
        : `${baseUrl}${item.image}`,
    })),
  };
}
