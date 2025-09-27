'use client'

import { useState } from "react";
import { SmallProfile } from "../profile";
import { IStudent } from "@/interfaces";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem } from "@mui/material";

interface StudentsPickerProps {
  anchorEl: HTMLDivElement | null
  students: IStudent[]
  activeStudent: IStudent
  setActiveStudent: (student: IStudent) => void
}

export function StudentsPicker({anchorEl, students, activeStudent, setActiveStudent}: StudentsPickerProps) {
  const [opened, open] = useState(false);
  return <Box>
    <Button variant='text' onClick={() => open(true)} sx={{px: 2, py: 1, gap: 4}}>
      <SmallProfile user={activeStudent.user} disableLink extraSmall />
      <KeyboardArrowDown sx={{transform: `rotate(${opened ? 180 : 0}deg)`, transition: '0.5s', fontSize: '2rem'}} />
    </Button>
    <Menu
      anchorEl={anchorEl}
      open={opened}
      onClose={() => open(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left'}}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: anchorEl?.clientWidth,
        },
        '& .MuiPaper-root > ul': {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 2,
          p: 2,
        },
      }}
    >
      {students.map((student, i) => (
        <MenuItem key={i} onClick={() => setActiveStudent(student)} selected={activeStudent.id === student.id} sx={{
          '&.Mui-selected': {
            '&:hover': {
              bgcolor: 'primary.main',
            },
            transition: '0.5s',
          },
          '&:hover': {
            bgcolor: 'primary.main',
          },
          transition: '0.5s'
        }}>
          <SmallProfile user={student.user} disableLink extraSmall />
        </MenuItem>
      ))}
    </Menu>
  </Box>
}
