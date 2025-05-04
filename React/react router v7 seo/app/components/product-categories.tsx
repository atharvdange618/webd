"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { motion } from "framer-motion"
import { Smartphone, Star, PartyPopper, ArrowRight } from "lucide-react"
import { Link } from "react-router"
import { Button } from "./ui/button"

export function ProductCategories() {
  const categories = [
    {
      title: "Digital Business Cards",
      description: "NFC and QR-enabled metal business cards with your personal website.",
      icon: Smartphone,
      color: "bg-blue-500",
      link: "/products/business-cards",
    },
    {
      title: "Digital Review Cards",
      description: "QR-enabled cards that direct customers to leave Google reviews.",
      icon: Star,
      color: "bg-yellow-500",
      link: "/products/review-cards",
    },
    {
      title: "Digital Invitation Cards",
      description: "Online invitation cards shareable via WhatsApp and social media.",
      icon: PartyPopper,
      color: "bg-purple-500",
      link: "/products/invitation-cards",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Product Categories</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore our range of customizable cards designed for different needs
            </p>
          </div>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center text-white mb-4`}
                  >
                    <category.icon size={24} />
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3/4 h-3/4 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-md"></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to={category.link}>
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

