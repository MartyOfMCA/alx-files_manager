import { createClient, print } from 'redis';

/**
 * Represents an instance of a client
 * connection to redis server.
 *
 */
class RedisClient {

  /**
   * Initialzes a new redis client instance.
   */
  constructor () {
    this.client = createClient();
    this.client.on('error', (err) => { console.log(err); });
  }

  /**
   * Determines whether there is an active
   * connection to the redis server.
   *
   * @returns {bool} True when there
   * is a valid connection to the server.
   * Otherwise false.
   *
   */
  isAlive () {
    return (this.client.connected)
  }

  /**
   * Fetch the given key from the redis
   * server.
   *
   * @param {string} key - The key for the item
   * to retrieve.
   *
   * @returns {string} The resolved value
   * for the given key.
   *
   */
  async get (key) {
    return (
     new Promise((resolve) => {
       this.client.get(key, (err, value) => resolve (value));
     })
    );
  }

  /**
   * Add a new item to the redis server
   * using the given key and value. It
   * prints the new item after its
   * stored on the server.
   *
   * @param {string} key - The key used to
   * store the new item.
   * @param {string} value - The new item stored.
   * @praram {number} duration - The duration in seconds
   * for the new item to expire.
   *
   */
  async set (key, value, duration) {
    await this.client.set(key, value, 'EX', duration);
  }

  /**
   * Deletes an item from the redis server
   * bearing the given key.
   *
   * @param {string} key - The key to the item
   * to remove.
   *
   */
  async del (key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
