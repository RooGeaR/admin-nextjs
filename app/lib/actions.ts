'use server'

import { revalidatePath } from "next/cache"
import { Product, User } from "./models"
import { connectToDB } from "./utils"
import { redirect } from "next/navigation"
import bcrypt from 'bcrypt'
import { signIn } from "../auth"
import { AuthError } from "next-auth";

export const addUser = async (formData: FormData) => {
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

export const addProduct = async (formData: FormData) => {
  const { title, desc, price, stock, color, size } = Object.fromEntries(formData)
  
  try {
    connectToDB()

    const newProduct = new Product({
      title, desc, price, stock, color, size
    })

    await newProduct.save()
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create product!')
  } finally {
    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
  }
}

export const deleteUser = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData)
  
  try {
    connectToDB()
    await User.findByIdAndDelete(id)
  } catch (error) {
    console.log(error)
    throw new Error('Failed to delete user!')
  } finally {
    revalidatePath("/dashboard/users")
  }
}

export const deleteProduct = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData)
  
  try {
    connectToDB()
    await Product.findByIdAndDelete(id)
  } catch (error) {
    console.log(error)
    throw new Error('Failed to delete product!')
  } finally {
    revalidatePath("/dashboard/products")
  }
}

export const updateUser = async (formData: FormData) => {
  const {id, username, email, password, phone, address, isAdmin, isActive} = Object.fromEntries(formData)
  
  try {
    connectToDB()

    const updateFields = {
      username, email, password, phone, address, isAdmin, isActive
    }
    Object.keys(updateFields).forEach(
      (key: string) => 
        (updateFields[key as keyof typeof updateFields] === "" || updateFields[key as keyof typeof updateFields] === undefined) && delete updateFields[key as keyof typeof updateFields]
    )
    await User.findByIdAndUpdate(id, updateFields)
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update user!')
  } finally {
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
  }
}

export const updateProduct = async (formData: FormData) => {
  const {id, title, desc, price, stock, color, size} = Object.fromEntries(formData)
  
  try {
    connectToDB()

    const updateFields = {
      title, desc, price, stock, color, size
    }
    Object.keys(updateFields).forEach(
      (key: string) => 
        (updateFields[key as keyof typeof updateFields] === "" || updateFields[key as keyof typeof updateFields] === undefined) && delete updateFields[key as keyof typeof updateFields]
    )
    await Product.findByIdAndUpdate(id, updateFields)
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update product!')
  } finally {
    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
  }
}

export const authenticate = async (prevState: string | undefined | null, formData: FormData) => {
  const { username, password } = Object.fromEntries(formData)

  try {
    await signIn('credentials', { username, password })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}