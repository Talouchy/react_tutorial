import React from "react";
import { Header, IconButton, Icon } from "rsuite";

function HeaderComp() {
  return (
    <Header className="app-header">
      <div className="header-title">JavaScript 101</div>
      <div className="header-icon">
        <IconButton size="sm" icon={<Icon icon="bars" />} />
      </div>
    </Header>
  );
}

export default HeaderComp;
