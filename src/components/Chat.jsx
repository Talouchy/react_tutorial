import React, { useEffect, useRef } from "react";
import { Content, Button, Input } from "rsuite";
import { useState } from "react";

function ChatComp() {

  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);

  var webSocket = useRef(null);

  useEffect(() => {
    console.log("Mounted");

    webSocket.current = new WebSocket("ws://localhost:8080");           //ask
    webSocket.current.onmessage = onMessage;

    return () => {
      webSocket.current.close();
    }

  },[])

  const onMessage = (message) => {
    console.log("Messages Are = ",messages)
    setmessages(prev => [...prev, message.data]);
  }

  const HandleMsgChange = (val) => {
    setmessage(val)
  }
  console.log("Message Is = ",message)

  const SendMessage = () => {
    webSocket.current.send(message)
    setmessages([...messages, message])
    setmessage("")
    console.log("Messages Are = ",messages)
  }
  
  return(
    <Content className="app-content">
      <div className="chat-container">
        <div>{messages.map((msg, i) => <div key={i} className="msg-div">{msg}</div>)}</div>
        <div className="Action-sec">
          <Input id="chat-inp" type="text" value={message} onChange={HandleMsgChange}/>
          <Button id="chat-send-btn" appearance="ghost" onClick={SendMessage}>Send</Button>
        </div>
      </div>
    </Content>
  )
}

export default ChatComp;