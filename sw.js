const CACHE_NAME = "cashgroup-cache-v1";
const urlsToCache = [
  "/",
  "/Zmx.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png"
];

// تثبيت Service Worker وتخزين الملفات المهمة
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  console.log("Service Worker: Installed");
});

// تفعيل Service Worker وحذف الكاش القديم إذا تغيّر
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
  console.log("Service Worker: Activated");
});

// اعتراض الطلبات (Fetch) وجلبها من الكاش إذا متوفرة
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
