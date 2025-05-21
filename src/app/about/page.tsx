"use client"

import AboutDetails from "@/components/About/AboutDetails"
import PeopleSection from "@/components/About/People"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8">
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="about">About Me</TabsTrigger>
          <TabsTrigger value="people">My People</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="mt-4">
          <AboutDetails />
        </TabsContent>
        <TabsContent value="people" className="mt-4">
          <PeopleSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}
