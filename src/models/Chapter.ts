import mongoose, { Document, Schema } from 'mongoose';

export interface IChapter extends Document {
  chapter: string;
  subject: string;
  class: number;
  unit: string;
  status: 'active' | 'inactive';
  isWeakChapter: boolean;
  questionSolved: number;
  yearWiseQuestionCount: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

const ChapterSchema: Schema = new Schema({
  chapter: {
    type: String,
    required: [true, 'Chapter name is required'],
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  class: {
    type: String,
    required: [true, 'Class is required'],
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['Not Started', 'Completed', "In Progress"],
    default: 'active'
  },
  isWeakChapter: {
    type: Boolean,
    default: false
  },
  questionSolved: {
    type: Number,
    default: 0
  },
  yearWiseQuestionCount: {
    type: Map,
    of: Number,
    default: {}
  }
}, {
  timestamps: true,
  versionKey: false
});

ChapterSchema.index({ subject: 1 });
ChapterSchema.index({ class: 1 });
ChapterSchema.index({ unit: 1 });
ChapterSchema.index({ status: 1 });
ChapterSchema.index({ isWeakChapter: 1 });

export default mongoose.model<IChapter>('Chapter', ChapterSchema); 