import mongoose from "mongoose";



export class MongoDb {

  constructor(
    private readonly dbUri:string,
  ){}


  async connect() {
    try {
      await mongoose.connect(this.dbUri);
    } catch (error) {
      console.log(error);
    }
  };

}