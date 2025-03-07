import { f as createComponent, g as createAstro, m as maybeRenderHead, i as addAttribute, r as renderTemplate } from './astro/server_5OklQkEi.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro = createAstro();
const $$ProductImage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductImage;
  const { src, alt, className } = Astro2.props;
  const currentImage = src.startsWith("http") ? src : `${"http://localhost:4321"}/images/products/${src}`;
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(currentImage, "src")}${addAttribute(alt, "alt")}${addAttribute([className], "class:list")}>`;
}, "/Users/iriancortes/Desktop/Dev/Astro/07-store/src/components/products/ProductImage.astro", void 0);

export { $$ProductImage as $ };
