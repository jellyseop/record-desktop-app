export const getRecords = (ipcRenderer, getRecordsInput) => {
  const { year, month, date } = getRecordsInput;

  let getRecordsOutput;
  ipcRenderer.send("record:read", { year, month, date });
  ipcRenderer.on("record:readed", (_, result) => {
    getRecordsOutput = result;
  });

  return getRecordsOutput;
};

export const updateRecords = (ipcRenderer, updateRecordsInput) => {
  console.log("method called");
  const { year, month, date, selected } = updateRecordsInput;
  let updateRecordsOutput;
  ipcRenderer.send("record:update", {
    year,
    month,
    date,
    selected,
  });
  ipcRenderer.on("record:updated", (_, result) => {
    updateRecordsOutput = result;
  });
  return updateRecordsOutput;
};
