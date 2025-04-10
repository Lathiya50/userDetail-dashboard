import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

const SearchInput = memo(function SearchInput({ value, onChange, disabled }) {
  return (
    <div className="relative bg-white w-full md:w-auto">
      {disabled ? (
        <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin" />
      ) : (
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      )}
      <Input
        className="pl-10 w-full md:w-[300px]"
        placeholder="Search by name"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
});

export default SearchInput;
