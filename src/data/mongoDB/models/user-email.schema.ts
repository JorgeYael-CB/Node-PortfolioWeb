import mongoose, { Schema } from 'mongoose';



const userEmailSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  verify: {
    type: Boolean,
    default: false,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  date: {
    type: Date,
    default: new Date(),
  },

  roles: {
    type: [String],
    default: ['USER'],
    enum: ['ADMIN', 'USER', 'SUPER_USER', 'DEVELOPER'],
  },

  questions: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Question'
      }
    ],
    default: [],
  }
})


export const UserEmailModel = mongoose.model('UserEmail', userEmailSchema);