
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
  Tooltip
} from "recharts";



const Barchart = () => {

  // const [state, setState] = useState([]);
  // console.log("~ file: Barchart.js:82 ~ Barchart ~ state", state)
  const [content, setContent] = useState([]);
  console.log("🚀 ~ file: Barchart.js:24 ~ Barchart ~ content", content)
  const [isLoader, setIsLoader] = useState(false);


  const subAdminAllData = async (page = "", size = 8, fromDate = "", toDate = "") => {
      await AuthService.getMethod(`${ENDPOINT.dashboards.bar_listing}`, true)
      .then((res) => {
          setContent(res.data.data);
          console.log("log" , res.data.data[0].status.isActive);
          setIsLoader(true);
          
      })
      .catch((err) => {
          swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
      });
  };


  // const getData = (page = "", size = 10, fromDate = "", toDate = "") => {
  //   fetch(
  //     // "https://api.stackexchange.com/2.2/tags?pagesize=30&order=desc&sort=popular&site=stackoverflow"
  //     "https://api.stackexchange.com/2.2/tags?" +
  //     new URLSearchParams({
  //       page: page,
  //       order: "desc",
  //       sort: "popular",
  //       site: "stackoverflow",
  //       pagesize: size,
  //       fromdate: fromDate,
  //       todate: toDate
  //     })
  //   )
  //     .then((response) => {
  //       setState(response);
  //       console.log("Barchart ~ response", response);
  //       return response.json()
  //     })

  //     .then((json) => {
  //       setState({ data: json.items });
  //     });
  // };

  useEffect(() => {
    // getData();
    subAdminAllData();
  }, [])


  if (!isLoader) {
    return (
        <div className='loader'>
            <h3>Loading...</h3>
        </div>
    );
}


    // convert date format to month / day / year
    function formatDate(date) {

      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2)
          month = '0' + month;
      if (day.length < 2)
          day = '0' + day;

      return [month, day, year].join('-');
  }


  return (
    <>
      <div className="BarChart p-3">
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart 
            data={content}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
             {/* {(formatDate(createdDate))} */}
            <CartesianGrid stroke="#ccc"  />
            <XAxis dataKey="createdDate" />
            <YAxis  />
            <Tooltip />
            <Bar type="monotone" dataKey="firstName" barSize={20}   fill="#FF7851" />
            <Bar type="monotone" dataKey="email" barSize={20}   fill="#FF7851" />
            {/* <Bar type="monotone" dataKey="name"  fill="#FF7851" /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default Barchart;