"use client"
import { categoryFood, MenuItemProps } from "@/lib/types"
import { useEffect, useState } from "react"
import { MenuModal } from "./MenuModal"
import { setMenuModal } from "@/lib/features/cafeSlice"
import { useAppDispatch } from "@/lib/hook"


export const MenuWrapper = ({categories}: {categories: categoryFood[]}) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log(categories)
    }, [])
    return (
        <div>
      <div className="container w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="aspect-square relative rounded-lg flex items-center justify-center"
              onClick={() => {
                dispatch(setMenuModal({ isOpen: true, category: { name: cat.name, items: cat.items } }));
                console.log("Modal Opened:", cat.name);
              }}
            >
              <div className="w-full h-full absolute top-0 right-0 z-20 bg-brown-normal bg-opacity-70 rounded-lg"></div>
              <div className="w-full h-full absolute top-0 right-0 z-10 bg-[url('/cafe-pattern.jpg')] bg-[length:150px_150px] rounded-lg"></div>
              <span className="block p-3 rounded-lg text-white text-lg font-bold z-30">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Component */}
      <MenuModal />
    </div>
    )
}