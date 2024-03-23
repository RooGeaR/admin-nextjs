import React from 'react'
import styles from './menuLink.module.css'
import { Item } from '@/app/types/menuItem'
import Link from 'next/link';

const MenuLink = ({ item }: { item: Item}) => {
  return (
    <Link href={item.path} className={styles.container}>
      {item.icon}
      {item.title}
    </Link>
  )
}

export default MenuLink