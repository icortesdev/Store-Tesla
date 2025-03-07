import { f as createComponent, g as createAstro, m as maybeRenderHead, i as addAttribute, r as renderTemplate } from './astro/server_5OklQkEi.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                             */

const $$Astro = createAstro();
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { totalPages } = Astro2.props;
  const url = Astro2.url;
  const pageParam = Number(url.searchParams.get("page")) || 1;
  const currentPage = Math.max(
    pageParam > totalPages ? totalPages : pageParam,
    1
  );
  const path = url.pathname;
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-between my-32" data-astro-cid-qz4fk72h> <a class="button"${addAttribute(`${path}?page=${Math.max(currentPage - 1, 1)}`, "href")} data-astro-cid-qz4fk72h>
Anteriores
</a> <span data-astro-cid-qz4fk72h>Página ${currentPage} de ${totalPages}</span> <a class="button"${addAttribute(`${path}?page=${Math.min(currentPage + 1, totalPages)}`, "href")} data-astro-cid-qz4fk72h>
Siguientes
</a> </div> `;
}, "/Users/iriancortes/Desktop/Dev/Astro/07-store/src/components/shared/Pagination.astro", void 0);

export { $$Pagination as $ };
