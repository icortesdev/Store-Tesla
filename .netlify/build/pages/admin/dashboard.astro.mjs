import { f as createComponent, g as createAstro, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_5OklQkEi.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../../chunks/MainLayout_Cb4SmH2h.mjs';
import { a as actions } from '../../chunks/_astro_actions_D6dCr1td.mjs';
import { $ as $$Pagination } from '../../chunks/Pagination_BQW85v2R.mjs';
import 'js-cookie';
import { F as Formatter } from '../../chunks/formatter_BLiNkTK8.mjs';
import { $ as $$ProductImage } from '../../chunks/ProductImage_DVFXPB0M.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const searchParams = Astro2.url.searchParams;
  const pageParam = Number(searchParams.get("page") ?? 1);
  const { data, error } = await Astro2.callAction(actions.getProductsByPage, { page: pageParam });
  if (error) {
    return Astro2.redirect("/");
  }
  const { products, totalPages } = data;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Panel administrativo" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Dashboard</h1> <p>Listado de productos</p> <div class="flex justify-end"> <a class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all" href="/admin/products/new">
Nuevo producto
</a> </div> <table class="w-full mt-5 "> <thead> <tr> <th class="text-left">Imagen</th> <th class="text-left">Titulo</th> <th class="text-left">Precio</th> <th class="text-left">Inventario</th> </tr> </thead> <tbody> ${products.map((product) => renderTemplate`<tr> <td>  ${renderComponent($$result2, "ProductImage", $$ProductImage, { "src": product.images.split(",")[0], "alt": product.title, "className": "w-16 h-16" })} </td> <td> <a class="hover:underline cursor-pointer"${addAttribute(`/admin/products/${product.slug}`, "href")} data-astro-prefectch="load"> ${product.title} </a> </td> <td>${Formatter.currency(product.price)}</td> <td>${product.stock}</td> </tr>`)} </tbody> </table> ${renderComponent($$result2, "Pagination", $$Pagination, { "totalPages": totalPages, "currentPage": pageParam })} ` })}`;
}, "/Users/iriancortes/Desktop/Dev/Astro/07-store/src/pages/admin/dashboard.astro", void 0);

const $$file = "/Users/iriancortes/Desktop/Dev/Astro/07-store/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
