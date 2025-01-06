import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("electronAPI", {
  windowControls: {
    minimize: () => ipcRenderer.send("minimize-window"),
    maximize: () => ipcRenderer.send("maximize-window"),
    close: () => ipcRenderer.send("close-window")
  },
  send: (channel, data) => {
    const validChannels = ["app_version"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, callback) => {
    const validChannels = ["app_version", "update_available", "update_downloaded"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  }
});
console.log("Preload script loaded");