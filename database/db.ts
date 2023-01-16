import { connect, set } from 'mongoose'

export const dbConnect = async () => {
  try {
    set('strictQuery', true)
    const db = await connect(process.env.MONGO_URL!)
    console.log(db.connection.db.databaseName)
  } catch (error) {
    console.error(error)
  }
}