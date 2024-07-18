import React from "react";

type Props = {
  children: React.ReactNode;
};

export function TextWithLineBreaks({ children }: Props) {
  const textWithBreaks = children
    ?.valueOf()
    .toString()
    .split("\n")
    .map((text, index) => (
      <React.Fragment key={index}>
        {text}
        <br />
      </React.Fragment>
    ));

  return <div>{textWithBreaks}</div>;
}
