'use client'

import { TableHead, TableRow, TableCell, Typography, TableBody, Table, Stack } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { Paginator } from "./paginator";
import { ISchool } from "@/utils/interfaces";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

interface SchoolsTableProps {
  filteredSchools: ISchool[],
}

export function SchoolsTable({filteredSchools}: SchoolsTableProps) {
  const [page, setPage] = useState(0)
  const pages = 15

  const t = useTranslations('schools.details');

  const paginatedSchools = useMemo(() => {
    if (filteredSchools.length <= page + pages) {
      return filteredSchools.slice(page)
    }
    return filteredSchools.slice(page, page + pages + 1)
  }, [filteredSchools, page, pages])

  return <Stack gap={4}>
    <Typography variant='h5'>{t('found')} {filteredSchools.length}</Typography>
    <Table aria-label="schools">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <Typography variant='h6'>{t('name')}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant='h6'>{t('address')}</Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant='h6'>{t('website')}</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {paginatedSchools.map((school, i) => <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            <Link href={`/core/schools/${school.id}/`}>
              <Image
                width={1792}
                height={1024}
                src={school?.preview ?? '/images/default-school.png'}
                alt='school-image'
                style={{width: '10vw', height: 'auto'}}
                loading="lazy"
              />
            </Link>
          </TableCell>
          <TableCell><Link href={`/core/schools/${school.id}/`}>{school.name}</Link></TableCell>
          <TableCell>{school.address}</TableCell>
          <TableCell align="right">{school.website}</TableCell>
        </TableRow>)}
        <Paginator page={page} setPage={setPage} pages={pages} filteredSchoolsLength={filteredSchools.length} />
      </TableBody>
    </Table>
  </Stack>
}