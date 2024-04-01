import styled from "styled-components";

export const TokenTableWrapper = styled.div`
  margin: 0 auto;
  padding: 0;
  max-width: 1400px;
  overflow: scroll;

  .table {
    width: 100%;
    display: table;
    background: #f5f6f8;
  }
  @media screen and (max-width: 640px) {
    .table {
      display: block;
    }
  }

  .row {
    display: table-row;
    background: #dee3e8;
  }

  .row.header {
    font-weight: 700;
    color: #ffffff;
    background: #414342;
    .cell:first-child {
      border-top-left-radius: 8px;
    }
    .cell:last-child {
      border-top-right-radius: 8px;
    }
  }
  @media screen and (max-width: 640px) {
    .row {
      padding: 14px 0 7px;
      display: block;
    }
    .row:nth-of-type(odd) {
      background: #c9d1d9;
    }
    .row.header {
      padding: 0;
      height: 6px;
    }
    .row.header .cell {
      display: none;
    }
    .row .cell {
      margin-bottom: 10px;
    }
    .row .cell:before {
      margin-bottom: 3px;
      content: attr(data-title);
      min-width: 98px;
      font-size: 10px;
      line-height: 10px;
      font-weight: bold;
      text-transform: uppercase;
      color: #969696;
      display: block;
    }
  }

  .cell {
    display: table-cell;
    height: 36px;
    padding: 8px 16px;
    vertical-align: middle;

    &.text-right {
      text-align: right;
    }
  }
  @media screen and (max-width: 640px) {
    .cell {
      padding: 2px 16px;
      display: block;
    }
  }
`;
