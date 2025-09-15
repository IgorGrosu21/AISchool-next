'use client'

import { Checkbox, Grid2, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import Link from "next/link";
import Image from "next/image";
import { ISchool, IDetailedCountry } from "@/utils/interfaces";
import { useTranslations } from "next-intl";
import { useIsMobile, useSchoolFilters } from "@/hooks";
import { ClientPanel, KlassesRange } from "@/components";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface SchoolTableProps {
  schools: ISchool[],
  country: IDetailedCountry
}

export function SchoolTable({schools, country}: SchoolTableProps) {
  const {
    params, setParams, structuredParams, handleChange,
    filteredSchools, paginatedSchools,
    currentRows, prevPage, nextPage
  } = useSchoolFilters(schools, country)
  
  const tFilters = useTranslations('schools.filters');
  const tDetails = useTranslations('schools.details');

  const isMobile = useIsMobile();

  return <Stack gap={4}>
    <Stack gap={4}>
      <Grid2 container spacing={2}>
        {structuredParams.map((param, i) => <Grid2 key={i} size={isMobile ? 12 : param.size}>
          <ClientPanel gap={2} sx={{height: '100%'}}>
            <Typography variant='h6'>{tFilters(`${param.name}.title`)}:</Typography>
            <Stack direction='row' gap={4} sx={{flexWrap: 'wrap'}}>
              {param.schoolList.map((val, k) => <Stack key={k} direction='row' sx={{alignItems: 'center'}} gap={2}>
                <Checkbox checked={param.list.includes(val)} onChange={() => handleChange(param.name, val)} sx={{p: 0}} />
                <Typography>{param.name === 'langs' ? val : tFilters(`${param.name}.${val}`)}</Typography>
              </Stack>)}
            </Stack>
          </ClientPanel>
        </Grid2>)}
        <Grid2 size={isMobile ? 12 : 4}>
          <KlassesRange
            startGrade={params.startGrade}
            finalGrade={params.finalGrade}
            setGrades={(g1, g2) => setParams(p => ({...p, startGrade: g1, finalGrade: g2}))}
          />
        </Grid2>
      </Grid2>
    </Stack>
    <Stack gap={4}>
      <ClientPanel>
        <Typography variant='h5'>{tDetails('found')} {filteredSchools.length}</Typography>
      </ClientPanel>
      <ClientPanel>
        <Table aria-label="schools">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography variant='h6'>{tDetails('name')}</Typography>
              </TableCell>
              {!isMobile && <TableCell>
                <Typography variant='h6'>{tDetails('address')}</Typography>
              </TableCell>}
              {!isMobile && <TableCell align="right">
                <Typography variant='h6'>{tDetails('website')}</Typography>
              </TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSchools.map((school, i) => <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Link href={`/core/schools/${school.slug}/`}>
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
              <TableCell>
                <Link href={`/core/schools/${school.slug}/`}>{school.name}</Link>
              </TableCell>
              {!isMobile && <TableCell>{school.address}</TableCell>}
              {!isMobile && <TableCell align="right" sx={{color: 'primary.main'}}>
                <Link target='_blank' href={school.website}>{school.website}</Link>
              </TableCell>}
            </TableRow>)}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {!isMobile && <TableCell></TableCell>}
              {!isMobile && <TableCell></TableCell>}
              <TableCell></TableCell>
              <TableCell colSpan={2} align="right">
                <Stack direction='row' gap={2} sx={{alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'nowrap'}}>
                  <ChevronLeft onClick={prevPage} />
                  <Typography variant='h6' sx={{textWrap: 'nowrap'}}>
                    {currentRows}
                  </Typography>
                  <ChevronRight onClick={nextPage} />
                  <Typography variant='h6'>/</Typography>
                  <Typography variant='h6'>{filteredSchools.length}</Typography>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ClientPanel>
    </Stack>
  </Stack>
}