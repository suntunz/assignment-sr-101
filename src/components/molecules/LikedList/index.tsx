import React from "react";
import { LikedListWrapper } from "./LikedList.styled";
import Card from "components/atoms/Card";
import Text from "components/atoms/Text";

export interface ILikedListProps {
  tokens: string[];
}

const LikedList = ({ tokens = [] }: ILikedListProps) => {
  return (
    <LikedListWrapper>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <strong>
            <Text text="Your liked TOKENs !!" color="#414342" />
          </strong>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tokens?.length > 0 ? tokens.map((t) => <div key={t}>{t}</div>) : "-"}
        </div>
      </Card>
    </LikedListWrapper>
  );
};

export default React.memo(LikedList);
