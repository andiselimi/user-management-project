// Search input for filtering users by name or email
import type { FC } from "react"
import { Input } from "@/components/ui/input"

// Props for SearchBar
interface SearchBarProps {
  value: string
  onChange: (val: string) => void
}

// Controlled search bar component
const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      placeholder="Search by name or email..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4 w-full"
    />
  )
}

export default SearchBar
