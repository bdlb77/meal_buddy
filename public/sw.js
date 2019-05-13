const CACHE_NAME = 'meal-buddy-v1';
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('Service worker registered.', reg);
        });
  });

const assetToCache = ['../views/layout.pug'];

self.addEventListener('install', function(event) {
	console.log('installing');
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(cache => {
				return cache.addAll(assetToCache);
			})
			.catch(console.error)
	);
});
