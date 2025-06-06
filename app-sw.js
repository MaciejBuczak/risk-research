const CACHE_NAME = 'risk-research-library-v1';
const STATIC_CACHE_NAME = 'risk-research-static-v1';
const DYNAMIC_CACHE_NAME = 'risk-research-dynamic-v1';

// Pliki statyczne do cache'owania
const staticUrlsToCache = [
  '/risk-research/',
  '/risk-research/app-library.html',
  '/risk-research/app-manifest.json',
  // Dodatkowe assets
  'https://fonts.googleapis.com/css2?family=Segoe+UI:wght@400;500;600;700&display=swap'
];

// Install event - cache static resources
self.addEventListener('install', function(event) {
  console.log('[SW] Installing Risk Research Library Service Worker');
  
  event.waitUntil(
    Promise.all([
      // Cache static files
      caches.open(STATIC_CACHE_NAME)
        .then(function(cache) {
          console.log('[SW] Caching static files');
          return cache.addAll(staticUrlsToCache);
        }),
      // Initialize dynamic cache
      caches.open(DYNAMIC_CACHE_NAME)
        .then(function(cache) {
          console.log('[SW] Dynamic cache initialized');
          return cache;
        })
    ])
  );
  
  // Force waiting SW to become active
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  console.log('[SW] Activating Risk Research Library Service Worker');
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // Keep only current version caches
          if (cacheName !== STATIC_CACHE_NAME && 
              cacheName !== DYNAMIC_CACHE_NAME &&
              cacheName.startsWith('risk-research-')) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', function(event) {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Handle different types of requests
  if (isStaticAsset(request.url)) {
    // Static assets - cache first strategy
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE_NAME));
  } else if (isAppRequest(request.url)) {
    // App pages - network first strategy with cache fallback
    event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE_NAME));
  } else {
    // External resources - cache with network fallback
    event.respondWith(cacheWithNetworkFallback(request, DYNAMIC_CACHE_NAME));
  }
});

// Cache first strategy (for static assets)
function cacheFirstStrategy(request, cacheName) {
  return caches.open(cacheName).then(function(cache) {
    return cache.match(request).then(function(response) {
      if (response) {
        console.log('[SW] Serving from cache:', request.url);
        return response;
      }
      
      // Not in cache, fetch from network and cache
      return fetch(request).then(function(networkResponse) {
        // Check if valid response
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          cache.put(request, responseClone);
          console.log('[SW] Cached new static asset:', request.url);
        }
        return networkResponse;
      }).catch(function(error) {
        console.log('[SW] Network failed for static asset:', request.url, error);
        // Return offline page or default response if needed
        throw error;
      });
    });
  });
}

// Network first strategy (for app pages)
function networkFirstStrategy(request, cacheName) {
  return fetch(request).then(function(networkResponse) {
    // Network success - update cache and return response
    if (networkResponse && networkResponse.status === 200) {
      const responseClone = networkResponse.clone();
      caches.open(cacheName).then(function(cache) {
        cache.put(request, responseClone);
        console.log('[SW] Updated cache from network:', request.url);
      });
    }
    return networkResponse;
  }).catch(function(error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    // Network failed - try cache
    return caches.open(cacheName).then(function(cache) {
      return cache.match(request).then(function(response) {
        if (response) {
          console.log('[SW] Serving from cache (offline):', request.url);
          return response;
        }
        // Nothing in cache either
        throw error;
      });
    });
  });
}

// Cache with network fallback (for external resources)
function cacheWithNetworkFallback(request, cacheName) {
  return caches.open(cacheName).then(function(cache) {
    return cache.match(request).then(function(response) {
      if (response) {
        // Serve from cache but update in background
        fetch(request).then(function(networkResponse) {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
        }).catch(function() {
          // Ignore background update errors
        });
        return response;
      }
      
      // Not in cache, fetch from network
      return fetch(request).then(function(networkResponse) {
        if (networkResponse && networkResponse.status === 200) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      });
    });
  });
}

// Helper functions
function isStaticAsset(url) {
  return url.includes('/risk-research/app-manifest.json') ||
         url.includes('/risk-research/app-library.html') ||
         url.includes('fonts.googleapis.com') ||
         url.includes('cdnjs.cloudflare.com') ||
         url.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/);
}

function isAppRequest(url) {
  return url.includes('/risk-research/') && 
         (url.includes('app-library.html') || url.includes('app-'));
}

// Background sync for offline actions (optional)
self.addEventListener('sync', function(event) {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'sync-articles') {
    event.waitUntil(syncArticles());
  }
});

// Sync articles when back online
function syncArticles() {
  return new Promise(function(resolve) {
    // Here you could implement syncing of articles added while offline
    // For now, just resolve
    console.log('[SW] Syncing articles...');
    resolve();
  });
}

// Handle push notifications (optional for future)
self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    console.log('[SW] Push notification received:', data);
    
    const options = {
      body: data.body || 'Nowy artykuł dostępny w Risk Research',
      icon: '/risk-research/icon-192x192.png',
      badge: '/risk-research/badge-72x72.png',
      tag: data.tag || 'risk-research-notification',
      data: data.url || '/risk-research/app-library.html',
      actions: [
        {
          action: 'open',
          title: 'Otwórz aplikację'
        },
        {
          action: 'close',
          title: 'Zamknij'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Risk Research', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    const urlToOpen = event.notification.data || '/risk-research/app-library.html';
    
    event.waitUntil(
      clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      }).then(function(clientList) {
        // Try to focus existing window
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url.includes('/risk-research/') && 'focus' in client) {
            client.navigate(urlToOpen);
            return client.focus();
          }
        }
        
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});

// Message handling for communication with main app
self.addEventListener('message', function(event) {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: CACHE_NAME,
      static: STATIC_CACHE_NAME,
      dynamic: DYNAMIC_CACHE_NAME
    });
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName.startsWith('risk-research-')) {
              return caches.delete(cacheName);
            }
          })
        );
      }).then(function() {
        event.ports[0].postMessage({ success: true });
      })
    );
  }
});

console.log('[SW] Risk Research Library Service Worker loaded');
