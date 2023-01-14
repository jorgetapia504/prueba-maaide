import { connect, connection } from 'mongoose'

const conn = {
  isConnected: 0
}

export const dbConnect = async () => {

  if ( conn.isConnected === 1 ) return

  const db = await connect(process.env.MONGO_URL!)

  conn.isConnected = db.connections[0].readyState

  console.log(db.connection.db.databaseName)

}

connection.on('connected', () => {
  console.log('MongoDB is connected')
})

connection.on('error', (err) => {
  console.log(err)
})