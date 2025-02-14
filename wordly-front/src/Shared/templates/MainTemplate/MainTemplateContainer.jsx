import React from "react";
import MainTemplate from "./MainTemplate";

const MainTemplateContainer = ({ children, className }) => {
  return <MainTemplate className={className}>{children}</MainTemplate>;
};

export default MainTemplateContainer;
