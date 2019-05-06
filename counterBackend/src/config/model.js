import mongoose from 'mongoose';
const { Schema } = mongoose;

const frequencySchema = new Schema({
  word : {
      type : String
  }, 
  count : {
      type : Number
  },
  editBy : {
      type : String
  }
},{timestamps : true});
export default mongoose.model('Frequency', frequencySchema);