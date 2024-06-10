import mongoose, { Schema } from 'mongoose';


const AnswerSchema = new Schema({

  answer: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: new Date(),
  },

  edited: {
    type: Boolean,
    default: false,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'UserEmail',
    required: true,
  },

  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'UserEmail',
      }
    ],
    default: [],
  },

  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: false,
  },

})


export const AnswerModel = mongoose.model('Answer', AnswerSchema);