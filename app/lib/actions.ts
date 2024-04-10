import { revalidatePath } from "next/cache"
import { User } from "./models"
import { connectToDB } from "./utils"
import { redirect } from "next/navigation"
import bcrypt from 'bcrypt'

export const addUser = async (formData: FormData) => {
  'use server'
  const {username, email, password, phone, address, isAdmin, isActive} = Object.fromEntries(formData)
  
  try {
    connectToDB()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password as string, salt)
    const newUser = new User({
      username, email, password: hashedPassword, phone, address, isAdmin, isActive
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