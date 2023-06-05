export default {
  async fetch(request, env, ctx) {
    const cacheUrl = new URL(request.url);
    const cacheKey = new Request(cacheUrl.toString(), request);
    const cache = caches.default;
 
    let response = await cache.match(cacheKey);
 
    if (!response) {
      response = await fetch("https://printf.cloud/logo.png");
      response = new Response(response.body, response);
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
      response.headers.append(`X-Origin`, `true`);
    }
    return response;
  },
};
