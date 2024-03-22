import { IconTypes } from "./IconTypes";

export const RVNSVG: React.FC<IconTypes> = ({ color, height, width }) => {
  return (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 205.3 338.8" style={{ width, height }}><path fill={color} d="M89 274.9L0 338.8l56.5-260zm1.8-.6l54.2.7L58.6 79.8zm59.3-4.3l41.5-153.8L175.9 97zm-20-241.1l-68.3 46 99.8-32.3zm-8.6 0l-42.4 1.4L72.9 48z"/><path fill={color} d="M172.9 91.1l-109.3-15 98.5-31zM147 33.3l6-16.3-31.5-13.7zm9.1-17.9l7.1 25.6 42-11.1z"/><path fill={color} d="M147.4 274L59.8 78 174 94zM126.8 28.9L72.8 50l-13 24zm-33.5-16L79.8 27.8l44.8-1.1zm23.6-11.6l-21.4 9.9 48.8 21.5zM141.3 0h-23l35.6 13.8zm13.3 18.3l-5.5 16.4 11 5.3z"/></svg>
  );
};
