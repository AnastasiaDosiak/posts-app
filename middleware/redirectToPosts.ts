export default defineNuxtRouteMiddleware((_, from) => {
  if (from.path === '/') {
    return navigateTo('/posts');
  }
});
