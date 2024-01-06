import React from "react";
import DrawerContentSection from "./DrawerContentSection";
import DrawerSideSection from "./DrawerSideSection";

const DrawerSection = (props) => {
  return (
    <div className="flex justify-start w-full">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <DrawerContentSection {...props} />
        <DrawerSideSection handleCategoryChange={props.handleCategoryChange} />
      </div>
    </div>
  );
};

export default DrawerSection;
