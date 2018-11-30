workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(
    "https://code.jquery.com/jquery-2.2.4.min.js",
    workbox.strategies.cacheFirst());
workbox.routing.registerRoute(
    "https://code.jquery.com/ui/1.10.3/jquery-ui.js",
    workbox.strategies.cacheFirst());
workbox.routing.registerRoute(
    "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
    workbox.strategies.cacheFirst());
workbox.routing.registerRoute(
    "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
    workbox.strategies.cacheFirst());

workbox.precaching.precacheAndRoute(self.__precacheManifest);
