"use server";

import { createClient } from "@/libs/supabase/server";
import { TEvent } from "@/types";
import { currentUser } from "@clerk/nextjs/server";


export const createEvent = async (newEvent: TEvent) => {

  try {
    const user = await currentUser();
    const supabase = await createClient();
    
    const res = await supabase.from("event").insert({
      ...newEvent,
      user_id: user?.id,
      date: newEvent.start.slice(0, 10),
    });

    if (!res.error) {
      return {
        status: 200,
        message: "success",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: "error",
    };
  }
};

export const getEvents = async (date:string) => {
  try {
    const user = await currentUser();
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("event")
      .select("*")
      .eq("user_id", user?.id)
      .eq("date", date.slice(0, 10));
      
    if (!error) {
      return {
        status: 200,
        data,
        message: "success",
      };
    }


  } catch (error) {

    return {
      status: 500,
      message: "error",
      data: [],
    };
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const user = await currentUser();
    const supabase = await createClient();
    const { error } = await supabase.from("event").delete().eq("id", id).eq("user_id", user?.id);
    
    if (!error) {
      return {
        status: 200,
        message: "success",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: "error",
    };
  }
};
