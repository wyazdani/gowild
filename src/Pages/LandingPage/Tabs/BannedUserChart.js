
import React, { useState, useEffect } from "react";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
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

const BannedUserChart = (props) => {


  return (
    <>
        <div className="BarChart p-3">
            {props.bannedContent.length>0 && <ResponsiveContainer width="100%" aspect={3}>
                <BarChart
                    data={props.bannedContent}
                    margin={{ top: 60, right: 0, left: 0, bottom: 30 }}
                    barSize={20}
                >
                    <CartesianGrid stroke="#DFE2E5" strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tickFormatter={(date) => moment(date).format("D")}
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
                    <Bar type="monotone" dataKey="count" fill="#FF7851" />
                    <text x="45%" y="0" dominantBaseline="hanging" textAnchor="top"  width='100%' fontSize="20" fontWeight="bold">{new Date().toLocaleDateString("en-GB", { year: 'numeric', month: 'long'})}</text>
                </BarChart>
            </ResponsiveContainer>}
            {props.bannedContent.length===0 && <div> No Banned Users in {new Date().toLocaleDateString("en-GB", { year: 'numeric', month: 'long'})}</div>}
      </div>
    </>
  )
}

export default BannedUserChart;