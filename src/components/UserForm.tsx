import type React from "react"
import { useState } from "react"
import type { User } from "../pages/Home"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { toast } from "sonner"

// Helper function to validate website format
const isValidWebsite = (website: string): boolean => {
  const websiteRegex = /^(www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/
  return websiteRegex.test(website)
}

interface UserFormProps {
  onAdd: (user: User) => void
}

export default function UserForm({ onAdd }: UserFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [phone, setPhone] = useState("")
  const [website, setWebsite] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      toast.error("Name and Email are required fields.")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.")
      return
    }

    // Optional website validation - accepts domains ending with common TLDs
    if (website.trim() && !isValidWebsite(website.trim())) {
      toast.error("Please enter a valid website (e.g., example.com, site.net, etc.)")
      return
    }

    const newUser: User = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      company: { name: company.trim() || "Local Company" },
      address: { street: "", city: "", zipcode: "" },
      phone: phone.trim() || "",
      website: website.trim() || "",
    }

    onAdd(newUser)

    // Reset form
    setName("")
    setEmail("")
    setCompany("")
    setPhone("")
    setWebsite("")

    toast.success(`${newUser.name} has been added successfully!`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-background border-border"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-background border-border"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company" className="text-foreground">
          Company
        </Label>
        <Input
          id="company"
          type="text"
          placeholder="Acme Inc."
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="bg-background border-border"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 234 567 8900"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="text-foreground">
            Website
          </Label>
          <Input
            id="website"
            type="text"
            placeholder="example.com or site.net"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="bg-background border-border"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="submit" className="w-full sm:w-auto">
          Add User
        </Button>
      </div>
    </form>
  )
}

