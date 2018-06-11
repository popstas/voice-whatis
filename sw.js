importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "voice-whatis",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.4c9cc97af19794a7174c.js",
    "revision": "967152848814327377485e4a8d54528f"
  },
  {
    "url": "/_nuxt/layouts_default.7822a1b322253790d688.js",
    "revision": "05f656ff2f374598e63578f1813bd97f"
  },
  {
    "url": "/_nuxt/manifest.6c6aab4415d5cf3bed11.js",
    "revision": "bf632571560353f531936c38eac94c11"
  },
  {
    "url": "/_nuxt/pages_index.62af04512c66200f1eb9.js",
    "revision": "a664eaa2b251b934d6cae6206831b579"
  },
  {
    "url": "/_nuxt/vendor.002f25f07bda64fbb2bb.js",
    "revision": "40287b525c4ed14a84bc546ae7b29b29"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

