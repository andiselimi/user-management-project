// Top navigation bar with app title and Add User dialog
import React, { useState } from "react"
import { Users, Plus } from "lucide-react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import UserForm from "./UserForm"
import type { User } from "../pages/Home"

// Props for TopBar
interface TopBarProps {
  addUser: (user: User) => void
}

export const TopBar: React.FC<TopBarProps> = ({ addUser }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Add user and close modal
  const handleAddUser = (user: User) => {
    addUser(user)
    setIsDialogOpen(false)
  }

  return (
    <div className="flex items-center justify-between">
      {/* App logo + title */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">User Management</h1>
          <p className="text-sm text-muted-foreground">Manage and organize users</p>
        </div>
      </div>

      {/* Add User dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user entry. This will be added locally to the list.
            </DialogDescription>
          </DialogHeader>
          <UserForm onSubmit={handleAddUser} mode="add" />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TopBar
