import mongoose, { Schema } from 'mongoose';


const QuestionSchema = new Schema({

  title: {
    type: String,
    required: true,
  },

  question: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: new Date(),
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'UserEmail',
    required: true,
  },

  answer: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
      }
    ],
    default: [],
  }

})


export const UserEmail = mongoose.model('Question', QuestionSchema);