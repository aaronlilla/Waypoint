import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc";
import './controls.scss';

const Controls = () => {
  const handleMinimize = () => {
    window.electronAPI.windowControls.minimize();
  };

  const handleMaximize = () => {
    window.electronAPI.windowControls.maximize();
  };

  const handleClose = () => {
    window.electronAPI.windowControls.close();
  };

  return (
    <div className="controls">
      <div className="control_item hover_1" onClick={handleMinimize}>
        <VscChromeMinimize />
      </div>
      <div className="control_item hover_1" onClick={handleMaximize}>
        <VscChromeMaximize />
      </div>
      <div className="control_item hover_1" onClick={handleClose}>
        <VscChromeClose />
      </div>
    </div>
  );
};

export default Controls;