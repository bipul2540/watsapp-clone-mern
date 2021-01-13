import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import "./../style/App.css";
import Pusher from "pusher-js";
import axios from "./../axios";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    fethcData();
  }, []);

  const fethcData = async () => {
    try {
      const response = await axios.get("/api/v1/message/new");
      const data = await response.data;
      setMessages(data);
      console.log(data);
    } catch (error) {
      console.log("you have error in fetching data", error);
    }
  };

  useEffect(() => {
    const pusher = new Pusher("08e38b9bd950e1c59a8b", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessages) {
      // alert(JSON.stringify(newMessages));
      setMessages([...messages, newMessages]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
