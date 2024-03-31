import React from "react";
import { LikedListWrapper } from "./LikedList.styled";

export interface ILikedListProps {
  tokens: string[];
}

const LikedList = ({ tokens }: ILikedListProps) => {
  return (
    <LikedListWrapper style={{ padding: 8 }}>
      <div style={{ marginBottom: 16 }}>
        <strong>Your liked TOKENs !!</strong>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {tokens.map((t) => (
          <div key={t}>{t}</div>
        ))}
      </div>
    </LikedListWrapper>
  );
};

export default React.memo(LikedList);
