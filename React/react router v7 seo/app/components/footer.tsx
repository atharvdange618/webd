import { Input } from "./ui/input"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Link } from "react-router"
import { Button } from "./ui/button"

export function Footer() {
  return (
    <footer className="w-full py-12 md:py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">mCards</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Modern digital business cards and more for professionals who want to make a lasting impression.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products/business-cards"
                  className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Digital Business Cards
                </Link>
              </li>
              <li>
                <Link
                  to="/products/review-cards"
                  className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Digital Review Cards
                </Link>
              </li>
              <li>
                <Link
                  to="/products/invitation-cards"
                  className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Digital Invitation Cards
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Subscribe</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Stay updated with our latest products and offers</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="max-w-[220px]" />
              <Button type="submit" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} mCards. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              to="/terms"
              className="text-xs text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-xs text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookies"
              className="text-xs text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

