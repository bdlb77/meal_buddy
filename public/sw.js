const CACHE_NAME = 'meal-buddy-v1 static';
const CACHE_DYNAMIC = 'meal-buddy-v1 dynamic';

const assetsToCache = [
	/* fallback files */
];

self.addEventListener('install', async event => {
	console.info('Event: Install');
	const cache = await caches.open(CACHE_NAME);
	cache.addAll(assetsToCache);
});

self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', async event => {
	const req = event.request;
	const url = new URL(req.url);
	// if urls are same.. respond with cache First
	// if they are different do network first approach
	if (url.origin === location.origin) {
		event.respondWith(cacheFirst(req));
	} else {
		event.respondWith(networkFirst(req));
	}

	async function cacheFirst(req) {
		const cachedResponse = await caches.match(req);
		return cachedResponse || fetch(req);
	}
});

async function networkFirst(req) {
	// separate cache for dynamic assets
	const dynamicCache = await caches.open(CACHE_DYNAMIC);

	// try to go to network -> go to cache.. if fails then go to cache and return that instead
	try {
		const networkRes = await fetch(req);
		// instead of cache.add we use .put() to 'fallback' if need be to the static cache
		// put allows us to define the request
		// have to clone res (or else wouldn't be able to return to browser)
		dynamicCache.put(req, networkRes.clone());
		return networkRes;
	} catch (e) {
		const cachedResponse = await dynamicCache.match(req);
		return cachedResponse; // || await caches.match('fallback.json');
	}
}
