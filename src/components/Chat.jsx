import React, { useEffect, useRef, useState, useReducer } from "react";
import { Content, Button, Input, Alert, Table, Avatar } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const ParseJson = (string) => {
  let result = {};
  try {
    result = JSON.parse(string);          // ASK !
  } catch (error) {
    result = {error};
  }
  return result;
}

const initialMessagesVal = [];

const messagesReducer = (messages, action) => {
  switch(action.type){

    case "InsertMSG":
      return [...messages, action.message];

    case "ClearMSGS":
      return [];

    default:
      return messages;

  }
}

function MsgElement({messages, logedInUser, activeClient}){
  console.log("MSGS = ",messages)
  return messages.map((msg,i) => {
    if(msg.sender == logedInUser.id){
      return <div key={i} className="right">{msg.text}</div>
    }
    else if(msg.sender == activeClient.id){
      return <div key={i} className="left">{msg.text}</div>
    }
  })
}

function ChatComp({logedInUser: user}) {

  const [message, setmessage] = useState("");
  const [messages, dispatch] = useReducer(messagesReducer, initialMessagesVal)
  const [onlineClients, setonlineClients] = useState([]);
  const [activeClient, setactiveClient] = useState({})
  const [filteredMessages, setfilteredMessages] = useState([])

  var webSocket = useRef(null);

  useEffect(() => {
    

    webSocket.current = new WebSocket("ws://localhost:8080");           //ask
    webSocket.current.onopen = onOpen; 
    webSocket.current.onmessage = onMessage;
    webSocket.current.onerror = onError;
    webSocket.current.onClose = onClose; 

    return () => {
      UpdateClients();
      webSocket.current.close();
    }

  },[])

  useEffect(() => {
    console.log("Messages = ", messages)
  },[messages])

  const onClose = () => {
    var url = "http://localhost:4000/resetclients"

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type" : "Application/json"
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      
    })
  }

  const UpdateClients = () => {

    var url = "http://localhost:4000/removeuser"

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        userToRemove: user
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      
    })
  }

  const onError = (error) => {
    console.error("WebSocket Error = ",error)
  }

  const onOpen = () => {
    webSocket.current.send(JSON.stringify({ action: "INIT", payload: { id: user.id }}))
  }

  const onMessage = (message) => {
    
    var msgObj = ParseJson(message.data);

    switch(msgObj.action){

      case "INIT":
        if(msgObj.payload.status){
          var url = "http://localhost:4000/fetchUsers"
          var { status , msg , sender, clientKeys } = msgObj.payload

          fetch(url,{
            method: "GET",
            headers:{
              "Content-Type" : "application/json"
            }
          })
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            
            setonlineClients(result.connectedClients)
          })
          Alert.success(msgObj.payload.message, 2000)
        }else{
          Alert.error("Couldn't Connect To Chat", 2000)
        }
        break;
        
      case "INCOMING":
        var {message: incomingMessage, sender, receiver} = msgObj.payload
        dispatch({ type: "InsertMSG", message: msgObj.payload })
        break;
    }
  }

  const HandleMsgChange = (val) => {
    setmessage(val)
  }

  const SendMessage = () => {
    webSocket.current.send(JSON.stringify({ action: "SEND", payload: { sender: user.id, receiver: activeClient.id, message: message} }))    //why jason ?
    dispatch({ type: "InsertMSG", message: { sender: user.id, receiver: activeClient.id, message: message} })
    setmessage("")
  }

  const OpenChat = (client) => {
    const url = "http://localhost:4000/getmessages"
    setactiveClient(client)

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        sender: user.id,
        receiver: client.id
      })
    })
    .then(response => response.json())
    .then((result) => {
      if(result.messages){
        var msgs = result.messages
        setfilteredMessages(msgs.filter((msg) => {
          if(msg.sender === client.id || msg.sender === user.id || msg.receiver === client.id || msg.receiver === user.id ){
            return msg
          }
        }))
      }else if(result.error){
        console.log("Fetch Messages Error = ",result.error)
      }
    })
  }

  return(
    <Content className="app-content-chat">

      <div className="chat-main-div">

        <div className="chat-left-div">
          <div className="selected-client">{
            <div>
              <Avatar>{ Object.keys(activeClient).length && activeClient.name ? activeClient.name.substring(0, 1) : null}</Avatar>
              <span style={{marginLeft: "5px"}}>{activeClient.name}</span>
            </div>
          }</div>
          
          <div className="msg-sec">
            <div><MsgElement messages={filteredMessages} logedInUser={user} activeClient={activeClient} /></div>
            <div className="Action-sec">
              <Input id="chat-inp" type="text" value={message} onChange={HandleMsgChange}/>
              <Button id="chat-send-btn" appearance="ghost" onClick={SendMessage}>Send</Button>
            </div>
          </div>
        </div>

        <div className="chat-right-div">
          <div className="loged-in-user">{
            <div>
              <Avatar>{user.name.substring(0, 1)}</Avatar>
              <span style={{marginLeft: "5px"}}>{user.name}</span>
            </div>
          }</div>
          
          <div className="clients-list">{onlineClients.map(client => {
            if(client.id != user.id){
              return (
                <div className="onlineclient-item" key={`user_${client.id}`} id={`user_${client.id}`} onClick={() => OpenChat(client)}>
                  <Avatar>{client.name.substring(0, 1)}</Avatar>
                  <span style={{marginLeft: "5px"}}>{client.name}</span>
                </div>
              )
            }
          })}</div>
        </div>
        
      </div>
    </Content>
  )
}

export default ChatComp;