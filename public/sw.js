// OS-Resilient Service Worker for Nutrition Tracker PWA & Push Notifications
const CACHE_NAME = 'nutrition-tracker-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Handle incoming messages from the client app (Health Check, Immediate Trigger, Ping)
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SW_HEALTH_CHECK') {
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({
        status: 'OK',
        active: true,
        version: CACHE_NAME,
        timestamp: Date.now(),
      });
    }
  } else if (event.data.type === 'SCHEDULED_NOTIFICATION_TRIGGER') {
    const { title, body, tag, url, vibrate } = event.data;
    self.registration.showNotification(title || 'تذكير متابع التغذية 🥗', {
      body: body || 'حان موعد وجبتك أو شرب الماء!',
      icon: '/icon.svg',
      badge: '/icon.svg',
      tag: tag || 'nutrition-reminder',
      vibrate: vibrate || [200, 100, 200, 100, 300],
      renotify: true,
      data: { url: url || '/', timestamp: Date.now() },
      actions: [
        { action: 'open', title: 'فتح التطبيق 📱' },
        { action: 'close', title: 'إغلاق ✕' },
      ],
    });
  }
});

// Handle Push event from Web Push Server or local push mock
self.addEventListener('push', (event) => {
  let data = {
    title: 'تذكير دايت د. شيماء 🥗',
    body: 'حان موعد وجبتك المحددة أو شرب الماء!',
    icon: '/icon.svg',
    badge: '/icon.svg',
    data: { url: '/' },
  };

  try {
    if (event.data) {
      data = { ...data, ...event.data.json() };
    }
  } catch (e) {
    if (event.data) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/icon.svg',
    badge: data.badge || '/icon.svg',
    vibrate: data.vibrate || [200, 100, 200, 100, 300],
    data: data.data || { url: '/' },
    actions: [
      { action: 'open', title: 'فتح التطبيق 📱' },
      { action: 'close', title: 'إغلاق ✕' },
    ],
    tag: data.tag || 'nutrition-reminder',
    renotify: true,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification click with intelligent window focus or navigation
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  const urlToOpen = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if window is already open
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.postMessage({
            type: 'NOTIFICATION_CLICKED',
            tag: event.notification.tag,
            url: urlToOpen,
          });
          return client.focus();
        }
      }
      // If no window is open, open a new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});
