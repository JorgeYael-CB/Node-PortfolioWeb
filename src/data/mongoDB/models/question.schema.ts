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

  likes: {
    type:Number,
    default: 0,
  },

  answers: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
      }
    ],
    default: [],
  }

})


export const QuestionModel = mongoose.model('Question', QuestionSchema);