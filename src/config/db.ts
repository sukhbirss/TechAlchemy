import { connect } from "mongoose";

const connectDB = async (): Promise<void> => {
  const conn = await connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

export default connectDB;
