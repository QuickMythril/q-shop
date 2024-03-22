import { IconTypes } from "./IconTypes";

export const LTCSVG: React.FC<IconTypes> = ({ color, height, width }) => {
  return (
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.6 82.6" style={{ width, height }}><title>litecoin-ltc-logo</title><circle cx="41.3" cy="41.3" r="36.83"/><path fill={color} d="M41.3,0A41.3,41.3,0,1,0,82.6,41.3h0A41.18,41.18,0,0,0,41.54,0ZM42,42.7,37.7,57.2h23a1.16,1.16,0,0,1,1.2,1.12v.38l-2,6.9a1.49,1.49,0,0,1-1.5,1.1H23.2l5.9-20.1-6.6,2L24,44l6.6-2,8.3-28.2a1.51,1.51,0,0,1,1.5-1.1h8.9a1.16,1.16,0,0,1,1.2,1.12v.38L43.5,38l6.6-2-1.4,4.8Z"/>
</svg>
  );
};
