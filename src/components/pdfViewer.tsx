'use client'

import { Button, CircularProgress, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export function PdfViewer({ link }: { link: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const t = useTranslations('components.pdf_viewer')

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    if (ref.current) {
      setWidth(ref.current.clientWidth)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => setWidth(ref.current ? ref.current.clientWidth : 0);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <Stack gap={4} ref={ref} sx={{width: '80%', alignItems: 'center'}}>
    {numPages && numPages > 1 && <Stack direction='row' gap={4}>
      {numPages > 3 && <Button variant='contained' onClick={() => setPageNumber(1)}>{t('to_start')}</Button>}
      <Button variant='outlined' disabled={pageNumber <= 1} onClick={() => setPageNumber(p => p - 1)}>{t('prev')}</Button>
      <Stack direction='row' gap={2}>
        {Array.from({length: numPages}, (_, i) => i + 1).map(page => <Button
          key={page}
          color={page === pageNumber ? 'secondary' : 'primary'}
          variant={page === pageNumber ? 'contained' : 'outlined'}
          onClick={() => setPageNumber(page)}
          sx={page === pageNumber ? { pointerEvents: 'none' } : {}}
        >
          {page}
        </Button>)}
      </Stack>
      <Button variant='outlined' disabled={pageNumber >= numPages} onClick={() => setPageNumber(p => p + 1)}>{t('next')}</Button>
      {numPages > 3 && <Button variant='contained' onClick={() => setPageNumber(numPages)}>{t('to_end')}</Button>}
    </Stack>}
    <Document file={link} loading={<CircularProgress size='30vh' />} onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={pageNumber} width={width} renderTextLayer={false} renderAnnotationLayer={false} />
    </Document>
  </Stack>
}