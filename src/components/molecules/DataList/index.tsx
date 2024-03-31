import React from "react";

export interface IDataList {
  value: string;
  textColor?: string;
}

const DataList = ({ value, textColor }: IDataList) => {
  return <td style={{ textAlign: "right", color: textColor }}>{value}</td>;
};

export default React.memo(DataList);
