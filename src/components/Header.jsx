import React, { useState } from "react";
import { Header, IconButton, Icon } from "rsuite";

const secret_pass = "dasdajsdgjashdgas";

function HeaderComponent({ number, addOne }) {
  return (
    <Header className="app-header">
      <span className="header-title">
        <h1>Number is AROUND: {number}</h1>
      </span>
      <span className="header-icon">
        <IconButton icon={<Icon icon="bars" />} onClick={addOne} />
      </span>
    </Header>
  );
}

export default HeaderComponent;
