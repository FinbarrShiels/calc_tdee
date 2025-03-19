import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <header className="bg-gradient-to-r from-green-600 to-green-400 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white text-center">Contact Us</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-[800px]">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-green-700 mb-4">Get in Touch</h2>
              <p className="mb-4">
                Have questions, suggestions, or feedback about our TDEE Calculator? We'd love to hear from you! Fill out the form and we'll get back to you as soon as possible.
              </p>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600">support@tdeecalculator.com</p>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll respond as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium">First Name</label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium">Last Name</label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea id="message" placeholder="Your message here..." className="min-h-[120px]" />
                  </div>
                  
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
} 