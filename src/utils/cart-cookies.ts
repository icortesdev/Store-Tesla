import type { CartItem } from "@/interfaces";
import Cookies from "js-cookie";

export const CartCookiesClient = {
  getCart(): CartItem[] {
    return JSON.parse(Cookies.get("cart") ?? "[]");
  },

  addItem(cartItem: CartItem): CartItem[] {
    const cart = CartCookiesClient.getCart();

    const itemInCart = cart.find(
      (item) =>
        item.productId === cartItem.productId && item.size === cartItem.size
    );

    if (itemInCart) {
      itemInCart.quantity += cartItem.quantity;
    } else {
      cart.push(cartItem);
    }

    Cookies.set("cart", JSON.stringify(cart));

    return cart;
  },

  removeItem(productId: string, size: string): CartItem[] {
    const cart = CartCookiesClient.getCart();

    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.size === size)
    );

    Cookies.set("cart", JSON.stringify(updatedCart));

    return updatedCart;
  },
};

export default CartCookiesClient;
