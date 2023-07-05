import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { koKR } from "@mui/x-date-pickers/locales";
import "dayjs/locale/ko";
import { formatDate } from "../util";

const DateInput = ({ date, setDate, setFetchedData }) => {
  const electronAPI = window.electronAPI;

  const onChange = async (value) => {
    const { year, month, date } = formatDate(value);

    const { ok, data, error } = await electronAPI.invoke("record:read", {
      year,
      month,
      date,
    });
    if (ok) {
      setDate(value);
      setFetchedData(data);
    }
  };

  return (
    <>
      {date ? (
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="ko"
          localeText={koKR}
        >
          <DatePicker
            className="toogle"
            label="날짜 선택"
            format="YYYY-M-D"
            value={date}
            onChange={onChange}
            disableFuture
          />
        </LocalizationProvider>
      ) : (
        "Loading,,,"
      )}
    </>
  );
};

export default DateInput;
