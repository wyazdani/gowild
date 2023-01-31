// import React from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Bar,
//   Tooltip
// } from "recharts";
// export default class Barchart extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { data: [] };
//   }

//   componentDidMount() {
//     this.getData();
//   }
//   getData = (page = "", size = 10, fromDate = "", toDate = "") => {
//     fetch(
//       // "https://api.stackexchange.com/2.2/tags?pagesize=30&order=desc&sort=popular&site=stackoverflow"
//       "https://api.stackexchange.com/2.2/tags?" +
//         new URLSearchParams({
//           page: page,
//           order: "desc",
//           sort: "popular",
//           site: "stackoverflow",
//           pagesize: size,
//           fromdate: fromDate,
//           todate: toDate
//         })
//     )
//       .then((response) => {
//         console.log("Barchart ~ response", response);
//         return response.json()
//       })

//       .then((json) => {
//         this.setState({ data: json.items });
//       });
//   };

//   render() {
//     const { data } = this.state;
//     return (
//       <div className="BarChart p-3">
//         <ResponsiveContainer width="100%" aspect={2}>
//           <BarChart
//             data={data}
//             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//           >
//             <CartesianGrid stroke="#ccc" />
//             <XAxis dataKey="name" />
//             <YAxis dataKey="count" />
//             <Tooltip />
//             <Bar type="monotone" dataKey="count" fill="#FF7851" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }
// }


import React, { useState, useEffect } from "react";
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

  const [state, setState] = useState([]);
  console.log("~ file: Barchart.js:82 ~ Barchart ~ state", state)


  const getData = (page = "", size = 10, fromDate = "", toDate = "") => {
    fetch(
      // "https://api.stackexchange.com/2.2/tags?pagesize=30&order=desc&sort=popular&site=stackoverflow"
      "https://api.stackexchange.com/2.2/tags?" +
      new URLSearchParams({
        page: page,
        order: "desc",
        sort: "popular",
        site: "stackoverflow",
        pagesize: size,
        fromdate: fromDate,
        todate: toDate
      })
    )
      .then((response) => {
        setState(response);
        console.log("Barchart ~ response", response);
        return response.json()
      })

      .then((json) => {
        setState({ data: json.items });
      });
  };

  useEffect(() => {
    getData();
  }, [])


  return (
    <>
      <div className="BarChart p-3">
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart 
            data={state.data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#ccc"  />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar type="monotone" dataKey="count" barSize={20}   fill="#FF7851" />
            {/* <Bar type="monotone" dataKey="has_synonyms" barSize={20}   fill="#FF7851" /> */}
            {/* <Bar type="monotone" dataKey="name"  fill="#FF7851" /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default Barchart;