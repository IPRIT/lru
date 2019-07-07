const LRU = require( './lru' ).LRU;

const lru = new LRU( 2 );
console.log( 1, lru );

lru.add('a', 1);
console.log( 2, lru );

lru.add('b', { test: 2 });
console.log( 3, lru );

lru.add('c', 3);
console.log( 4, lru );

lru.get('b');
console.log( 5, lru );

lru.get('c');
console.log( 6, lru );

lru.add('b', 4);
console.log( 7, lru );