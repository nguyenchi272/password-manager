import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useItems } from "../hooks/useItems";

interface Props {
  item: {
    id: number;
    name: string;
    username: string;
    password: string;
    url?: string;
  };
}

export default function ItemCard({ item }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { deleteItem } = useItems();

  const openUrl = () => {
    if (item.url) {
      window.open(item.url, "_blank");
    }
  };

  // 🎯 CLICK RA NGOÀI → ĐÓNG MENU
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // 🎯 CLICK PHẢI → MỞ MENU TẠI VỊ TRÍ CHUỘT
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPos({ x: e.clientX, y: e.clientY });
    setMenuOpen(true);
  };

  // 🎯 CLICK TRÁI → MỞ MENU NGAY DƯỚI ITEM
  const handleLeftClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPos(null); // menu sẽ nằm default dưới item
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className="relative"
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    >
      {/* Item */}
      <div className="bg-white dark:bg-gray-800 shadow rounded p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">{item.username}</p>
      </div>

      {/* Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute bg-white dark:bg-gray-800 shadow-lg border 
             border-gray-200 dark:border-gray-700 rounded w-40 z-50 
             opacity-0 animate-fadeIn"
          style={{
            top: menuPos ? menuPos.y : "100%",
            left: menuPos ? menuPos.x : 0,
          }}
        >
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 
             text-gray-900 dark:text-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              openUrl();
              setMenuOpen(false);
            }}
          >
            Open Website
          </button>

          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 
             text-gray-900 dark:text-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/accounts/edit/${item.id}`);
              setMenuOpen(false);
            }}
          >
            Edit Account
          </button>

          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 
             text-gray-900 dark:text-gray-100"
            onClick={() => { 
              navigator.clipboard.writeText(item.password);
              alert("Password copied to clipboard!");
            }}
          >
            Copy Password
          </button>

          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 
             text-red-600 dark:text-red-400"
            onClick={() => deleteItem(item.id)}
          >
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
}
