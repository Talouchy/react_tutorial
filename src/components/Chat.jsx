import React, { useEffect, useRef } from "react";
import { Content, Button, Input, Alert, Table } from "rsuite";
import { useState } from "react";
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

function ChatComp({logedInUser: user}) {

  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const [onlineClients, setonlineClients] = useState([]);
  const [activeClient, setactiveClient] = useState(1)
  const [activeClientToShow, setactiveClientToShow] = useState("")

  var webSocket = useRef(null);

  useEffect(() => {
    console.log("Mounted");

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
    console.log("Mounted Again")
  },[activeClient])

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
      console.log("Reset Users Results = ",result)
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
      console.log("Response = ",res.newClientsArr)
    })
  }

  const onError = (error) => {
    console.error("WebSocket Error = ",error)
  }

  const onOpen = () => {
    webSocket.current.send(JSON.stringify({ action: "INIT", payload: { id: user.id }}))
  }

  const onMessage = (message) => {
    console.log("Incoming Message is = ", message)
    var msgObj = ParseJson(message.data);

    switch(msgObj.action){

      case "INIT":
        if(msgObj.payload.status){
          var url = "http://localhost:4000/fetchUsers"
          var { status , msg , from, clientKeys } = msgObj.payload

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
            console.log("Fetch Clients Results = ",result.connectedClients)
            setonlineClients(result.connectedClients)
          })
          Alert.success(msgObj.payload.message, 2000)
        }else{
          Alert.error("Couldn't Connect To Chat", 2000)
        }
        break;
      case "INCOMING":
        var {message: incomingMessage} = msgObj.payload
        setmessages([...messages, incomingMessage])
        break;
    }
  }

  const HandleMsgChange = (val) => {
    setmessage(val)
  }

  const SendMessage = () => {
    webSocket.current.send(JSON.stringify({ action: "SEND", payload: { from: user.id, to: {activeClient}, message: message} }))    //why jason ?
    setmessages([...messages, message])
    setmessage("")
    console.log("Messages Are = ",messages)
  }

  const SelectClient = (row) => {
    setactiveClient(row.id)
    setactiveClientToShow(row.name)
  }
  
  return(
    <Content className="app-content-chat">

      <div className="chat-container">
        <div>{messages.map((msg, i) => <div key={i} className="msg-div">{msg}</div>)}</div>
        <div className="Action-sec">
          <Input id="chat-inp" type="text" value={message} onChange={HandleMsgChange}/>
          <Button id="chat-send-btn" appearance="ghost" onClick={SendMessage}>Send</Button>
        </div>
      </div>

      <div className="contacts-list">

        <div className="chosen-client">{activeClientToShow}</div>

        <div>
          <Table data={onlineClients} className="contacts-table" height={100} onRowClick={SelectClient}>
            <Column>
              <HeaderCell>ID</HeaderCell>
              <Cell dataKey="id"></Cell>
            </Column>

            <Column>
              <HeaderCell>Contacts</HeaderCell>
              <Cell dataKey="name"></Cell>
            </Column>
          </Table>
        </div>
        
      </div>
    </Content>
  )
}

export default ChatComp;