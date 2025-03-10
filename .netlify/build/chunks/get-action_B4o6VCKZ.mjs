import { A as AstroError, y as ActionNotFoundError } from './astro/server_5OklQkEi.mjs';

async function getAction(path) {
  const pathKeys = path.split(".").map((key) => decodeURIComponent(key));
  let { server: actionLookup } = await import('./_astro_internal-actions_DsQ1gGMs.mjs');
  if (actionLookup == null || !(typeof actionLookup === "object")) {
    throw new TypeError(
      `Expected \`server\` export in actions file to be an object. Received ${typeof actionLookup}.`
    );
  }
  for (const key of pathKeys) {
    if (!(key in actionLookup)) {
      throw new AstroError({
        ...ActionNotFoundError,
        message: ActionNotFoundError.message(pathKeys.join("."))
      });
    }
    actionLookup = actionLookup[key];
  }
  if (typeof actionLookup !== "function") {
    throw new TypeError(
      `Expected handler for action ${pathKeys.join(".")} to be a function. Received ${typeof actionLookup}.`
    );
  }
  return actionLookup;
}

export { getAction };
