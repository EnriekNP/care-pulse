"use server";
import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("Creating a new user with email:", user.email);
    console.log(process.env.NEXT_PUBLIC_ENDPOINT);
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log("new User :", newUser);
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
    console.log("endpoint : ", process.env.ENDPOINT);
    console.log("process env ", process.env);
  }
};
