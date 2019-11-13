var cacheStorageKey = 'minimal-pwa-3';

var cacheList = [
    './',
    './favicon.ico',
    './manifest.json',
    './index.css',
    './static/js/main.chunk.js',
    './static/js/runtime-main.js',
    './static/js/2.chunk.js',
    './push.js',
    './static/css/main.chunk.css',
    './static/media/logo.svg'
]

// 当浏览器解析完sw文件时，serviceworker内部触发install事件
self.addEventListener('install', function(e) {
  console.log('Cache event!')
  // 打开一个缓存空间，将相关需要缓存的资源添加到缓存里面
  e.waitUntil(
    caches.open(cacheStorageKey).then(function(cache) {
      console.log('Adding to Cache:', cacheList)
      return cache.addAll(cacheList)
    }).then(function() {
      console.log('install event open cache ' + cacheStorageKey);
      console.log('Skip waiting!')
      return self.skipWaiting();
    })
  )
})

// 如果当前浏览器没有激活的service worker或者已经激活的worker被解雇，
// 新的service worker进入active事件
self.addEventListener('activate', function(e) {
  console.log('Activate event');
  console.log('Promise all', Promise, Promise.all);
  // active事件中通常做一些过期资源释放的工作
  var cacheDeletePromises = caches.keys().then(cacheNames => {
    console.log('cacheNames', cacheNames, cacheNames.map);
    return Promise.all(cacheNames.map(name => {
      if (name !== cacheStorageKey) { // 如果资源的key与当前需要缓存的key不同则释放资源
        console.log('caches.delete', caches.delete);
        var deletePromise = caches.delete(name);
        console.log('cache delete result: ', deletePromise);
        return deletePromise;
      } else {
        return Promise.resolve();
      }
    }));
  });

  console.log('cacheDeletePromises: ', cacheDeletePromises);
  e.waitUntil(
    Promise.all([cacheDeletePromises]
    ).then(() => {
      console.log('activate event ' + cacheStorageKey);
      console.log('Clients claims.')
      return self.clients.claim();
    })
  )
})

self.addEventListener('fetch', function(e) {
  console.log('Fetch event ' + cacheStorageKey + ' :', e.request.url);
  e.respondWith( // 该策略先从网络中获取资源，如果获取失败则再从缓存中读取资源
    fetch(e.request.url)
    .then(function (httpRes) {

      // 请求失败了，直接返回失败的结果
      if (!httpRes || httpRes.status !== 200) {
          // return httpRes;
          return caches.match(e.request)
      }

      // 请求成功的话，将请求缓存起来。
      var responseClone = httpRes.clone();
      caches.open(cacheStorageKey).then(function (cache) {
          return cache.delete(e.request)
          .then(function() {
              cache.put(e.request, responseClone);
          });
      });

      return httpRes;
    })
    .catch(function(err) { // 无网络情况下从缓存中读取
      console.error(err);
      return caches.match(e.request);
    })
  )
})