"use client"

import { motion } from "framer-motion"
import { Palette, Smartphone, Globe, LayoutDashboard } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Palette,
      title: "Unique Designs",
      description: "Choose from a variety of professionally designed templates or create your own custom design.",
    },
    {
      icon: Smartphone,
      title: "NFC & QR Technology",
      description: "Tap or scan to instantly share your contact information and digital profile.",
    },
    {
      icon: Globe,
      title: "Personal Website",
      description: "Every business card comes with a personal website to showcase your portfolio and services.",
    },
    {
      icon: LayoutDashboard,
      title: "Customizable Dashboard",
      description: "Easily update your information and manage your digital presence through our intuitive dashboard.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              What makes mCards the perfect solution for your networking needs
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

