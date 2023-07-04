# todo

- backend
  [o] 저장 -> by month and date
  [o] --preload: initApp()
  [o] dynamic calling
  [] default main processes
  [] ipcMain.on()
  `

  - [] record:create
  - [] record:read
  - [] record:update
  - [] record:delete

- frontend
  [] 이식
  [] loading component
  [] form:phone -> format && default
  [] click-cell -> copy

  [] ipcRenderer.on()

  - [] record:created
  - [] record:readed
  - [] record:updated
  - [] record:deleted

  [] ipcRenderer.send()

  - [] record:create
  - [] record:read
  - [] record:update
  - [] record:delete

# model

**_record_**
id
date
visitedAt
name
phone
code
memo
isValid: boolean

**_service functions_**

getByDate: (date) => [record]
createRecord: (form_input) => bool
deleteRecord: (date, id) => bool
toogleIsValid: (date, id) => bool
