import React, { useState, useEffect } from "react";
import { Container, Header, Content, Footer, IconButton, Icon } from "rsuite";


function SingUpComp({toggleForm}) {

    return(
        <h3 onClick={toggleForm}>Login Page</h3>
    );

}

export default SingUpComp;