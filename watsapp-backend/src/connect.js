const mongoose = require("mongoose");

const connection_url =
  "mongodb+srv://bipul123:B4iVpJWxBC2KOhRn@cluster0.t8q8n.mongodb.net/watsapp-clone?retryWrites=true&w=majority";

mongoose
  .connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database is connected successfully.......");
  })
  .catch((error) => {
    console.log("you have error in connecting......", error);
  });

// B4iVpJWxBC2KOhRn
