import React from "react";
import "./../style/Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
} from "@material-ui/icons";

function Chat() {
  const sendMessage = () => {};

  return (
    <div className="chatbox">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ..</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        <p className="chat__message">
          <span className="chat__name">Bipul</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat__message">
          <span className="chat__name">Bipul</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>{" "}
        <p className="chat__message chat__receiver">
          <span className="chat__name">Bipul</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input type="text" placeholder="Type a message" />
          <button onClick={sendMessage} type="submit">
            send a message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
