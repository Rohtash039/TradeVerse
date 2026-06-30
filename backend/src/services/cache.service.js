import NodeCache from 'node-cache';

// TTL in seconds: market data cached for 30s, news for 5min
const cache = new NodeCache({ stdTTL: 30, checkperiod: 60 });

export function get(key) {
  return cache.get(key);
}

export function set(key, value, ttl) {
  return cache.set(key, value, ttl);
}

export function del(key) {
  return cache.del(key);
}

export function flush() {
  return cache.flushAll();
}

export default { get, set, del, flush };
