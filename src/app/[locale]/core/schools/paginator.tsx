'use client'

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { TableRow, TableCell, Stack, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";

interface PaginatorProps {
  page: number
  setPage: (val: number) => void
  pages: number,
  filteredSchoolsLength: number
}

export function Paginator({page, setPage, pages, filteredSchoolsLength}: PaginatorProps) {
  const prevPage = useCallback(() => {
    if (page >= pages) {
      setPage(page - pages)
    } else {
      setPage(0)
    }
  }, [page, pages, setPage])

  const nextPage = useCallback(() => {
    if (page + pages <= filteredSchoolsLength) {
      setPage(page + pages)
    }
  }, [filteredSchoolsLength, page, pages, setPage])

  useEffect(() => {
    setPage(0)
  }, [filteredSchoolsLength, setPage])
  
  return <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell colSpan={2} align="right">
      <Stack direction='row' gap={2} sx={{alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'nowrap'}}>
        <ChevronLeft onClick={prevPage} />
        <Typography variant='h6' sx={{textWrap: 'nowrap'}}>
          {page + 1} - {page + pages > filteredSchoolsLength ? filteredSchoolsLength : page + pages}
        </Typography>
        <ChevronRight onClick={nextPage} />
        <Typography variant='h6'>/</Typography>
        <Typography variant='h6'>{filteredSchoolsLength}</Typography>
      </Stack>
    </TableCell>
  </TableRow>
}