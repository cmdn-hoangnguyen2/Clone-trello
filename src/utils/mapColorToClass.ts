import { COLOR } from "../constants/color";

export const mapColorToClass = (color: COLOR) => {
  const backgroundClass: Record<COLOR, string> = {
    [COLOR.DEFAULT]: "bg-white",
    [COLOR.DANGER]: "bg-red-400",
  };

  const textClass = color === COLOR.DEFAULT ? "text-black" : "text-white";

  return `${backgroundClass[color] ?? "bg-white"} ${textClass ?? "text-black"}`;
};
