import './_astro_actions_D6dCr1td.mjs';
import * as z from 'zod';
import { d as defineAction } from './server_oTMylrHm.mjs';
import { l as loadProductsFromCart } from './load-products-from-cart.action_DpryskAu.mjs';
import { v2 } from 'cloudinary';
import { d as db, P as Product, a as ProductImage } from './_astro_db_DTZHXV_5.mjs';
import { g as getSession } from './server_DwU2nePd.mjs';
import { v4 } from 'uuid';
import { eq, count, sql } from '@astrojs/db/dist/runtime/virtual.js';

const loginUser = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  }),
  handler: async ({ email, password }, { cookies }) => {
    return { ok: true };
  }
});

const logout = defineAction({
  accept: "json",
  handler: async (_, { cookies }) => {
    return { ok: true };
  }
});

const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6)
  }),
  handler: async ({ name, email, password }, { cookies }) => {
    return { ok: true };
  }
});

v2.config({
  cloud_name: "dwptuinp4",
  api_key: "937586677164347",
  api_secret: "jCVDDn62oqhWrl90UV_8Rwvi66M"
});
class ImageUpload {
  static async upload(file) {
    try {
      const buffer = await file.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");
      const imageType = file.type.split("/")[1];
      const resp = await v2.uploader.upload(
        `data:image/${imageType};base64,${base64Image}`
      );
      return resp.secure_url;
    } catch (error) {
      console.log(error);
      throw new Error(JSON.stringify(error));
    }
  }
  static async delete(image) {
    try {
      const imageName = image.split("/").pop() ?? "";
      const imageId = imageName.split(".")[0];
      const resp = await v2.uploader.destroy(imageId);
      console.log("🚀 ~ ImageUpload ~ delete ~ resp:", resp);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const MAX_FILE_SIZE = 5e6;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/jpg"
];
const createUpdateProduct = defineAction({
  accept: "form",
  input: z.object({
    id: z.string().optional(),
    description: z.string(),
    gender: z.string(),
    price: z.number(),
    sizes: z.string(),
    slug: z.string(),
    stock: z.number(),
    tags: z.string(),
    title: z.string(),
    type: z.string(),
    imageFiles: z.array(
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, "Max file size 5MB").refine((file) => {
        if (file.size === 0) return true;
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      }, `Only supported image files are valid, ${ACCEPTED_IMAGE_TYPES.join(", ")}`)
    ).optional()
    //TODO: Imagen.
  }),
  handler: async (form, { request }) => {
    const session = await getSession(request);
    const user = session?.user;
    if (!user) {
      throw new Error("Unauthorized");
    }
    const { id = v4(), imageFiles, ...rest } = form;
    rest.slug = rest.slug.toLowerCase().replaceAll(" ", "-").trim();
    const product = {
      id,
      user: user.id ?? "",
      ...rest
    };
    const queries = [];
    if (!form.id) {
      queries.push(db.insert(Product).values(product));
    } else {
      queries.push(db.update(Product).set(product).where(eq(Product.id, id)));
    }
    const secureUrls = [];
    if (form.imageFiles && form.imageFiles.length > 0 && form.imageFiles[0].size > 0) {
      const urls = await Promise.all(
        form.imageFiles.map((file) => ImageUpload.upload(file))
      );
      secureUrls.push(...urls);
    }
    for (const imageUrl of secureUrls) {
      const imageObj = {
        id: v4(),
        image: imageUrl,
        productId: product.id
      };
      queries.push(db.insert(ProductImage).values(imageObj));
    }
    await db.batch(queries);
    return product;
  }
});

const deleteProductImage = defineAction({
  accept: "json",
  input: z.string(),
  handler: async (imageId, { request }) => {
    const session = await getSession(request);
    const user = session?.user;
    if (!user) {
      throw new Error("Unauthorized");
    }
    const [productImage] = await db.select().from(ProductImage).where(eq(ProductImage.id, imageId));
    if (!productImage) {
      throw new Error(`image with id ${imageId} not found`);
    }
    await db.delete(ProductImage).where(eq(ProductImage.id, imageId));
    if (productImage.image.includes("http")) {
      await ImageUpload.delete(productImage.image);
    }
    return { ok: true };
  }
});

const newProduct = {
  id: "",
  description: "Nueva descripción",
  gender: "men",
  price: 100,
  sizes: "XS,S,M",
  slug: "nuevo-producto",
  stock: 5,
  tags: "shirt,men,nuevo",
  title: "Nuevo Producto",
  type: "shirts"
};
const getProductBySlug = defineAction({
  accept: "json",
  input: z.string(),
  handler: async (slug) => {
    if (slug === "new") {
      return {
        product: newProduct,
        images: []
      };
    }
    const [product] = await db.select().from(Product).where(eq(Product.slug, slug));
    if (!product) {
      throw new Error(`Product with slug ${slug} not found`);
    }
    const images = await db.select().from(ProductImage).where(eq(ProductImage.productId, product.id));
    return {
      product,
      images
      // images: images.map((i) => i.image),
    };
  }
});

const getProductsByPage = defineAction({
  accept: "json",
  input: z.object({
    page: z.number().optional().default(1),
    limit: z.number().optional().default(12)
  }),
  handler: async ({ page, limit }) => {
    page = page <= 0 ? 1 : page;
    const [totalRecords] = await db.select({ count: count() }).from(Product);
    const totalPages = Math.ceil(totalRecords.count / limit);
    if (page > totalPages) {
      return {
        products: [],
        totalPages
      };
    }
    const productsQuery = sql`
select a.*,
( select GROUP_CONCAT(image,',') from 
	( select * from ${ProductImage} where productId = a.id limit 2 )
 ) as images
from ${Product} a
LIMIT ${limit} OFFSET ${(page - 1) * limit};
`;
    const { rows } = await db.run(productsQuery);
    const products = rows.map((product) => {
      return {
        ...product,
        images: product.images ? product.images : "no-image.png"
      };
    });
    return {
      products,
      // rows as unknown as ProductWithImages[],
      totalPages
    };
  }
});

const server = {
  // actions
  // Auth
  loginUser,
  logout,
  registerUser,
  //products
  getProductsByPage,
  getProductBySlug,
  //cart
  loadProductsFromCart,
  //Admin
  //Product
  createUpdateProduct,
  deleteProductImage
};

export { server };
