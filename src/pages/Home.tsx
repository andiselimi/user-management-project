import { useEffect, useState } from "react"
import { Search, ArrowUpDown, Check } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setUsers, addUser, updateUser, deleteUser, setLoading } from "@/store/usersSlice"
import UserTable from "@/components/UserTable"
import TopBar from "@/components/TopBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface User {
  id: number
  name: string
  email: string
  company: { name: string }
  address: { street: string; city: string; zipcode: string }
  phone: string
  website: string
}

export default function Home() {
  const dispatch = useAppDispatch()
  const { users, isLoading } = useAppSelector((state) => state.users)
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState<"none" | "id" | "name">("none")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  useEffect(() => {
    dispatch(setLoading(true))
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setUsers(data))
      })
      .catch((error) => {
        console.error("Error fetching users:", error)
        dispatch(setLoading(false))
      })
  }, [dispatch])

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "none") return 0
      
      let comparison = 0
      if (sortBy === "id") {
        comparison = a.id - b.id
      } else if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      }
      
      return sortOrder === "asc" ? comparison : -comparison
    })

  const handleAddUser = (newUser: User) => {
    dispatch(addUser(newUser))
  }

  const handleUpdateUser = (updatedUser: User) => {
    dispatch(updateUser(updatedUser))
  }

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId))
  }

  const handleSortChange = (newSortBy: "none" | "id" | "name") => {
    if (newSortBy === sortBy) {
      // Toggle order if same sort field is selected
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      // Set new sort field and default to ascending
      setSortBy(newSortBy)
      setSortOrder("asc")
    }
  }

  const getSortLabel = () => {
    if (sortBy === "none") return "No Sort"
    const field = sortBy === "id" ? "ID" : "Name"
    const order = sortOrder === "asc" ? "↑" : "↓"
    return `${field} ${order}`
  }

  return (
    <div className="min-h-screen bg-background min-w-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <TopBar addUser={handleAddUser} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="hidden sm:inline">{getSortLabel()}</span>
                    <span className="sm:hidden">Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem 
                    onClick={() => handleSortChange("none")}
                    className="flex items-center justify-between"
                  >
                    No Sort
                    {sortBy === "none" && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleSortChange("id")}
                    className="flex items-center justify-between"
                  >
                    Sort by ID {sortBy === "id" && (sortOrder === "asc" ? "↑" : "↓")}
                    {sortBy === "id" && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleSortChange("name")}
                    className="flex items-center justify-between"
                  >
                    Sort by Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                    {sortBy === "name" && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"}
              </div>
            </div>
          </div>
        </div>

        <UserTable 
          users={filteredUsers} 
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
        />
      </main>
    </div>
  )
}
