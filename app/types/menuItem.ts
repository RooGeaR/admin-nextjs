import { ReactNode } from "react";

export interface Item {
  title: string;
  path: string;
  icon: ReactNode
}

export interface MenuItem {
  title: string;
  list: Item[]
}