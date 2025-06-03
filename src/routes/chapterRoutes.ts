import express from 'express';
import multer from 'multer';
import { getChapters, getChapter, uploadChapters } from '../controllers/chapterController';
import { cacheMiddleware } from '../middleware/cache';
import { initRateLimiter } from '../middleware/rateLimiter';
import { authenticateJWT } from '../middleware/jwtAuth';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.use(initRateLimiter);

router.get('/', cacheMiddleware, getChapters);
router.get('/:id', cacheMiddleware, getChapter);
router.post('/', authenticateJWT, upload.single('file'), uploadChapters);

export default router; 