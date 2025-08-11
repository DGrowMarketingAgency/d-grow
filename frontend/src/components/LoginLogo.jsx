import React from "react";
import logo from "../../logo.png";

export default function LoginLogo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
      <img src={logo} alt="Logo" style={{ width: 80, height: 80, marginBottom: 8 }} />
    </div>
  );
}
