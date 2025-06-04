"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Star, MapPin, Send, Heart, Share2 } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import type { cafeInformation } from "@/components/CafeComponents/types"
import { IMAGE_HOST } from "@/lib/variebles"
import JoinClubBtn from "./JoinClubBtn"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function DarkGreenTheme({ cafe, categories }: cafeInformation) {
  const [selectedCategory, setSelectedCategory] = useState<number>(1)
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", name: "" })
  const [showAllPictures, setShowAllPictures] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" },
      )
    }

    // About section animation
    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    // Menu items animation
    if (menuRef.current) {
      gsap.fromTo(
        menuRef.current.querySelectorAll(".menu-item"),
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: menuRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    // Gallery animation
    if (galleryRef.current) {
      gsap.fromTo(
        galleryRef.current.querySelectorAll(".gallery-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    // Reviews animation
    if (reviewsRef.current) {
      gsap.fromTo(
        reviewsRef.current.querySelectorAll(".review-item"),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: reviewsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [selectedCategory])

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New review:", newReview)
    setNewReview({ rating: 5, comment: "", name: "" })
  }

  const featuredPictures = cafe.pictures.filter((pic) => pic.is_featured)
  const displayPictures = showAllPictures ? cafe.pictures : featuredPictures.slice(0, 4)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-green-900" dir="rtl">
      {/* Header Section */}
      <div ref={headerRef} className="relative h-96 overflow-hidden">
        <Image
          src={IMAGE_HOST + cafe.pictures[0].picture || "/placeholder.svg"}
          alt={cafe.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4 px-4">
            <h1 className="lg:text-5xl text-3xl font-bold mb-2 text-white drop-shadow-lg">{cafe.name}</h1>
            <div className="flex items-center justify-center gap-2 text-lg flex-row-reverse">
              <MapPin className="w-5 h-5 text-emerald-300" />
              <span className="text-gray-100">{cafe.address}</span>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
              <button className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-emerald-600/20 border border-emerald-400/30 text-emerald-100 hover:bg-emerald-500/30 btn-green flex items-center gap-2">
                <Heart className="w-4 h-4" />
                علاقه‌مندی
              </button>
              <button className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-emerald-600/20 border border-emerald-400/30 text-emerald-100 hover:bg-emerald-500/30 btn-green flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                اشتراک‌گذاری
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* About Section */}
        <div
          ref={aboutRef}
          className="bg-gray-800/95 border border-emerald-500/20 backdrop-blur-sm rounded-lg shadow-lg card-hover-green"
        >
          <div className="p-6 pb-4">
            <h2 className="text-2xl font-semibold text-emerald-100 text-right">درباره کافه</h2>
          </div>
          <div className="p-6 pt-0">
            <p className="text-gray-100 leading-relaxed text-right">{cafe.about}</p>
          </div>
        </div>

        {/* Gallery Section */}
        <div
          ref={galleryRef}
          className="bg-gray-800/95 border border-emerald-500/20 backdrop-blur-sm rounded-lg shadow-lg card-hover-green"
        >
          <div className="p-6 pb-4">
            <h2 className="text-2xl font-semibold text-emerald-100 text-right">گالری تصاویر</h2>
          </div>
          <div className="p-6 pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cafe.pictures.map((picture, index) => (
                <div key={index} className="gallery-item relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={IMAGE_HOST + picture.picture || "/placeholder.svg"}
                    alt={`تصویر کافه ${index + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                  {picture.is_featured && (
                    <span className="absolute top-2 right-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500 text-white shadow-lg">
                      ویژه
                    </span>
                  )}
                </div>
              ))}
            </div>
            {cafe.pictures.length > 4 && (
              <button
                className="mt-4 w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-gray-700/80 border border-emerald-500/30 text-emerald-200 hover:bg-emerald-600/20 hover:border-emerald-400/50"
                onClick={() => setShowAllPictures(!showAllPictures)}
              >
                {showAllPictures ? "نمایش کمتر" : `نمایش همه تصاویر (${cafe.pictures.length})`}
              </button>
            )}
          </div>
        </div>

        {/* Club Section */}
        {cafe.club != null && (
          <div className="container w-full p-4 bg-emerald-900/40 border border-emerald-500/20 rounded-lg shadow-lg card-hover-green">
            <div className="py-4 w-full flex flex-wrap justify-center gap-2 items-center">
              <div className="img-container">
                <div className="relative w-20 h-20">
                  <Image
                    src={IMAGE_HOST + cafe.club.club_avatar || "/placeholder.svg"}
                    width={100}
                    height={100}
                    className="rounded-full w-20 h-20 object-cover border-2 border-emerald-400/30"
                    alt={cafe.club.name || "Club avatar"}
                  />
                </div>
              </div>
              <div className="ps-4">
                <span className="text-xl font-black text-emerald-100">{cafe.club.name}</span>
                <br />
                <span className="text-lg font-normal text-emerald-200">{cafe.club.description}</span>
                <br />
                <span className="text-emerald-300">باشگاه مشتریان ما {cafe.club.members.length} عضو دارد.</span>
                <JoinClubBtn clubId={cafe.club.id} btnMode="light" />
              </div>
            </div>
          </div>
        )}

        {/* Menu Section */}
        <div
          ref={menuRef}
          className="bg-gray-800/95 border border-emerald-500/20 backdrop-blur-sm rounded-lg shadow-lg card-hover-green"
        >
          <div className="p-6 pb-4">
            <h2 className="text-2xl font-semibold text-emerald-100 text-right mb-4">منوی کافه</h2>
            <div className="flex gap-2 flex-wrap justify-end">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg btn-green-active"
                      : "bg-gray-700/80 border border-emerald-500/30 text-emerald-200 hover:bg-emerald-600/20 hover:border-emerald-400/50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories
                .find((cat) => cat.id === selectedCategory)
                ?.items.map((item) => (
                  <div key={item.id} className="menu-item">
                    <div className="h-full bg-gray-700/60 border border-emerald-500/20 rounded-lg shadow-lg card-hover-green overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={IMAGE_HOST + item.picture || "/placeholder.svg"}
                          alt={item.item}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg text-emerald-100">{item.item}</h3>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-lg font-bold bg-emerald-600 text-white shadow-md">
                            {item.price} تومان
                          </span>
                        </div>
                        <p className="text-gray-200 text-sm text-right leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div
          ref={reviewsRef}
          className="bg-gray-800/95 border border-emerald-500/20 backdrop-blur-sm rounded-lg shadow-lg card-hover-green"
        >
          <div className="p-6 pb-4">
            <h2 className="text-2xl font-semibold text-emerald-100 text-right">نظرات مشتریان</h2>
          </div>
          <div className="p-6 pt-0 space-y-6">
            {/* Existing Reviews */}
            <div className="space-y-4">{/* Reviews will be populated here */}</div>

            <hr className="border-emerald-500/20 my-6" />

            {/* New Review Form */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-right text-emerald-100">نظر خود را بنویسید</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-right text-emerald-200">نام شما</label>
                  <input
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="نام خود را وارد کنید"
                    className="w-full px-3 py-2 bg-gray-700/60 border border-emerald-500/30 text-emerald-100 placeholder:text-emerald-300/70 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 rounded-lg text-right transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-right text-emerald-200">امتیاز</label>
                  <div className="flex gap-1 justify-end">
                    {[...Array(5)].map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                        className="p-1 transition-transform duration-200 hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors duration-200 ${
                            i < newReview.rating
                              ? "fill-emerald-400 text-emerald-400"
                              : "text-gray-400 hover:text-emerald-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-right text-emerald-200">نظر شما</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="نظر خود را در مورد این کافه بنویسید..."
                    className="w-full px-3 py-2 bg-gray-700/60 border border-emerald-500/30 text-emerald-100 placeholder:text-emerald-300/70 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 rounded-lg text-right resize-none transition-all duration-200"
                    rows={4}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/25 hover:shadow-xl"
                >
                  <Send className="w-4 h-4" />
                  ارسال نظر
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}