'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    db: process.env.MONGOHQ_URL,
    redisUrl: "redis.sokratik.com",
    redisPort: 6379,
    redisPass: "QmKs2PgWhQlHYm4OUnhxoors",
    cacheTTL: 10000000
}
