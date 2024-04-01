import React from "react";
import { CardWrapper } from "./Card.styled";

interface ICardProps {
  children: React.ReactNode;
}

const Card = ({ children }: ICardProps) => {
  return <CardWrapper>{children}</CardWrapper>;
};

export default React.memo(Card);
