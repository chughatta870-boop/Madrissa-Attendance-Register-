/* ==========================================
   MADRISSA ATTENDANCE REGISTER PWA
   FINAL SERVICE WORKER
   Offline + Cache + Update System
   Watermark: M Ijaz GHS 124 NB
========================================== */


const CACHE_NAME = "madrissa-attendance-v1";


const APP_FILES = [

"./",

"./index.html",

"./style.css",

"./script.js",

"./manifest.json"

];




// =============================
// Install
// =============================

self.addEventListener(
"install",
event => {


event.waitUntil(


caches.open(CACHE_NAME)

.then(cache => {


return cache.addAll(APP_FILES);


})


);



self.skipWaiting();


});






// =============================
// Activate
// =============================

self.addEventListener(
"activate",
event => {


event.waitUntil(


caches.keys()

.then(cacheNames => {


return Promise.all(


cacheNames.map(cache => {


if(
cache !== CACHE_NAME
){


return caches.delete(cache);


}


})


);


})


);



self.clients.claim();


});







// =============================
// Fetch Offline System
// =============================

self.addEventListener(
"fetch",
event => {


event.respondWith(


caches.match(
event.request
)

.then(response => {


return response ||


fetch(event.request)

.then(networkResponse => {


return caches.open(
CACHE_NAME
)

.then(cache => {


cache.put(

event.request,

networkResponse.clone()

);


return networkResponse;


});


});


})

.catch(()=>{


return caches.match(
"./index.html"
);


})


);


});







// =============================
// Update Message
// =============================

self.addEventListener(
"message",
event => {


if(
event.data === "SKIP_WAITING"
){


self.skipWaiting();


}


});
