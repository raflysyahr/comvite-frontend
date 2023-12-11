const cacheName = "dev-comvite-cache"



this.addEventListener('install',(event)=>{ 
   event.waitUntil(
      caches.open(cacheName).then((cache) => {
          return cache.addAll(['/index.html'])
      })
   )
})

// self.addEventListener("notificationclick", event => {
//   event.waitUntil(self.clients.openWindow(event.notification.tag))
//   event.notification.close()
// })



this.addEventListener('activate', (event) => {
  // - clean up outdated runtime cache
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      // clean up those who are not listed in manifestURLs

      cache.keys().then((result)=> console.log(result)).catch((error)=> console.log(error))

    })
  )
})

self.addEventListener('fetch',(event)=>{
  event.respondWith(
    caches.match(event.request).then(cacheRes =>{
      return cacheRes || fetch(event.request)
    })
  )
})

self.addEventListener("notificationclick", event => {
  event.waitUntil(self.clients.openWindow(event.notification.tag))
  event.notification.close()
})

