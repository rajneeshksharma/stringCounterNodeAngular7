import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

export const connect = ( ) => mongoose.connect('mongodb://localhost/wordFrequency',{ useCreateIndex: true,
  useNewUrlParser: true }).then(
      () =>{
        console.log(`Database connected`);
      },() =>{
        console.log(`database not connected`);
      }
  )