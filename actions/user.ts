/* eslint-disable no-console */
"use server";

import { createClient } from "@/libs/supabase/server";
import {
  getCurrentDate,
  getObjectOfCurrentWeek,
  getStartOfCurrentWeek,
  isYesterday,
} from "@/libs/utils";
import { TSpace } from "@/types";
import { currentUser } from "@clerk/nextjs/server";

export const upgradeAccount = async () => {
  try {
    const user = await currentUser();
    const supabase = await createClient();

    const { error, data } = await supabase.from("user").insert({
      id: user?.id,
      name: user?.fullName,
      avatar: user?.imageUrl,
      weeklyOnlineTime: getObjectOfCurrentWeek(),
      currentWeekStart: getStartOfCurrentWeek(),
      streakCount: 1,
      hoursOnApp: 0,
      longestStreak: 1,
      lastActiveDate: getCurrentDate(),
      spacesFavorite: [],
    });

    if (error) {

      return {
        status: 500,
        message: error.message,
        data: null,
      };
    }

    if (data !== null) {
      return {
        status: 200,
        message: "success",
        data: data[0],
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error,
      data: null,
    };
  }
};

export const getAccount = async () => {
  try {
    const user = await currentUser();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", user?.id);

    if (error) {
      // Print: the error message
      return {
        status: 500,
        message: error.message,
        data: null,
      };
    }

    return {
      status: 200,
      message: "success",
      data: data,
    };
  } catch (error) {
    return {
      status: 500,
      message: error,
      data: null,
    };
  }
};

export const favoriteSpace = async (list: TSpace[]) => {
  try {
    const user = await currentUser();
    const supabase = await createClient();

    const { error } = await supabase
      .from("user")
      .update({ spacesFavorite: list })
      .eq("id", user?.id);

    if (error) {
      // Print: the error message
      return {
        status: 500,
        message: error.message,
      };
    }

    return {
      status: 200,
      message: "success",
    };
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};

export const setSteakCount = async (date: string, count: number) => {
  try {
    const user = await currentUser();
    const supabase = await createClient();

    const isStreak = isYesterday(date);

    if (isStreak && date !== getCurrentDate()) {
      const {data, error } = await supabase
        .from("user")
        .update({ streakCount: count+1, longestStreak: count+1, lastActiveDate: getCurrentDate() })
        .eq("id", user?.id);

      if (error) {
        // Print: the error message
        return {
          status: 500,
          message: error.message,
        };
      }

      return {
        status: 200,
        message: "success",
        data
      };
    } else if (date !== getCurrentDate()) {
      const { data,error } = await supabase
        .from("user")
        .update({ streakCount: 1, lastActiveDate: getCurrentDate() })
        .eq("id", user?.id);

      if (error) {
        // Print: the error message
        return {
          status: 500,
          message: error.message,
        };
      }

      return {
        status: 200,
        message: "success",
        data
      };
    }

  } catch (error) {
    return {
      status: 500,
      message: error,
      data: null,
    };
  }
};
