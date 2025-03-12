import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setMenuModal } from "@/lib/features/cafeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { IMAGE_HOST } from "@/lib/variebles";

export const MenuModal = () => {
  const dispatch = useAppDispatch();
  const { isMenuOpen, selectedCategory } = useAppSelector((state) => state.cafeslice);
  
  if (!isMenuOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-auto flex justify-center items-center z-50">
      <div className={selectedCategory.items.length > 7 ? "bg-white rounded-lg shadow-lg lg:w-[960px] h-max w-[100vw] p-4 rtl text-right pt-48" : "bg-white rounded-lg shadow-lg lg:w-[960px] h-max w-[100vw] p-4 rtl text-right"}>
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">{selectedCategory.name}</h2>
          <button
            onClick={() => dispatch(setMenuModal({ isOpen: false, category: {name:"", items:[]} }))}
            className="text-gray-600 hover:text-red-500"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Body */}
        <div className="mt-4 space-y-2">
          {selectedCategory.items.length > 0 ? (
            selectedCategory.items.map((item, index) => (
              <div key={index} className="p-2 bg-gray-100 flex items-center relative">
                    <span className="block w-20 h-20 me-2"> 
                      {
                        item.picture != null || item.picture ?
                        <Image src={IMAGE_HOST + item.picture} alt="" width={100} height={100} className="rounded-xl w-full h-full object-cover" />
                        : 
                        <Image src={'/logo-bottom.png'} alt="" width={70} height={70} className="rounded-xl w-full h-[70px] object-contain" />
                      }
                    </span>
                    <span className="block w-40">
                        <p className="font-bold">{item.item}</p>
                        <p className="text-sm">{item.description}</p>
                    </span>
                    <span className="block absolute left-4 transform translate-y-[50%]">
                        <span className="font-bold text-lg">{item.price}</span>

                        <span className="font-thin text-xs">تومان</span>
                    </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">آیتمی وجود ندارد.</p>
          )}
        </div>
      </div>
    </div>
  );
};
