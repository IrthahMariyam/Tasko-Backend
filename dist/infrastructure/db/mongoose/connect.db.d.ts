declare const connectDB: () => Promise<void>;
export default connectDB;
/**
 * const connectd=async():Promise<void>=>{
 * try{
 * await mongoogse.connect(process.env.MONGO_URL as string)
 * }catch(error){
 * logger.error("mongodb connection error",error)}}
 */ 
