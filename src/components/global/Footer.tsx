"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Linkedin, Github, Facebook, Instagram, Send, Loader2 } from "lucide-react"
import type { UserData } from "@/types/about"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
      const [data, setData] = useState<UserData | null>(null)
      const [isLoading, setIsLoading] = useState(true)
      const [email, setEmail] = useState("")
      const [isSubmitting, setIsSubmitting] = useState(false)
      const [subscribeMessage, setSubscribeMessage] = useState("")

      useEffect(() => {
            fetch("/data/contact.json")
                  .then((res) => res.json())
                  .then((data) => {
                        setData(data)
                        setIsLoading(false)
                  })
                  .catch((err) => {
                        console.error("Error fetching contact data:", err)
                        setIsLoading(false)
                  })
      }, [])

      const handleSubscribe = (e: React.FormEvent) => {
            e.preventDefault()
            setIsSubmitting(true)

            // Simulate API call
            setTimeout(() => {
                  setSubscribeMessage("Thank you for subscribing!")
                  setEmail("")
                  setIsSubmitting(false)

                  // Clear message after 3 seconds
                  setTimeout(() => setSubscribeMessage(""), 3000)
            }, 1000)
      }

      if (isLoading) {
            return (
                  <div className="w-full bg-slate-900 text-white p-8">
                        <div className="flex items-center justify-center py-12">
                              <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
                        </div>
                  </div>
            )
      }

      if (!data || !data.contact) {
            return (
                  <div className="w-full bg-slate-900 text-white p-8">
                        <div className="text-center py-12">
                              <p className="text-lg">Unable to load contact information.</p>
                        </div>
                  </div>
            )
      }

      return (
            <footer className="w-full bg-slate-900 text-white">
                  <div className="container mx-auto px-4 py-12">
                        {/* Top Section with Logo and Social Icons */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                              <Link href="/" className="flex items-center gap-3 mb-6 md:mb-0">
                                    <div className="border-r-2 border-white pr-3">
                                          <span className="text-xl font-serif tracking-wide" style={{ fontFamily: "'Special Elite', cursive" }}>
                                                The
                                                <br />
                                                Moho Blog
                                          </span>
                                    </div>
                                    <span className="text-xs text-gray-300">
                                          Journal of
                                          <br />
                                          Mohtasim Hadi Rafi
                                    </span>
                              </Link>

                              <div className="flex space-x-5">
                                    <SocialIcon href={data.contact.linkedin} Icon={Linkedin} label="LinkedIn" />
                                    <SocialIcon href={data.contact.github} Icon={Github} label="GitHub" />
                                    <SocialIcon href={data.contact.facebook} Icon={Facebook} label="Facebook" />
                                    <SocialIcon href={data.contact.instagram} Icon={Instagram} label="Instagram" />
                              </div>
                        </div>

                        <div className="h-px w-full bg-gray-700 my-8" />

                        {/* Main Footer Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                              {/* Quick Links Column */}
                              <div>
                                    <h3 className="text-lg font-semibold mb-6 text-gray-200">Quick Links</h3>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                          <FooterLink href="/poetries" label="Poetries" />
                                          <FooterLink href="/projects" label="Projects" />
                                          <FooterLink href="/typist" label="The Typist" />
                                          <FooterLink href="/patents" label="Patents" />
                                          <FooterLink href="/journals" label="Journals" />
                                          <FooterLink href="/publications" label="Publications" />
                                          <FooterLink href="/articles" label="Articles" />
                                          <FooterLink href="/presentations" label="Presentations" />
                                    </div>
                              </div>

                              {/* About Column */}
                              <div>
                                    <h3 className="text-lg font-semibold mb-6 text-gray-200">About</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                          The Moho Blog is a personal journal of Mohtasim Hadi Rafi, featuring writings, research, and creative
                                          works across various disciplines. Explore the collection of poetries, articles, and professional
                                          accomplishments.
                                    </p>
                              </div>

                              {/* Newsletter Column */}
                              <div>
                                    <h3 className="text-lg font-semibold mb-6 text-gray-200">Newsletter</h3>
                                    <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates on new posts and publications.</p>
                                    <form onSubmit={handleSubscribe} className="space-y-3">
                                          <div className="flex flex-col sm:flex-row gap-2">
                                                <Input
                                                      type="email"
                                                      placeholder="Your email address"
                                                      className="bg-slate-800 border-gray-700 text-white flex-grow"
                                                      value={email}
                                                      onChange={(e) => setEmail(e.target.value)}
                                                      required
                                                />
                                                <Button
                                                      type="submit"
                                                      className="bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                                                      disabled={isSubmitting}
                                                >
                                                      {isSubmitting ? (
                                                            <span className="flex items-center gap-2">
                                                                  <Loader2 className="h-4 w-4 animate-spin" />
                                                                  Subscribing...
                                                            </span>
                                                      ) : (
                                                            <span className="flex items-center gap-2">
                                                                  <Send className="h-4 w-4" />
                                                                  Subscribe
                                                            </span>
                                                      )}
                                                </Button>
                                          </div>
                                          {subscribeMessage && <p className="text-green-400 text-sm">{subscribeMessage}</p>}
                                    </form>
                              </div>
                        </div>

                        <div className="h-px w-full bg-gray-700 my-8" />

                        {/* Copyright Section */}
                        <div className="text-center text-gray-400 text-sm">
                              <p>&copy; {new Date().getFullYear()} Mohtasim Hadi Rafi. All rights reserved.</p>
                        </div>
                  </div>
            </footer>
      )
}

function SocialIcon({
      href,
      Icon,
      label,
}: {
      href: string
      Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
      label: string
}) {
      // Get the appropriate brand color based on the label
      const getBrandColor = () => {
            switch (label.toLowerCase()) {
                  case "linkedin":
                        return "bg-[#0077b5] hover:bg-[#0077b5]/80"
                  case "github":
                        return "bg-[#333] hover:bg-[#333]/80"
                  case "facebook":
                        return "bg-[#1877f2] hover:bg-[#1877f2]/80"
                  case "instagram":
                        return "bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743] hover:from-[#f09433]/90 hover:via-[#e6683c]/90 hover:to-[#dc2743]/90"
                  default:
                        return "bg-slate-700 hover:bg-slate-600"
            }
      }

      return (
            <Link href={href} target="_blank" rel="noopener noreferrer" className="group" aria-label={label}>
                  <div
                        className={`p-3 rounded-full shadow-lg transform transition-all duration-300 ${getBrandColor()}
                   hover:scale-110 hover:shadow-xl hover:rotate-3`}
                  >
                        <Icon className="w-6 h-6 text-white" />
                  </div>
            </Link>
      )
}

function FooterLink({ href, label }: { href: string; label: string }) {
      return (
            <Link href={href} className="text-gray-400 text-sm hover:text-white transition-colors duration-200">
                  {label}
            </Link>
      )
}
