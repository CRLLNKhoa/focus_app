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

export type TSpace = {
  id?: string,
  title: string,
  key: string,
  view?: number,
  created_at?: any,
  link: string,
  src: string,
  image: string,
}

export type TAccount = {
  id?: string,
  name: string,
  avatar: string,
  weeklyOnlineTime: object,
  currentWeekStart: string,
  longestStreak: number,
  streakCount: number,
  hoursOnApp: number,
  lastActiveDate: string,
  spacesFavorite: TSpace[],
  created_at?: any,
}