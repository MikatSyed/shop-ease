"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa"
import { debounce } from "lodash"


export default function SearchAndFilter({ categories, searchResults }: any) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsOpen(window.innerWidth >= 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const updateQuery = useCallback(
    debounce((search: string, category: string) => {
      const params = new URLSearchParams(searchParams)
      if (search) params.set("search", search)
      else params.delete("search")
      if (category) params.set("category", category)
      else params.delete("category")
      router.push(`/?${params.toString()}`)
    }, 300),
    [],
  )

  useEffect(() => {
    updateQuery(search, category)
  }, [search, category, updateQuery])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }

  const handleReset = () => {
    setSearch("")
    setCategory("")
    router.push("/")
  }

  return (
    <div className="mb-8">
      <div className=" rounded-lg overflow-hidden">
        <div className="md:flex items-center">
          <div className="flex-grow p-4">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full md:w-[300px] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="md:hidden p-4">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-300"
            >
              <FaFilter className="mr-2" />
              Filters
            </button>
          </div>
          <AnimatePresence>
            {(isOpen || window.innerWidth >= 768) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full md:w-auto overflow-hidden md:flex md:items-center"
              >
                <div className="p-4 md:pr-2">
                  <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat:any) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="p-4">
            <button
              onClick={handleReset}
              className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
            >
              <FaTimes className="mr-2" />
              Reset
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {search && searchResults?.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md shadow-sm"
          >
            No results found for "{search}". Please try a different search term or category.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

