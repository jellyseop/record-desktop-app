import dayjs from "dayjs";
import db from "./db.js";

console.log("hello world!");

const formatDate = (dateObj) => {
  const year = dateObj.year().toString();
  const month = (dateObj.month() + 1).toString();
  const date = dateObj.date().toString();

  return { year, month, date };
};

export const initApp = () => {
  const now = dayjs();
  const { year, month, date } = formatDate(now);

  db.read();
  const { records } = db.data;

  if (records[year] === undefined) {
    records[year] = {};
    db.write();
  }
  if (records[year][month] === undefined) {
    records[year][month] = {};
    db.write();
  }
  if (records[year][month][date] === undefined) {
    records[year][month][date] = [];
    db.write();
  }

  const data = records[year][month][date];
  return data;
};

const getByDate = (dateObj) => {
  try {
    const { year, month, date } = formatDate(dateObj);

    db.read();
    const { records } = db.data;

    //error-handler
    let data = records[year]?.[month]?.[date];

    if (!data) {
      data = [];
    }
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: "데이터를 가져올 수 없습니다." };
  }
};

const createRecord = (formInput) => {
  try {
    const { name, phone, code, memo } = formInput;

    const now = dayjs();
    const { year, month, date } = formatDate(now);
    const hour = now.format("HH").toString();
    const minute = now.format("mm").toString();
    const mili = now.format("sss").toString();

    const newRecord = {
      id: hour + minute + mili, // unique number
      name,
      phone,
      code,
      memo,
      isValid: true,
      visitedAt: `${hour}:${minute}`,
    };
    db.read();
    const { records } = db.data;

    records[year][month][date].push(newRecord);
    db.write();

    return { ok: true };
  } catch (error) {
    return { ok: false, error: "데이터를 생성 할 수 없습니다." };
  }
};

const deleteRecord = (dateObj, id) => {
  try {
    const { year, month, date } = formatDate(dateObj);

    db.read();
    let { records } = db.data;

    const deletedRecords = records[year][month][date].filter(
      (record) => record.id !== id
    );
    console.log(deletedRecords);
    records[year][month][date] = deletedRecords;
    db.write();

    return { ok: true };
  } catch (error) {
    console.log("deleteRecord error :>> ", error);
    return { ok: false, error: "데이터를 삭제 할 수 없습니다." };
  }
};

const toggleIsValidById = (dateObj, id) => {
  try {
    const { year, month, date } = formatDate(dateObj);

    db.read();
    const { records } = db.data;

    const record = records[year][month][date].find(
      (record) => record.id === id
    );

    if (!record) {
      return { ok: false, error: "해당 데이터를 찾을 수 없습니다." };
    }
    record.isValid = !record.isValid;
    db.write();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: "코드 사용을 처리 할 수 없습니다." };
  }
};
