import './_astro_actions_D6dCr1td.mjs';
import { d as db, P as Product, a as ProductImage } from './_astro_db_DTZHXV_5.mjs';
import { d as defineAction } from './server_oTMylrHm.mjs';
import { eq, inArray } from '@astrojs/db/dist/runtime/virtual.js';

const loadProductsFromCart = defineAction({
  accept: "json",
  // input: z.string(),
  handler: async (_, { cookies }) => {
    try {
      console.log("Cookies disponibles:", [...cookies.headers()]);
      const cartCookie = cookies.get("cart");
      console.log("Cookie de carrito:", cartCookie);
      if (!cartCookie || !cartCookie.value) {
        console.log("No hay cookie de carrito");
        return [];
      }
      const cart = JSON.parse(cartCookie.value);
      console.log("Carrito parseado:", cart);
      if (!Array.isArray(cart) || cart.length === 0) {
        console.log("Carrito vacío o no es un array");
        return [];
      }
      const productIds = cart.map((item) => item.productId);
      console.log("IDs de productos:", productIds);
      const dbProducts = await db.select().from(Product).innerJoin(ProductImage, eq(Product.id, ProductImage.productId)).where(inArray(Product.id, productIds));
      console.log("Productos de BD encontrados:", dbProducts.length);
      const cartProducts = cart.map((item) => {
        const dbProduct = dbProducts.find((p) => p.Product.id === item.productId);
        if (!dbProduct) {
          console.warn(`Producto con id ${item.productId} no encontrado en la BD`);
          return null;
        }
        const { title, price, slug } = dbProduct.Product;
        const image = dbProduct.ProductImage.image;
        return {
          productId: item.productId,
          title,
          size: item.size,
          quantity: item.quantity,
          image: image.startsWith("http") ? image : `${"http://localhost:4321"}/images/products/${image}`,
          price,
          slug
        };
      }).filter((product) => product !== null);
      console.log("Productos del carrito procesados:", cartProducts.length);
      return cartProducts;
    } catch (error) {
      console.error("Error en handler de loadProductsFromCart:", error);
      throw error;
    }
  }
});

export { loadProductsFromCart as l };
