import React from "react";

export const CustomeScrollBar = (props) => {
  const GlobalScrollbarStyles = (backgroundColor) => (
    <GlobalStyles
      styles={{
        "*::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "*::-webkit-scrollbar-track": {
          background: backgroundColor,
        },
        "*::-webkit-scrollbar-thumb": {
          background: backgroundColor,
          borderRadius: "4px",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background: backgroundColor,
        },
      }}
    />
  );
  return <GlobalScrollbarStyles backgroundColor="#f1f1f1" />;
};
