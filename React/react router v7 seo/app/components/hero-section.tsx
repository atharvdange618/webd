"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Reimagine Your <span className="text-primary">Business Cards</span> for the Digital Age
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                Customizable NFC and QR-enabled cards that make a lasting impression. Design your own card and get a
                personal website.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <Button size="lg" asChild>
                <Link to="/products">
                  Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/how-it-works">How It Works</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-96 bg-primary/10 rounded-xl shadow-lg overflow-hidden"
                initial={{ rotate: -5 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white font-bold">mC</span>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-md flex items-center justify-center">
                      <div className="w-12 h-12 border-2 border-white/50 rounded-md grid grid-cols-3 grid-rows-3 gap-0.5">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="bg-white/50 rounded-sm"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-xl">John Smith</h3>
                    <p className="text-white/80 text-sm">Product Designer</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                      <p className="text-white/80 text-xs">john@example.com</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                      <p className="text-white/80 text-xs">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="absolute top-1/4 right-1/4 w-64 h-96 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                initial={{ rotate: 5, y: 20 }}
                animate={{ rotate: 0, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-500/80 to-purple-500 p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white font-bold">mC</span>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-md flex items-center justify-center">
                      <div className="w-12 h-12 border-2 border-white/50 rounded-md grid grid-cols-3 grid-rows-3 gap-0.5">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="bg-white/50 rounded-sm"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-xl">Sarah Johnson</h3>
                    <p className="text-white/80 text-sm">Marketing Director</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                      <p className="text-white/80 text-xs">sarah@example.com</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                      <p className="text-white/80 text-xs">+1 (555) 987-6543</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

