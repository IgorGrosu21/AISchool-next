'use client'

import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { Input } from "./input";

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
        minWidth: {xs: '48px', md: 'auto'},
        minHeight: {xs: '48px', md: 'auto'},
      },
      '& .MuiAutocomplete-clearIndicator': {
        minWidth: {xs: '48px', md: 'auto'},
        minHeight: {xs: '48px', md: 'auto'},
      }
    }}
  />
}