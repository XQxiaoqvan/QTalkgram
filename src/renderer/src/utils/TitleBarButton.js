export const windowControls = {
  minimize() {
    ipcRenderer.send('minimize-window')
  },
  maximize() {
    ipcRenderer.send('maximize-window')
  },
  close() {
    ipcRenderer.send('close-window')
  }
}
export default windowControls
