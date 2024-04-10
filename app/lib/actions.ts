import { revalidatePath } from "next/cache"
import { User } from "./models"
import { connectToDB } from "./utils"
import { redirect } from "next/navigation"

export const addUser = async (formData: FormData) => {
  'use server'
  const {username, email, password, phone, address, isAdmin, isActive} = Object.fromEntries(formData)
  
  try {
    connectToDB()
    const newUser = new User({
      username, email, password, phone, address, isAdmin, isActive
    })

    await newUser.save()
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create user!')
  } finally {
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
  }
}