'use client'

import { useNoteProgress } from "@/hooks";
import { IPersonHome } from "@/interfaces"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from "@mui/material/styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

interface LineChartProps {
  data: (IPersonHome & { profileType: 'student' })['analytics'][number]['points']
}

export function LineChart({data}: LineChartProps) {
  const theme = useTheme()
  const progressData = useNoteProgress(data)
  
  return <Line options={{responsive: true}} data={{
    labels: progressData.map((point) => point.date),
    datasets: [
      {
        data: progressData.map((point) => point.value),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
      },
    ],
  }} />
}
