import { MongoClient } from "mongodb"

const url = "mongodb://localhost:27017"

const client = new MongoClient(url)

const DB_NAME = "itmanage"

const connect = async () => {
  await client.connect()

  console.log("connect MongoDb successful")

  const db = client.db(DB_NAME)

  return db
}

export default await connect()
