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

  user: {
    type: Schema.Types.ObjectId,
    ref: 'UserEmail',
    required: true,
  },

  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: false,
  },


})


export const UserEmail = mongoose.model('Question', AnswerSchema);