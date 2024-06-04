import mongoose from "mongoose";



export class MongoDb {

  constructor(
    private readonly dbUri:string,
  ){}


  connect() {
    try {
      mongoose.connect(this.dbUri);
    } catch (error) {
      console.log(error);
    }
  };

}