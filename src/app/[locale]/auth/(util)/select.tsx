'use client'

import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { Input } from "./input";
import { useIsMobile } from "@/hooks";

interface SelectProps<T> {
  disabled?: boolean
  name: string
  options: T[]
  value: T | null,
  setValue: (value: T | null) => void,
  renderOption?: (props: React.HTMLAttributes<HTMLLIElement> & { key: number }, option: T) => React.ReactNode;
}

export function Select<T extends { name: string }>({disabled = false, name, options, value, setValue, renderOption}: SelectProps<T>) {
  const [inputValue, setInputValue] = useState('');
  const isMobile = useIsMobile();

  return <Autocomplete
    disabled={disabled}
    options={options}
    value={value}
    onChange={(_, v: T | null) => setValue(v)}
    isOptionEqualToValue={(option, value) => option.name === value.name}
    inputValue={inputValue}
    onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
    getOptionLabel={(option) => `${option.name}`}
    renderOption={renderOption}
    renderInput={(params) => <Input {...params} name={name} />}
    sx={{
      '& .MuiAutocomplete-popupIndicator': {
        minWidth: isMobile ? '48px' : 'auto',
        minHeight: isMobile ? '48px' : 'auto',
      },
      '& .MuiAutocomplete-clearIndicator': {
        minWidth: isMobile ? '48px' : 'auto',
        minHeight: isMobile ? '48px' : 'auto',
      }
    }}
  />
}