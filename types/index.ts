import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TEvent = {
  id: string,
  title: string,
  start: string,
  end: string,
  description: string,
  color: string,
}
