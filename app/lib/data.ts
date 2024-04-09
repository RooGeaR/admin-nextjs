import { User } from "./models"
import { connectToDB } from "./utils";

export const fetchUsers = async (q : string, page: number) => {
  const regex = new RegExp(q, 'i')
  const ITEMS_PER_PAGE = 2

  try {
    connectToDB()
    const count = await User.countDocuments({ username: { $regex: regex} })
    const users = await User.find({ username: { $regex: regex} }).limit(ITEMS_PER_PAGE).skip(ITEMS_PER_PAGE * (page-1));
    return { count, users }
  } catch (error) {
    throw new Error("Failed to fetch users!")
  }  
}