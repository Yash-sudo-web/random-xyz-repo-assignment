import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/redis';

const CACHE_DURATION = 3600;

export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const originalJson = res.json;

    res.json = function (data) {
      redisClient.setEx(key, CACHE_DURATION, JSON.stringify(data));
      return originalJson.call(this, data);
    };

    next();
  } catch (error) {
    next();
  }
};

export const clearCache = async (pattern: string = 'cache:*') => {
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}; 