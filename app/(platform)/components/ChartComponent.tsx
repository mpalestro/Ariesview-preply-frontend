'use client';

import { useEffect, useRef } from 'react';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
}

interface ChartProps {
  type: 'line' | 'bar' | 'pie' | 'doughnut';
  data: ChartData;
  height?: number;
  width?: number;
  options?: any;
}

export default function ChartComponent({ type, data, height = 300, width = 100, options = {} }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple color palette
  const colorPalette = [
    'rgba(54, 162, 235, 0.7)', // blue
    'rgba(255, 99, 132, 0.7)',  // red
    'rgba(75, 192, 192, 0.7)',  // teal
    'rgba(255, 206, 86, 0.7)',  // yellow
    'rgba(153, 102, 255, 0.7)', // purple
    'rgba(255, 159, 64, 0.7)',  // orange
    'rgba(56, 178, 172, 0.7)',  // emerald
    'rgba(199, 210, 254, 0.7)', // light purple
  ];

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set canvas dimensions
        canvas.width = canvas.offsetWidth;
        canvas.height = height;
        
        // Draw chart based on type
        if (type === 'line') {
          drawLineChart(ctx, data, canvas.width, canvas.height);
        } else if (type === 'bar') {
          drawBarChart(ctx, data, canvas.width, canvas.height);
        } else if (type === 'pie' || type === 'doughnut') {
          drawPieChart(ctx, data, canvas.width, canvas.height, type === 'doughnut');
        }
      }
    }
  }, [type, data, height, width]);
  
  // Simple line chart implementation
  const drawLineChart = (ctx: CanvasRenderingContext2D, data: ChartData, width: number, height: number) => {
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    const xStep = chartWidth / (data.labels.length - 1);
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.strokeStyle = '#ddd';
    ctx.stroke();
    
    // Draw labels
    ctx.font = '12px Arial';
    ctx.fillStyle = '#666';
    data.labels.forEach((label, i) => {
      const x = padding + i * xStep;
      ctx.fillText(label, x - label.length * 3, height - padding + 20);
    });
    
    // Draw datasets
    data.datasets.forEach((dataset, datasetIndex) => {
      const maxValue = Math.max(...dataset.data);
      const yScale = chartHeight / maxValue;
      
      ctx.beginPath();
      dataset.data.forEach((value, i) => {
        const x = padding + i * xStep;
        const y = height - padding - (value * yScale);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.strokeStyle = dataset.borderColor || colorPalette[datasetIndex % colorPalette.length];
      ctx.lineWidth = dataset.borderWidth || 2;
      ctx.stroke();
      
      // Fill area under the line if specified
      if (dataset.fill) {
        ctx.lineTo(padding + (dataset.data.length - 1) * xStep, height - padding);
        ctx.lineTo(padding, height - padding);
        ctx.fillStyle = dataset.backgroundColor || colorPalette[datasetIndex % colorPalette.length].replace('0.7', '0.2');
        ctx.fill();
      }
      
      // Draw legend
      ctx.fillStyle = dataset.borderColor || colorPalette[datasetIndex % colorPalette.length];
      ctx.fillRect(width - 120, 20 + datasetIndex * 20, 10, 10);
      ctx.fillStyle = '#666';
      ctx.fillText(dataset.label, width - 105, 30 + datasetIndex * 20);
    });
  };
  
  // Simple bar chart implementation
  const drawBarChart = (ctx: CanvasRenderingContext2D, data: ChartData, width: number, height: number) => {
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    const maxValue = Math.max(...data.datasets.flatMap(dataset => dataset.data));
    const yScale = chartHeight / maxValue;
    const xLabelStep = chartWidth / data.labels.length;
    const datasetCount = data.datasets.length;
    const barWidth = (xLabelStep * 0.8) / datasetCount;
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.strokeStyle = '#ddd';
    ctx.stroke();
    
    // Draw labels
    ctx.font = '12px Arial';
    ctx.fillStyle = '#666';
    data.labels.forEach((label, i) => {
      const x = padding + (i + 0.5) * xLabelStep;
      ctx.fillText(label, x - label.length * 3, height - padding + 20);
    });
    
    // Draw datasets
    data.datasets.forEach((dataset, datasetIndex) => {
      dataset.data.forEach((value, i) => {
        const x = padding + (i + 0.1) * xLabelStep + datasetIndex * barWidth;
        const barHeight = value * yScale;
        const y = height - padding - barHeight;
        
        ctx.fillStyle = Array.isArray(dataset.backgroundColor) 
          ? dataset.backgroundColor[i % dataset.backgroundColor.length] 
          : dataset.backgroundColor || colorPalette[datasetIndex % colorPalette.length];
          
        ctx.fillRect(x, y, barWidth, barHeight);
      });
      
      // Draw legend
      ctx.fillStyle = Array.isArray(dataset.backgroundColor) 
        ? dataset.backgroundColor[0] 
        : dataset.backgroundColor || colorPalette[datasetIndex % colorPalette.length];
      ctx.fillRect(width - 120, 20 + datasetIndex * 20, 10, 10);
      ctx.fillStyle = '#666';
      ctx.fillText(dataset.label, width - 105, 30 + datasetIndex * 20);
    });
  };
  
  // Simple pie/doughnut chart implementation
  const drawPieChart = (ctx: CanvasRenderingContext2D, data: ChartData, width: number, height: number, isDoughnut: boolean) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    const innerRadius = isDoughnut ? radius * 0.6 : 0;
    
    // Only using the first dataset for pie/doughnut
    const dataset = data.datasets[0];
    const total = dataset.data.reduce((sum, value) => sum + value, 0);
    
    let startAngle = 0;
    
    // Draw pie slices
    dataset.data.forEach((value, i) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      
      const color = Array.isArray(dataset.backgroundColor) 
        ? dataset.backgroundColor[i % dataset.backgroundColor.length] 
        : colorPalette[i % colorPalette.length];
      
      ctx.fillStyle = color;
      ctx.fill();
      
      if (isDoughnut) {
        // Create the inner circle for doughnut
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, innerRadius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.fill();
      }
      
      // Draw legend
      ctx.fillStyle = color;
      ctx.fillRect(width - 160, 20 + i * 20, 10, 10);
      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.fillText(`${data.labels[i]}: ${value} (${Math.round((value / total) * 100)}%)`, width - 145, 30 + i * 20);
      
      startAngle += sliceAngle;
    });
  };

  return (
    <div style={{ width: '100%', height: `${height}px` }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
} 