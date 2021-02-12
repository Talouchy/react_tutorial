import React, { useEffect, useRef, useState, useReducer } from "react";
import { act } from "react-dom/test-utils";
import { Content, IconButton, Input, Alert, Icon, Avatar, Badge } from "rsuite";
import "./Chat.css"

const ParseJson = (string) => {
  let result = {};
  try {
    result = JSON.parse(string);
  } catch (error) {
    result = {error};
  }
  return result;
}

const initialMessagesVal = [];

const messagesReducer = (filteredMessages, action) => {
  var newMessages = action.message

  switch(action.type){

    case "InsertMSG":
      return [...filteredMessages, action.message];

    case "ClearMSGS":
      return [];

    default:
      return filteredMessages;

  }
}

function MsgElement({messages, logedInUser, activeClient}){
  return messages.map((msg,i) => {
    if(msg.sender === logedInUser.id){
      return <div key={i} className="right">{msg.text}</div>
    }
    else if(msg.sender === activeClient.id){
      return <div key={i} className="left">{msg.text}</div>
    }
  })
}

function ChatComp({logedInUser: user}) {

  const [message, setmessage] = useState("");
  const [filteredMessages, dispatch] = useReducer(messagesReducer, initialMessagesVal);
  const [onlineClients, setonlineClients] = useState([]);
  const [activeClient, setactiveClient] = useState({});
  const [showDrawer, setshowDrawer] = useState(true)
  const [toggleScale, settoggleScale] = useState(false)
  const [showName, setshowName] = useState(false)
  const ClientsAreOnline = onlineClients.length > 1;
  const HaveActiveClient = Object.keys(activeClient).length > 0;

  var webSocket = useRef(null);

  useEffect(() => {
    setshowDrawer(false)

    webSocket.current = new WebSocket("ws://localhost:8080");
    webSocket.current.onopen = onOpen; 
    webSocket.current.onmessage = onMessage;
    webSocket.current.onerror = onError;
    webSocket.current.onclose = onClose;

    return () => {
      webSocket.current.close();   //what does this do ?
    }

  },[])

  useEffect(() => {
    console.log("Mounted Again | Messages Updated")
  },[filteredMessages])

  const onError = (error) => {
    console.error("WebSocket Error = ",error)
  }

  const onOpen = () => {
    webSocket.current.send(JSON.stringify({ action: "INIT", payload: { id: user.id }}))
  }

  const onClose = () => {
    console.log("Chat Comp Closed")
  }

  const onMessage = (message) => {
    
    var msgObj = ParseJson(message.data);

    switch(msgObj.action){

      case "INIT":
        if(!msgObj.payload.status){
          Alert.error("Couldn't Connect To Chat", 2000)
        }
        break;
        
      case "INCOMING":
        var {message, sender, receiver} = msgObj.payload
        dispatch({ type: "InsertMSG", message: msgObj.payload })
        break;
      
      case "CONNECTED_CLIENTS":
        var { connectedClients } = msgObj.payload;
        setonlineClients([...connectedClients])
        break; 

      case "ERROR":
        var { errorMessage } = msgObj.payload
        console.warn(`error: ${errorMessage}`)
        break;

      default:
        console.warn(`action ${msgObj.action} not supported`)
        break;
    }
  }

  const HandleMsgChange = (val) => {
    setmessage(val)
  }

  const ToggleShowName = () => {
    setshowName(!showName)
  }

  const ToggleSpanScale = () => {
    settoggleScale(!toggleScale)
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
        var filteredMsgs = (msgs.filter((msg) => {
          if(msg.sender === client.id || msg.sender === user.id || msg.receiver === client.id || msg.receiver === user.id ){
            return msg
          }
        }))
        dispatch({type: "InsertMSG", message: filteredMsgs})
      }else if(result.error){
        console.log("Fetch Messages Error = ",result.error)
      }
    })
  }

  const RenderOnlineClients = () => {
    return(
      onlineClients.map(client => {
        if(client.id !== user.id){
          return (
              <div className="onlineclient-item" key={`user_${client.id}`} id={`user_${client.id}`} onClick={() => OpenChat(client)}>
                <Avatar className="avatar" circle>{client.name.substring(0, 1).toUpperCase()}</Avatar>
                <span className="avatar-client-name" style={{marginLeft: "5px"}}>{client.name}</span>
              </div>
          )
        }
      })
    )
  }

  const RenderActiveClientAvatar = () => {
    return(
      <div id="avatar-selected-client">
      <Avatar className="avatar" circle>{ Object.keys(activeClient).length && activeClient.name ? activeClient.name.substring(0, 1).toUpperCase() : null}</Avatar>
      <span className="avatar-client-name" style={{marginLeft: "5px" ,color: "white"}}>{activeClient.name}</span>
    </div>
    )
  }

  return(
    <Content className="app-content-chat">

      <div className="chat-main-div">

        <div className="chat-left-div" style={!showDrawer ? {transition: "4.2s all", borderTopRightRadius: "8px"} : {transition: "2s all", borderTopRightRadius: "8px"}}>
          <div className="selected-client" style={showDrawer ? {transition: "1s all", borderTopRightRadius: "0px" , borderRight: "0px"} : {transition: "1s all", borderTopRightRadius: "8px", borderRight: "1px"}}>
            {HaveActiveClient ? RenderActiveClientAvatar() : null}
          </div>
          

          {Object.keys(activeClient).length <= 0 ? 
          <div className="choose-friend-div" onMouseEnter={ToggleSpanScale} onMouseLeave={ToggleSpanScale} style={!showDrawer ? {transition: "4.2s all", borderBottomRightRadius: "8px", borderRight: "0px"} : {transition: "2s all", borderBottomRightRadius: "0px", borderRight: "1px solid #868282"}}>
            <span style={toggleScale ? {transition: "1s all", transform: "scale(1.5)"} : {transition: "1s all", transform: "scale(1)"}}>Pick a Friend And Start Chatting</span>
            </div>
             : <>
            <div className="msg-sec" style={showDrawer ? {transition: "1s all", borderBottomRightRadius:"0px", zIndex: 1} : {transition: "1s all", borderBottomRightRadius:"8px", zIndex: 1}}>
              <div className="text-sec"><MsgElement messages={filteredMessages} logedInUser={user} activeClient={activeClient} /></div>
              <div className="Action-sec" style={!showDrawer ? {transition: "4.2s all", borderBottomRightRadius: "8px"} : {transition: "2s all", borderBottomRightRadius: "0px"}}>
                <Input id="chat-inp" type="text" value={message} placeholder="Message" onChange={HandleMsgChange}/>
                <IconButton id="chat-send-btn" icon={<Icon icon="send"/>} onClick={SendMessage}/>
              </div>
            </div>
          </>}
        </div>

        <div className="chat-right-div" style={showDrawer ? {} : {transform: "translate(-165px, 0px)", zIndex: 0}}>
          <Badge className="chat-right-div-badge" content={<IconButton circle size="xs" icon={<Icon icon={showDrawer ? "close" : "bars"}/>} onClick={() => setshowDrawer(!showDrawer)}/>}>
            <div className="loged-in-user" onMouseEnter={ToggleShowName} onMouseLeave={ToggleShowName}>{
              <div id="avatar-loged-in-user">
                <Avatar className="avatar-loged-in-user" circle>{user.name.substring(0, 1).toUpperCase()}</Avatar>
                <span className="avatar-client-name" style={{marginLeft: "5px" ,color: "white"}}>{!showName ? "ME" : user.name}</span>
              </div>
            }</div>
            
            <div className={ClientsAreOnline ? "clients-list" : "empty-clients-list" }>
              {!ClientsAreOnline ? <div className="no-one-online-div">No One Is Online</div> : RenderOnlineClients()}
            </div> 
          </Badge>
        </div>
        
      </div>
    </Content>
  )
}

export default ChatComp;