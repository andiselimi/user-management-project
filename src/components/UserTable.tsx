// User table with edit/delete functionality and responsive design
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { User } from "../pages/Home"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Building2, Mail, ChevronRight, Edit, Trash2 } from "lucide-react"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"
import { toast } from "sonner"
import EditUserDialog from "./EditUserDialog"

interface UserTableProps {
  users: User[]
  isLoading: boolean
  onUpdateUser: (updatedUser: User) => void
  onDeleteUser: (userId: number) => void
}

export default function UserTable({ users, isLoading, onUpdateUser, onDeleteUser }: UserTableProps) {
  const navigate = useNavigate() // For user details navigation
  
  // Component state
  const [hoveredRow, setHoveredRow] = useState<number | null>(null) // Row hover effects
  const [editingUser, setEditingUser] = useState<User | null>(null) // User being edited
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false) // Edit dialog visibility

  // Edit user handlers
  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsEditDialogOpen(true)
  }

  const handleSaveUser = (updatedUser: User) => {
    onUpdateUser(updatedUser)
    setIsEditDialogOpen(false)
    setEditingUser(null)
  }

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false)
    setEditingUser(null)
  }

  // Delete user with confirmation toast
  const handleDeleteUser = (user: User) => {
    toast(`Delete ${user.name}?`, {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: () => {
          onDeleteUser(user.id)
          toast.success(`${user.name} has been deleted successfully!`)
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.info("Delete cancelled")
        }
      }
    })
  }

  // Loading state with skeleton placeholders
  if (isLoading) {
    return (
      <Card className="border-border bg-card">
        <div className="p-4 sm:p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-4">
              <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex-shrink-0" />
              <div className="space-y-2 flex-1 min-w-0">
                <Skeleton className="h-4 w-full max-w-[250px]" />
                <Skeleton className="h-3 w-full max-w-[200px]" />
                <Skeleton className="h-3 w-full max-w-[150px] sm:hidden" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  // Empty state when no users found
  if (users.length === 0) {
    return (
      <Card className="border-border bg-card">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Mail className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No users found</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Try adjusting your search criteria or add a new user to get started.
          </p>
        </div>
      </Card>
    )
  }

  // Responsive table with progressive disclosure
  return (
    <Card className="border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium min-w-[200px]">Name</TableHead>
              <TableHead className="text-muted-foreground font-medium hidden sm:table-cell">Email</TableHead>
              <TableHead className="text-muted-foreground font-medium hidden md:table-cell">Company</TableHead>
              <TableHead className="text-muted-foreground font-medium text-center min-w-[100px]">Actions</TableHead>
              <TableHead className="text-muted-foreground font-medium w-[50px] hidden lg:table-cell"></TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="border-border transition-colors hover:bg-muted/50"
              onMouseEnter={() => setHoveredRow(user.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* User info with avatar - shows email/company on mobile */}
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm flex-shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-foreground truncate">{user.name}</div>
                    <div className="text-xs text-muted-foreground">ID: {user.id}</div>
                    <div className="text-xs text-muted-foreground sm:hidden truncate">{user.email}</div>
                    <div className="text-xs text-muted-foreground md:hidden">
                      <Badge variant="secondary" className="text-xs mt-1">
                        {user.company.name}
                      </Badge>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm truncate">{user.email}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="secondary" className="gap-1.5 font-normal">
                  <Building2 className="h-3 w-3" />
                  <span className="truncate">{user.company.name}</span>
                </Badge>
              </TableCell>
              {/* Edit and Delete action buttons */}
              <TableCell>
                <div className="flex items-center gap-1 sm:gap-2 justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditUser(user)
                    }}
                    className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                    title="Edit user"
                  >
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteUser(user)
                    }}
                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                    title="Delete user"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </TableCell>
              {/* Navigate to user details page */}
              <TableCell className="cursor-pointer hidden lg:table-cell" onClick={() => navigate(`/user/${user.id}`)}>
                <ChevronRight
                  className={`h-5 w-5 text-muted-foreground transition-transform ${
                    hoveredRow === user.id ? "translate-x-1" : ""
                  }`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </div>
      
      {/* Edit user dialog */}
      <EditUserDialog
        user={editingUser}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onSave={handleSaveUser}
      />
    </Card>
  )
}
