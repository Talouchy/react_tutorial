import React from "react";
import "./Footer.css";

function FooterComp() {
  return (
    <div className="app-footer">
      <div>
        <a className="Footer-txt-clr" href="/aboutus">
          About Us
        </a>
      </div>
      <div>
        <a className="Footer-txt-clr" href="/github">
          Git Link
        </a>
      </div>
      <div>
        <a className="Footer-txt-clr" href="contactus">
          Contact Us
        </a>
      </div>
    </div>
  );
}

export default FooterComp;
