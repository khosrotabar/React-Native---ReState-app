import { HtmlHTMLAttributes } from "react";

export type IconProps = HtmlHTMLAttributes<SVGElement> & {
  color?: string;
  width: number;
  height: number;
};
