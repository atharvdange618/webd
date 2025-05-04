"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose Your Card Type",
      description: "Select from our range of business cards, review cards, or invitation cards.",
    },
    {
      number: "02",
      title: "Customize Your Design",
      description: "Personalize your card with our easy-to-use design tool to match your brand.",
    },
    {
      number: "03",
      title: "Register & Save",
      description: "Create an account to save your design and access additional features.",
    },
    {
      number: "04",
      title: "Complete Payment",
      description: "Securely pay for your order and we'll handle the rest.",
    },
    {
      number: "05",
      title: "Receive & Activate",
      description: "Get your physical cards delivered and activate your digital profile.",
    },
  ]

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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Simple steps to get your customized cards and digital presence
            </p>
          </div>
        </motion.div>
        <div className="mt-12 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-12 items-start mb-12 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold z-10">
                  {step.number}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button size="lg" asChild>
            <Link to="/products">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

