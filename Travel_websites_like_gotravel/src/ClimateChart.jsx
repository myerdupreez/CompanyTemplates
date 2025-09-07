import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart } from 'recharts';


export const climateData = [
  { month: 'Jan', temp: 21, rain: 14 },
  { month: 'Feb', temp: 21, rain: 17 },
  { month: 'Mar', temp: 20, rain: 20 },
  { month: 'Apr', temp: 18, rain: 41 },
  { month: 'May', temp: 16, rain: 69 },
  { month: 'Jun', temp: 14, rain: 93 },
  { month: 'Jul', temp: 13, rain: 82 },
  { month: 'Aug', temp: 13, rain: 77 },
  { month: 'Sep', temp: 14, rain: 40 },
  { month: 'Oct', temp: 16, rain: 30 },
  { month: 'Nov', temp: 18, rain: 17 },
  { month: 'Dec', temp: 20, rain: 17 },
];

const ClimateChart = (props) => {
  const { chartTitle, tempLabel, rainLabel, legendTemp, legendRain, tooltipTemp, tooltipRain, sourceNote, months } = props;
  // Map climateData to use translated month names
  const translatedData = climateData.map((item, idx) => ({ ...item, month: months[idx] }));
  const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        const monthName = months && months[label] ? months[label] : label;
    // Try both possible keys for backward compatibility
    const tempObj = payload.find(p => p.dataKey === 'temperature' || p.dataKey === 'temp');
    const rainObj = payload.find(p => p.dataKey === 'rainfall' || p.dataKey === 'rain');
        // Show value if it is a number (including 0), otherwise show '--'
        const tempValue = (tempObj && tempObj.value !== undefined && tempObj.value !== null) ? tempObj.value : '--';
        const rainValue = (rainObj && rainObj.value !== undefined && rainObj.value !== null) ? rainObj.value : '--';
        return (
          <div className="bg-white/95 border border-gold/60 rounded-lg px-4 py-2 shadow-lg text-sm text-gray-900">
            <div className="font-semibold mb-1">{monthName}</div>
          <div>{legendTemp}: <span className="font-bold">{tempValue}</span> °C</div>
          <div>{legendRain}: <span className="font-bold">{rainValue}</span> mm</div>
          </div>
        );
      }
      return null;
    };
  return (
    <div className="w-full max-w-3xl mx-auto my-12 bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-gold text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
        {chartTitle}
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={translatedData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" orientation="left" label={{ value: tempLabel, angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: rainLabel, angle: 90, position: 'insideRight' }} />
          <Tooltip content={propsTooltip => <CustomTooltip {...propsTooltip} tooltipTemp={tooltipTemp} tooltipRain={tooltipRain} rainLabel={rainLabel} />} />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#bfa046" strokeWidth={3} name={legendTemp} />
          <Bar yAxisId="right" dataKey="rain" fill="#6ec1e4" name={legendRain} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center text-gray-600 text-sm mt-2">{sourceNote}</p>
    </div>
  );
};

export default ClimateChart;
