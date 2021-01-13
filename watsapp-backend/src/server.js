const express = require("express");
const Pusher = require("pusher");
const mongoose = require("mongoose");
// in Connect we have server for database
require("./connect");
const MessageContent = require("./chatSchema");

const app = express();
const port = process.env.PORT || 8001;
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

const pusher = new Pusher({
  appId: "1137679",
  key: "08e38b9bd950e1c59a8b",
  secret: "a4acd090a373b12601ca",
  cluster: "ap2",
  useTLS: true,
});

const db = mongoose.connection;
db.once("open", async () => {
  try {
    console.log("database is connected to pusher");
    const msgCollection = await db.collection("messagecontents");
    const changeStream = await msgCollection.watch();
    changeStream.on("change", (change) => {
      console.log("change ocurred");

      if (change.operationType === "insert") {
        const messageDetails = change.fullDocument;
        pusher.trigger("messages", "inserted", {
          name: messageDetails.name,
          message: messageDetails.message,
        });
      } else {
        console.log("Error triggering Pusher");
      }
    });
  } catch (error) {
    console.log("you have error in inserting data");
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Hello world I am  the backend");
});

app.post("/api/v1/message/new", async (req, res) => {
  try {
    const message = await req.body;
    const dataPost = await MessageContent.insertMany([message]);
    res.status(201).send(dataPost);
  } catch (error) {
    res.status(500).send("error in inserting data", error);
  }
});

// get data
app.get("/api/v1/message/new", async (req, res) => {
  try {
    const data = await MessageContent.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("error in inserting data", error);
  }
});

// delete data
app.delete("/api/v1/message/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await MessageContent.findByIdAndDelete(_id);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send("error in deleting data", error);
  }
});

app.listen(port, () => {
  console.log(`server is running on port :${port}`);
});
