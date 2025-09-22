'use client'

import { useKlassesPerformance } from "@/hooks";
import { IPersonHome } from "@/utils/interfaces"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from "@mui/material/styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip
);

interface BarChartProps {
  data: (IPersonHome & { profileType: 'teacher' })['analytics'][number]['subjects'][number]['klasses']
}

export function BarChart({data}: BarChartProps) {
  const theme = useTheme()
  const progressData = useKlassesPerformance(data)
  
  return <Bar options={{responsive: true}} data={{
    labels: progressData.map((klass) => klass.slug),
    datasets: [
      {
        data: progressData.map((klass) => klass.performance),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        maxBarThickness: 50,
      },
    ],
  }} />
}
