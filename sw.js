//version
var appVersion='v1.00';

//file to cache

var file=[
	'./',
	'./index.html',
	'./index.css',
	'./sangram.jpg'
]

//install
self.addEventListener('install',event=>{
	event.waitUntil(
		caches.open(appVersion)
		.then(cache=>{
			return cache.addAll(file)
			.catch(err=>{
				console.error("Error add cache",err);
			})
		})
	)
	console.info("Sw Installed");
	self.skipWaiting();
})
//activate
self.addEventListener('activate',event=>{
	event.waitUntil(
		caches.keys()
		.then(cacheNames=>{
			return Promise.all(
				cacheNames.map(cache=>{
					if(cache!== appVersion){
						console.info("deleting Old cache",cache)
						return caches.delete(cache);
					}
				})
			)
		})
	)
	return self.clients.claim();
})
//fetch
self.addEventListener('fetch',event=>{
	console.info("SW fetch",event.request.url);
	event.respondWith(
		caches.match(event.request)
		.then(res=>{
			return res || fetch(event.request);
		})
	)
})