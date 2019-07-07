# A simple zero-dependency JavaScript O(1) LRU cache

```js
const LRU = require( 'lru-simple' );

const lru = new LRU( 2 ); // 2 - max cache size

lru.add('a', 1);
lru.add('b', { test: 2 });
lru.add('c', 3);

lru.get('a'); // undefined (expired)
lru.get('b'); // { test: 2 }
lru.get('c'); // 3

lru.add('b', 4); // updates 'b' value
lru.get('b'); // 4
```