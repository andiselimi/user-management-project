// User detail page - shows individual user info with contact and address
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { User } from "./Home"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"
import { ArrowLeft, Mail, Phone, Globe, MapPin, Building2, UserIcon } from "lucide-react"
import { Skeleton } from "../components/ui/skeleton"

export default function UserDetail() {
  const navigate = useNavigate()
  const params = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch user data when component mounts
  useEffect(() => {
    const userId = params.id
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching user:", error)
        setIsLoading(false)
      })
  }, [params.id])

  // Loading skeleton state
  if (isLoading) {
    return (
      <div className="min-h-screen min-w-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-10 w-32" />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Card className="border-border bg-card">
            <CardHeader>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  // Handle missing user case
  if (!user) {
    return (
      <div className="min-h-screen min-w-screen bg-background flex items-center justify-center">
        <Card className="border-border bg-card max-w-md">
          <CardContent className="pt-6 text-center">
            <UserIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">User Not Found</h2>
            <p className="text-muted-foreground mb-6">The user you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-w-screen bg-background">
      {/* HEADER: Back button */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* USER HEADER CARD */}
        <Card className="border-border bg-card mb-6">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-2xl">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl text-foreground mb-2">{user?.name}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1.5">
                    <Building2 className="h-3 w-3" />
                    {user?.company?.name}
                  </Badge>
                  <Badge variant="outline" className="gap-1.5">
                    ID: {user?.id}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* CONTACT INFORMATION */}
        <Card className="border-border bg-card mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground font-medium">{user?.email}</p>
              </div>
            </div>
            <Separator className="bg-border" />

            {/* Phone */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-foreground font-medium">{user?.phone}</p>
              </div>
            </div>
            <Separator className="bg-border" />

            {/* Website */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Globe className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Website</p>
                <a
                  href={`https://${user?.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  {user?.website}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ADDRESS INFORMATION */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="text-foreground font-medium">{user?.address?.street}</p>
                <p className="text-muted-foreground">
                  {user?.address?.city}, {user?.address?.zipcode}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
