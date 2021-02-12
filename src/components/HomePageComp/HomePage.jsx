import React from "react";
import { Container, Content, Carousel, Panel, PanelGroup } from "rsuite";
import "./HomePage.css";

function HomePageComp() {
  return(
    <Container className="homepage-container">
      <Content className="app-content-homepage">
        <div className="Top-div-homepage">
          <div className="Top-div-Right">
            <Carousel autoplay className="carousel" placement="bottom" shape="bar">
              <img
                src="/Book_1.jpg"
                alt="Not Found"
                height="100px"
                width="150px"
              />
              <img
                src="Book_2.jpg"
                alt="Not Found"
                height="100px"
                width="150px"
              />
              <img
                src="Book_3.jpg"
                alt="Not Found"
                height="100px"
                width="150px"
              />
            </Carousel>
          </div>

          <div className="Top-div-Left-h">
            <PanelGroup accordion defaultActiveKey={1}>
              <Panel shaded eventKey={1}>
                <h5 className="card-title">Quote of The Day :</h5>
                  <h6 className="Quotes">All that we see or seem is but a dream within a dream.</h6>
              </Panel>

              <Panel shaded eventKey={2} bordered>
                <h5 className="card-title">Shakespeare :</h5>
                  <h6 className="Quotes">Life ... is a tale Told by an idiot, full of sound and fury, Signifying nothing.</h6>   
              </Panel>

              <Panel shaded eventKey={3} bordered>
                <h5 className="card-title">The Great Puva DD :</h5>
                  <h6 className="Quotes">I Dont Have a Dirty Mind,I just Have a Sexy Imagination</h6>
              </Panel>
            </PanelGroup>
          </div>

        </div>

        <div className="Mid-div">
          <Panel className="panels" shaded>

            <div className="Mid-div-Top">
              <h4 className="card-title">"This Week's TOP Book"</h4>
            </div>

            <div className="Mid-div-bottom">
              <div className="profile-pic"> 
                <img
                  src="/Uknown.jpg"
                  alt="Profile-Pic"
                  height="180"
                  width="180"
                />
              </div>

              <div className="profile-credentials"> 
                <div>Name : </div>  
                <div>Pub-Date : </div>  
                <div>Price : </div>  
              </div>
            </div>
          </Panel>

          <Panel className="panels" shaded>

            <div className="Mid-div-Top">
              <h4 className="card-title">"This Week's TOP Author"</h4>
            </div>

            <div className="Mid-div-bottom">
              <div className="profile-pic"> 
                <img
                  src="/Uknown.jpg"
                  alt="Profile-Pic"
                  height="180"
                  width="150"
                /> 
              </div>

              <div> 
                <div className="profile-credentials"> 
                  <div>Name : </div>  
                  <div>Age : </div>  
                  <div>Active : </div>  
                </div>
              </div>
            </div>
            
          </Panel>

          <Panel className="panels-Two" shaded>

            <div className="Mid-div-Top">
              <h5 className="card-title">"Editors Choice"</h5>
            </div>

            <div className="EC-book">
              <img className="EC-img"
                src="/book_4.jpg"
                alt="Profile-Pic"
                height="180"
                width="150"
              /> 
              <a href="#Book" className="book-link" >Link To Book</a>
            </div>

          </Panel>
        </div>
        
        <div className="Bottom-div">
          Bottom Div
        {/* <PanelGroup accordion defaultActiveKey={1}>
            <Panel header="Dev #1" eventKey={1} style={{color:"red"}}>
              <div className="bottom-div-panels">
                <div>
                  <img 
                    src="/Uknown.jpg"
                    height="120"
                    width="120"
                  />
                </div>
                
                <div className="info-div">
                  <div><h3>Puva.DD</h3></div>
                  <div><h4>Mad Coding Skillz</h4></div>
                  <div><h5>Totaly Caried The Other Guy</h5></div>
                </div>
              </div>
              
            </Panel>

            <Panel header="Dev #2" eventKey={2} style={{color:"red"}}>
      
              <div className="bottom-div-panels">
                <div>
                  <img 
                    src="/Uknown.jpg"
                    height="120"
                    width="120"
                  />
                </div>
                
                <div className="info-div">
                  <div><h3>Talouchy</h3></div>
                  <div><h4>Whishes To Have The Other Guy's Mad Coding Skillz</h4></div>
                  <div><h5>Currently Learning</h5></div>
                </div>
              </div>
              
            </Panel>
          </PanelGroup> */}
        </div>
      </Content>
    </Container>
  )
}
export default HomePageComp;