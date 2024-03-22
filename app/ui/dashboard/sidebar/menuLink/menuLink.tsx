import React from 'react'
import styles from './menuLink.module.css'
import { IconType } from "react-icons";
import Link from 'next/link';

const MenuLink = ({ item }: { item: { title: string, path: string, icon: IconType }}) => {
  return (
    <Link href={item.path} className={styles.container}>
      {item.icon}
      {item.title}
    </Link>
  )
}

export default MenuLink