"use server";

import { createClient } from "@/libs/supabase/server";
import { TSpace } from "@/types";
import { currentUser } from "@clerk/nextjs/server";

export const createSpace = async (newSpace: TSpace) => {
  const user = await currentUser();

  try {
    if (user?.primaryEmailAddress?.emailAddress === "lnkhoa1205@gmail.com") {
      const supabase = await createClient();
      const { error } = await supabase.from("spaces").insert(newSpace);

      if (!error) {
        return {
          status: 200,
          message: "success",
        };
      } else {
        return {
          status: 500,
          message: "error",
        };
      }
    } else {
      return {
        status: 403,
        message: "forbidden",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: "error",
    };
  }
};

export const getSpaces = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("spaces")
      .select("*")
      .order("view", { ascending: false });

    if (!error) {
      return {
        status: 200,
        data,
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

export const viewSpace = async (id: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("increment", { x: 1, row_id: id });

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
