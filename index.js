import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000
const DB_URI="mongodb+srv://sabari-db:sabarinathan@mern-stack.x175l.mongodb.net/sample_restaurants?retryWrites=true&w=majority"
console.log("Hello");


MongoClient.connect(
  DB_URI,
  {
    poolSize: 50,
    wtimeout: 2500,
    useNewUrlParse: true,
    useUnifiedTopology: true}
  )
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })

    console.log(`listening on port ${port}`)
  })