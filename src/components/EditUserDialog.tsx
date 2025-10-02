// Edit user dialog - reuses UserForm component
import type { User } from "../pages/Home"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import UserForm from "./UserForm" // REUSED COMPONENT - No code duplication!

interface EditUserDialogProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
  onSave: (updatedUser: User) => void
}

export default function EditUserDialog({ user, isOpen, onClose, onSave }: EditUserDialogProps) {
  // Handle save and close dialog
  const handleSave = (updatedUser: User) => {
    onSave(updatedUser)
    onClose()
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information. Changes will be applied locally.
          </DialogDescription>
        </DialogHeader>
        
        <UserForm 
          user={user}
          onSubmit={handleSave}
          onCancel={onClose}
          mode="edit"
        />
      </DialogContent>
    </Dialog>
  )
}