// Form component for Add and Edit User
import React, { useState, useEffect } from "react"
import type { User } from "../pages/Home"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { toast } from "sonner"

// Website validation helper
const isValidWebsite = (website: string): boolean => {
  const websiteRegex = /^(www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/
  return websiteRegex.test(website)
}

// Component props
interface UserFormProps {
  user?: User | null
  onSubmit: (user: User) => void
  onCancel?: () => void
  mode?: 'add' | 'edit'
}

export default function UserForm({ user, onSubmit, onCancel, mode = 'add' }: UserFormProps) {
  // Local form state
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [company, setCompany] = useState(user?.company.name || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [website, setWebsite] = useState(user?.website || "")

  // Populate or reset form fields when user or mode changes
  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setCompany(user.company.name)
      setPhone(user.phone || "")
      setWebsite(user.website || "")
    } else if (mode === 'add') {
      setName("")
      setEmail("")
      setCompany("")
      setPhone("")
      setWebsite("")
    }
  }, [user, mode])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      toast.error("Name and Email are required fields.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.")
      return
    }

    if (website.trim() && !isValidWebsite(website.trim())) {
      toast.error("Please enter a valid website (e.g., example.com, site.net, etc.)")
      return
    }

    // Construct new or updated user object
    const userData: User = mode === 'edit' && user ? {
      ...user,
      name: name.trim(),
      email: email.trim(),
      company: { name: company.trim() || "Company" },
      phone: phone.trim(),
      website: website.trim(),
    } : {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      company: { name: company.trim() || "Local Company" },
      address: { street: "", city: "", zipcode: "" },
      phone: phone.trim() || "",
      website: website.trim() || "",
    }

    onSubmit(userData)

    if (mode === 'add') {
      setName("")
      setEmail("")
      setCompany("")
      setPhone("")
      setWebsite("")
    }

    const action = mode === 'edit' ? 'updated' : 'added'
    toast.success(`${userData.name} has been ${action} successfully!`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
        <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
        <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      {/* Company */}
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" type="text" placeholder="Acme Inc." value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>

      {/* Phone + Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="+1 234 567 8900" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" type="text" placeholder="example.com or site.net" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        {mode === 'edit' && onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {mode === 'edit' ? 'Save Changes' : 'Add User'}
        </Button>
      </div>
    </form>
  )
}
