import { contextBridge as s, ipcRenderer as i } from "electron";
s.exposeInMainWorld("electronAPI", {
  windowControls: {
    minimize: () => i.send("minimize-window"),
    maximize: () => i.send("maximize-window"),
    close: () => i.send("close-window")
  },
  send: (e, n) => {
    ["app_version"].includes(e) && i.send(e, n);
  },
  receive: (e, n) => {
    ["app_version", "update_available", "update_downloaded"].includes(e) && i.on(e, (l, ...o) => n(...o));
  }
});
console.log("Preload script loaded");
