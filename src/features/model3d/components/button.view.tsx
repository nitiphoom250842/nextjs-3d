import React from "react";

interface PropsButton {
  onClick?: (e: any) => void;
  text?: string;
  disabled?: boolean;
}

export function ButtonView(props: PropsButton) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className="bg-green-300 rounded-[8px] px-4 py-2"
    >
      {props.text}
    </button>
  );
}

export default ButtonView;
