import WaypointLogo from '../../assets/waypoint_logo.png';
import Controls from './controls';

const Titlebar = () => {
  return (
    <div id="titlebar">
      <img src={WaypointLogo} alt="Waypoint Logo" />
      <Controls />
    </div>
  )
};

export default Titlebar;