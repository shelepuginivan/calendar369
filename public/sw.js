const staticCacheName = 'pwaCache'
const assetUrls = [
    '/auth/login',
    '/auth/registration',
    '/',
    '/profile'
]


// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', async () => {
    try {
        const cache = await caches.open(staticCacheName)
        await cache.addAll(assetUrls)
    } catch (e) {
        console.log('Failed to cache data')
    }
})


// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', () => {
    console.log('activated')
})


// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request)
        })
    )
})