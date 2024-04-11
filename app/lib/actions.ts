'use server'

import { revalidatePath } from "next/cache"
import { Product, User } from "./models"
import { connectToDB } from "./utils"
import { redirect } from "next/navigation"
import bcrypt from 'bcrypt'

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