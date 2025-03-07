import { f as createComponent, g as createAstro, m as maybeRenderHead, k as renderScript, i as addAttribute, r as renderTemplate } from './astro/server_5OklQkEi.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro();
const $$ProductSlideshow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductSlideshow;
  const { images } = Astro2.props;
  const fullImages = images.map((img) => {
    return img.startsWith("http") ? img : `${"http://localhost:4321"}/images/products/${img}`;
  });
  return renderTemplate`<!-- Slider main container -->${maybeRenderHead()}<div class="swiper mt-10 col-span-1 sm:col-span-2" data-astro-cid-v5yllo6e> <!-- Additional required wrapper --> <div class="swiper-wrapper" data-astro-cid-v5yllo6e> <!-- Slides --> ${fullImages.map((img) => renderTemplate`<div class="swiper-slide" data-astro-cid-v5yllo6e> <img${addAttribute(img, "src")} alt="Product Image" class="w-full h-full object-cover px-10" data-astro-cid-v5yllo6e> </div>`)} </div> <!-- If we need pagination --> <div class="swiper-pagination" data-astro-cid-v5yllo6e></div> </div>  ${renderScript($$result, "/Users/iriancortes/Desktop/Dev/Astro/07-store/src/components/products/ProductSlideshow.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/iriancortes/Desktop/Dev/Astro/07-store/src/components/products/ProductSlideshow.astro", void 0);

export { $$ProductSlideshow as $ };
