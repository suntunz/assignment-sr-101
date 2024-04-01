import React from "react";
import { DataListStyled } from "./DataList.styled";

export interface IDataList {
  value: string;
  textColor?: string;
}

const DataList = ({ value, textColor = "#000000" }: IDataList) => {
  return <DataListStyled $color={textColor}>{value}</DataListStyled>;
};

export default React.memo(DataList);
