import React, { useState, useEffect } from "react"
import type { User } from "../pages/Home"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { toast } from "sonner"

// Helper function to validate website format
const isValidWebsite = (website: string): boolean => {
  // Accept domains ending with common TLDs (com, net, org, etc.)
  // Also accepts with or without www. prefix
  const websiteRegex = /^(www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/
  return websiteRegex.test(website)
}

interface EditUserDialogProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
  onSave: (updatedUser: User) => void
}

export default function EditUserDialog({ user, isOpen, onClose, onSave }: EditUserDialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [phone, setPhone] = useState("")
  const [website, setWebsite] = useState("")

  // Update form when user prop changes
  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setCompany(user.company.name)
      setPhone(user.phone || "")
      setWebsite(user.website || "")
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

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

    const updatedUser: User = {
      ...user,
      name: name.trim(),
      email: email.trim(),
      company: { name: company.trim() || "Company" },
      phone: phone.trim(),
      website: website.trim(),
    }

    onSave(updatedUser)
    onClose()
    toast.success(`${updatedUser.name} has been updated successfully!`)
  }

  const handleClose = () => {
    onClose()
    // Reset form to original values
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setCompany(user.company.name)
      setPhone(user.phone || "")
      setWebsite(user.website || "")
    }
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information. Changes will be applied locally.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name" className="text-foreground">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email" className="text-foreground">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-company" className="text-foreground">
              Company
            </Label>
            <Input
              id="edit-company"
              type="text"
              placeholder="Acme Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-background border-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-phone" className="text-foreground">
                Phone
              </Label>
              <Input
                id="edit-phone"
                type="tel"
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-website" className="text-foreground">
                Website
              </Label>
              <Input
                id="edit-website"
                type="text"
                placeholder="example.com or site.net"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}