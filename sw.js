const C='compass-v1',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
 if(u.origin===location.origin){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))}
 else if(u.hostname.endsWith('tile.openstreetmap.org')){e.respondWith(caches.open(C).then(c=>fetch(e.request).then(r=>{c.put(e.request,r.clone());return r}).catch(()=>c.match(e.request))))}});
