import React from "react";
import Button from "@mui/material/Button";
import { formatDate } from "../util";

const ButtonGroup = ({
  selected,
  setFetchedData,
  filter,
  date: globalDate,
}) => {
  const electronAPI = window.electronAPI;

  const onClick = async (event) => {
    const {
      target: { id },
    } = event;

    const { year, month, date } = formatDate(globalDate);
    let result;
    if (id === "update") {
      result = await electronAPI.invoke("record:update", {
        year,
        month,
        date,
        selected,
      });
    } else {
      result = await electronAPI.invoke("record:delete", {
        year,
        month,
        date,
        selected,
      });
    }
    if (!result.ok) return;

    const { ok, data, error } = await electronAPI.invoke("record:read", {
      year,
      month,
      date,
    });
    if (!ok) return;

    return setFetchedData(data);
  };
  return (
    <>
      <Button
        size="large"
        id="update"
        sx={{
          width: "100%",
          paddingY: "13px",
          fontSize: "17px",
          fontWeight: "bold",
          letterSpacing: "0.05em",
        }}
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={filter === "all"}
      >
        {filter === "used" && "인증번호 사용 취소"}
        {filter === "unused" && "인증번호 사용 "}
        {filter === "all" && "🚫"}
      </Button>
      <div className="button-divider" />
      <Button
        size="large"
        id="delete"
        sx={{
          width: "100%",
          paddingY: "13px",
          fontSize: "17px",
          fontWeight: "bold",
          letterSpacing: "0.05em",
        }}
        variant="contained"
        color="error"
        onClick={onClick}
        disabled={filter === "all" || filter === "used"}
      >
        {filter === "used" && "🚫"}
        {filter === "unused" && "방문자 삭제"}
        {filter === "all" && "🚫"}
      </Button>
    </>
  );
};

export default ButtonGroup;
