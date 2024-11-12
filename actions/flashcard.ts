"use server";
import { TFlashCard } from "@/components/flash-card/manageFlashCard";
import { createClient } from "@/libs/supabase/server";
import { currentUser } from "@clerk/nextjs/server";

export const createFlashcard = async (newFalshcard: TFlashCard) => {
    const user = await currentUser();
  
    try {
      if (user?.primaryEmailAddress?.emailAddress === "lnkhoa1205@gmail.com") {
        const supabase = await createClient();
        const { error } = await supabase.from("flashcard").insert(newFalshcard);
  
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

export const getFlashcards = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("flashcard").select("*");
  
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

export const deleteFlashcard = async (id: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("flashcard").delete().eq("id", id);
  
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