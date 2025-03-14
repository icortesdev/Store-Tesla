import { f as createComponent, j as renderComponent, k as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_5OklQkEi.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$AuthLayout } from '../chunks/AuthLayout_nREVvPNC.mjs';
export { renderers } from '../renderers.mjs';

const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-center self-center z-10"> <div class="p-12 bg-white mx-auto rounded-2xl w-100"> <div class="mb-4"> <h3 class="font-semibold text-2xl text-gray-800">Registro</h3> <p class="text-gray-500">Please sign in to your account.</p> </div> <form class="space-y-5"> <div class="space-y-2"> <label class="text-sm font-medium text-gray-700 tracking-wide">Nombre</label> <input class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="text" name="name" placeholder="John Doe"> </div> <div class="space-y-2"> <label class="text-sm font-medium text-gray-700 tracking-wide">Email</label> <input class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="email" name="email" placeholder="mail@gmail.com"> </div> <div class="space-y-2"> <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
Password
</label> <input class="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="password" name="password" placeholder="Enter your password"> </div> <div class="flex items-center justify-between"> <div class="flex items-center"> <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"> <label for="remember_me" class="ml-2 block text-sm text-gray-800">
Recuerdame
</label> </div> <div class="text-sm"> <a href="/login" class="text-green-400 hover:text-green-500">
¿Ya tienes una cuenta?
</a> </div> </div> <div> <button type="submit" id="btn-submit" class="disabled:bg-gray-300 w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500">
Ingresar
</button> </div> </form> <div class="pt-5 text-center text-gray-400 text-xs"> <span>
Copyright © 2021-${(/* @__PURE__ */ new Date()).getFullYear()} <a href="https://codepen.io/uidesignhub" rel="" target="_blank" title="Ajimon" class="text-green hover:text-green-500">AJI</a></span> </div> </div> </div> ` })} ${renderScript($$result, "/Users/iriancortes/Desktop/Dev/Astro/07-store/src/pages/register.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/iriancortes/Desktop/Dev/Astro/07-store/src/pages/register.astro", void 0);

const $$file = "/Users/iriancortes/Desktop/Dev/Astro/07-store/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
