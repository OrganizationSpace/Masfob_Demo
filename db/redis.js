require('dotenv').config()
const Redis = require('ioredis')

const redis = new Redis({
	password: process.env.REDIS_PASS,
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
})

// Event listener for successful Redis connection
redis.on('connect', () => {
	console.log('Connected to Redis')
})

// Event listener for Redis connection errors
redis.on('error', (err) => {
	console.error('Error connecting to Redis:', err)
})

module.exports = { redis } // Export both the Redis and RedisJson instances
