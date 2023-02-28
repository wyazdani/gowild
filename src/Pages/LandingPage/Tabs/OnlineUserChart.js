import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend
} from "recharts";
import moment from 'moment';


const OnlineUserChart = (props) => {

  return (
    <>
      <div className="BarChart p-3">
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart
              data={props.onlineContent}
              margin={{ top: 60, right: 0, left: 0, bottom: 30 }}
              barSize={20}
          >
            <CartesianGrid stroke="#DFE2E5" strokeDasharray="3 3" />
            <XAxis
                dataKey="date"
                tickFormatter={(date) => moment(date).format("M-D-YYYY")}
                fontSize="12px"
            />
            <YAxis
                fontSize="12px"
            />
            <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  border: 'none',
                  boxShadow: '0 0 10px -5px rgba(0,0,0,0.5)',
                  fontSize: '12px',
                  borderRadius: '5px',
                  color: "#000",
                }}
            />
            <Legend />
            <Bar type="monotone" dataKey="count" fill="#FF7851" />
            <text x="45%" y="0" dominantBaseline="hanging" textAnchor="top"  width='100%' fontSize="20" fontWeight="bold">January 2019</text>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default OnlineUserChart;