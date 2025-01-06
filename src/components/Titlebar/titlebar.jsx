import WaypointLogo from '../../assets/waypoint_logo.png';
import Controls from './controls';
import packageJson from '../../../package.json';

const Titlebar = () => {
  return (
    <div id="titlebar">
      <div className="titlebar_left">
        <img src={WaypointLogo} alt="Waypoint Logo" />
        <div>BETA v{packageJson.version}</div>
      </div>
      <Controls />
    </div>
  )
};

export default Titlebar;