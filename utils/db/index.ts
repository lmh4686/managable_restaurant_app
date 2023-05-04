import mongoose from 'mongoose'

export async function connectDB() {
  await mongoose.connect(process.env.DB_URL as string);
  console.log('DB Connected')
}
 
export async function disconnectDB() {
  await mongoose.disconnect()
  console.log("DB Disconnected");
}