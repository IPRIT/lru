class LRU {

  /**
   * @param {number} size
   */
  constructor (size = 10) {
    /**
     * @type {number}
     * @private
     */
    this._maxSize = size;

    /**
     * @type {Object}
     * @private
     */
    this._hashTable = {};

    /**
     * @type {number}
     * @private
     */
    this._hashTableSize = 0;

    /**
     * @type {*}
     * @private
     */
    this._listHead = null;

    /**
     * @type {*}
     * @private
     */
    this._listTail = null;
  }

  /**
   * @param {*} key
   * @return {*}
   */
  get (key) {
    const tableValue = this._hashTable[ key ];
    if (tableValue) {
      this._moveToHead( tableValue );
      return this._extractValue( tableValue );
    }
  }

  /**
   * @param {*} key
   * @param {*} value
   */
  add (key, value) {
    const existingItem = this._hashTable[ key ];
    const isNew = !existingItem;
    if (isNew) {
      if (this._hashTableSize + 1 > this._maxSize) {
        this._removeLast();
      } else {
        this._hashTableSize++;
      }
      this._hashTable[ key ] = this._wrapValue( key, value );
    } else {
      this._updateValue( key, value );
    }
    this._moveToHead( this._hashTable[ key ], isNew );
  }

  /**
   * @param {{next: null, prev: null, value: *}} listItem
   * @param {boolean} isNew
   * @private
   */
  _moveToHead (listItem, isNew = false) {
    const { prev, next } = listItem;
    if (!isNew) {
      if (prev) {
        prev.next = next;
      } else {
        this._listTail = next;
      }
      if (next) {
        next.prev = prev;
      } else {
        this._listHead = prev;
      }
    }

    const head = this._listHead;
    const tail = this._listTail;
    if (head) {
      head.next = listItem;
    }
    if (!tail) {
      this._listTail = listItem;
    }
    listItem.next = null;
    listItem.prev = head;
    this._listHead = listItem;

    return listItem;
  }

  /**
   * @private
   */
  _removeLast () {
    const tail = this._listTail;
    if (!tail) {
      return;
    }
    this._hashTable[ tail.key ] = null;
    delete this._hashTable[ tail.key ];
    this._removeTail();
  }

  /**
   * @private
   */
  _removeTail () {
    if (!this._listTail) {
      return;
    }
    const tail = this._listTail;
    const newTail = tail.next;
    this._listTail = newTail;
    tail.next = null;
    if (newTail) {
      newTail.prev = null;
    } else {
      this._listHead = null;
    }
  }

  /**
   * @param {*} key
   * @param {*} value
   * @return {{next: null, prev: null, value: *}}
   * @private
   */
  _wrapValue (key, value) {
    return {
      value,
      next: null,
      prev: null,
      key
    };
  }

  /**
   * @param {*} key
   * @param {*} value
   * @private
   */
  _updateValue (key, value) {
    this._hashTable[ key ].value = value;
  }

  /**
   * @param {{next: null, prev: null, value: *}} object
   * @return {*}
   * @private
   */
  _extractValue (object) {
    return object && object.value;
  }
}

module.exports = {
  LRU
};