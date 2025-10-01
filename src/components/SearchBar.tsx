import type { FC } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      placeholder="Search by name or email..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="mb-4 w-full"
    />
  );
};

export default SearchBar;
