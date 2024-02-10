import { Paper } from "@mui/material";
import React from "react";

function ContentLayout({ children }) {
  return (
    <div className="flex flex-col flex-auto mx-24 my-12 rounded-2xl shadow overflow-hidden">
      <Paper>{children}</Paper>
    </div>
  );
}

export default ContentLayout;
