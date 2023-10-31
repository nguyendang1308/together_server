const express = require("express")
const app = express()
const http = require("http").createServer()
app.use(express.json())
const PORT = 5000
http.listen(8080)

//Connect database
const connectDB = require("./database")
connectDB();

//Exception
const server = app.listen(PORT,() => console.log('Connected on port ' + PORT))

process.on("unhandledRejection",err => {
    console.log('Have error happened: ' + err.message)
    server.close(() => process.exit(1))
})

app.use("/api/auth",require("./auth/route"))


