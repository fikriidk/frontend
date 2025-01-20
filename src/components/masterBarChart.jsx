import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth"
import { FaRegSquareCaretLeft } from "react-icons/fa6";
import Cookies from "js-cookie";

export default function MasterBarChart() {
  const [result, setResult] = useState([])

  const fetchData = async () => {
    try {
      const res = await axios.get('https://backend.ptwpi.co.id/api/barchart', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('authToken')}`
        }
      })
      setResult(res.data.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const chartConfig = {
    type: "bar",
    height: 200,
    
    series: [
      {
        name: "Supplier",
        data: [
          result[3]?.VALUE ?? 0,
          result[4]?.VALUE ?? 0,
          result[5]?.VALUE ?? 0,
          result[6]?.VALUE ?? 0,
          result[7]?.VALUE ?? 0,
          result[8]?.VALUE ?? 0,
          result[9]?.VALUE ?? 0,
          result[10]?.VALUE ?? 0,
          result[11]?.VALUE ?? 0,
          result[12]?.VALUE ?? 0,
          result[13]?.VALUE ?? 0,
          result[14]?.VALUE ?? 0,
        ],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#0E57A6"],
      plotOptions: {
        bar: {
          columnWidth: "50%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center px-2"
      >
        {/* <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div> */}
        <div>
          <Typography
            variant="h4"
            className="text-wpigreen-50 border-l-4 border-wpigreen-50 pl-1"
          >
            Registered Supplier
          </Typography>
          <Typography variant="lead" className="font">
            This chart is the progress of supplier registration every month.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
