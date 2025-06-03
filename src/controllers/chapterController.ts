import { Request, Response } from 'express';
import Chapter, { IChapter } from '../models/Chapter';
import { clearCache } from '../middleware/cache';

interface FileRequest extends Request {
  file?: Express.Multer.File;
}

/**
 * Retrieves chapters with optional filtering and pagination
 * @param {Request} req - Express request object containing query parameters
 * @param {string} [req.query.class] - Filter by class value
 * @param {string} [req.query.unit] - Filter by unit
 * @param {string} [req.query.status] - Filter by status
 * @param {string} [req.query.isWeakChapter] - Filter by weak chapter flag ('true' or 'false')
 * @param {string} [req.query.subject] - Filter by subject
 * @param {string} [req.query.page=1] - Page number for pagination
 * @param {string} [req.query.limit=10] - Number of items per page
 * @param {Response} res - Express response object
 * @returns {Promise<void>} JSON response with chapters data and pagination info
 */
export const getChapters = async (req: Request, res: Response) => {
  try {
    const {
      class: classValue,
      unit,
      status,
      isWeakChapter,
      subject,
      page = 1,
      limit = 10
    } = req.query;

    const filter: any = {};
    if (classValue) filter.class = classValue;
    if (unit) filter.unit = unit;
    if (status) filter.status = status;
    if (isWeakChapter === 'true') filter.isWeakChapter = true
    if (isWeakChapter === 'false') filter.isWeakChapter = false;
    if (subject) filter.subject = subject;

    const skip = (Number(page) - 1) * Number(limit);

    const total = await Chapter.countDocuments(filter);

    const chapters = await Chapter.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        chapters,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching chapters',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Retrieves a single chapter by its ID
 * @param {Request} req - Express request object
 * @param {string} req.params.id - The chapter ID to retrieve
 * @param {Response} res - Express response object
 * @returns {Promise<void>} JSON response with chapter data or error message
 */
export const getChapter = async (req: Request, res: Response) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: 'Chapter not found'
      });
    }

    res.json({
      success: true,
      data: chapter
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching chapter',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Uploads and processes multiple chapters from a JSON file
 * @param {FileRequest} req - Express request object with file upload capability
 * @param {Express.Multer.File} [req.file] - The uploaded JSON file containing chapters data
 * @param {Response} res - Express response object
 * @returns {Promise<void>} JSON response with upload results including successful and failed chapters
 * @description Processes a JSON file containing an array of chapter objects, validates each chapter,
 * saves valid chapters to the database, and returns a summary of successful and failed operations.
 * Also clears the cache after processing.
 */
export const uploadChapters = async (req: FileRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const fileContent = req.file.buffer.toString();
    let chapters: any[];

    try {
      chapters = JSON.parse(fileContent);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON file'
      });
    }

    const results = {
      successful: [] as IChapter[],
      failed: [] as { chapter: any; error: string }[]
    };

    for (const chapter of chapters) {
      try {
        const newChapter = new Chapter(chapter);
        await newChapter.validate();
        const savedChapter = await newChapter.save();
        results.successful.push(savedChapter);
      } catch (error) {
        results.failed.push({
          chapter,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    await clearCache();

    res.json({
      success: true,
      data: {
        successful: results.successful,
        failed: results.failed,
        totalProcessed: chapters.length,
        successCount: results.successful.length,
        failureCount: results.failed.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing chapters',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 