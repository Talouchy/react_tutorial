import React, { useState } from "react";
import { Button, Input, InputGroup, Content, Icon, Checkbox, Alert, DatePicker } from "rsuite";

function AddBookComp({logedInUser}){

    const [loading, setloading] = useState(false);
    const [name, setname] = useState("");
    const [pubDate, setpubDate] = useState("");
    const [price, setprice] = useState("");
    const [addedBooks, setaddedBooks] = useState(1)
  
    const HandlePubDateChange = (value) => {
        setpubDate(value);
      console.log(pubDate);
    }
  
    const HandlepriceChange = (value) => {
      setprice(value);
      console.log(price);
    }
  
    const HandleNameChange = (value) => {
      setname(value);
      console.log(name);
    }

    const AddBook = () => {
        const url = "http://localhost:4000/addbook"
        setloading(true);

        fetch(url,{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
              Name: name,
              Date: pubDate,
              Price: price,
              Author: logedInUser.name,
              Books: addedBooks,
              LoggedInUserID : logedInUser.id
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            setloading(false);
            setaddedBooks(addedBooks + 1);
            Alert.success("Book Added !")
            console.log("results are : ",result)
            console.log("added Books : ", addedBooks)
        })
        .catch((error) => {
            console.log("errors are : ",error)
        })
    }

    return(
      <Content className="app-content">
        <Content className="form-signup">
          <div className="signup-left-div">
            <div className="left-top-div-BookComp">
              <h1 className="sign-up-title">Add Books</h1>
              <InputGroup inside>
                <InputGroup.Addon>
                  <Icon icon="book2" />
                </InputGroup.Addon>
                <Input
                  className="credentials-signin"
                  type="name"
                  placeholder="Book Name"
                  disabled={loading}
                  onChange={HandleNameChange}
                />
              </InputGroup>
    
              <InputGroup inside>
                <InputGroup.Addon>
                  {/* <Icon icon="calendar-o" /> */}
                </InputGroup.Addon>
                <DatePicker oneTap
                 style={{ width: 285 }}
                 className="credentials-signin" 
                 appearance="subtle"
                 placeholder="Published Date"
                 disabled={loading}
                 onChange={HandlePubDateChange}
                 />
                  {/* <Input
                  className="credentials-signin"
                  type="number"
                  placeholder="Published Date"
                  disabled={loading}
                  onChange={HandlePubDateChange}
                /> */}
              </InputGroup>
    
              <InputGroup inside>
                <InputGroup.Addon>
                  <Icon icon="money" />
                </InputGroup.Addon>
                <Input
                  className="credentials-signin"
                  type="number"
                  placeholder="Price"
                  onChange={HandlepriceChange}
                  disabled={loading}
                />
              </InputGroup>
            </div>
    
            <div className="left-bottom-div">
              <Checkbox>
                I agree all statements in{" "}
                <a className="link-to-signin" href="/terms">
                  Terms of service
                </a>
              </Checkbox>
              <Button
                style={{ color: "white" }}
                className="sign-up-btn"
                onClick={AddBook}
                loading={loading}
              >
                {loading === true ? "Loading..." : "Submit"}
              </Button>
            </div>
          </div>
    
          <div className="right-div-BookComp">
            <img
              src="\AddBookPic.jpg"
              alt="Add Book Logo"
              height="280px"
              width="314px"
            />
          </div>
        </Content>
      </Content>
        
    )
}
export default AddBookComp;