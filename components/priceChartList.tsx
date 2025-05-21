"use client";
import { getTradeData } from "@/services/data.service";
import { formatDate, getDateRange } from "@/utils/utils";
import { ChartData } from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Dropdown from "@/components/dropdown";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = { artifact: string };

const PriceChartList = ({ artifact }: Props) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");
  const [station, setStation] = useState("");
  const [sortOpiton, setSortOption] = useState("");

  const stationOptionList = [
    {
      label: "Alpha Centauri",
      value: "Alpha Centauri",
    },
    {
      label: "Beta Hydri",
      value: "Beta Hydri",
    },
    {
      label: "Gamma Draconis",
      value: "Gamma Draconis",
    },
    {
      label: "Delta Pavonis",
      value: "Delta Pavonis",
    },
    {
      label: "Epsilon Indi",
      value: "Epsilon Indi",
    },
    {
      label: "All stations",
      value: "",
    },
  ];

  const sortOption = [
    {
      label: "From High to Low",
      value: "1",
    },
    {
      label: "From Low to High",
      value: "2",
    },
  ];
  useEffect(() => {
    setStatus("loading");
    getTradeData({
      artifact: decodeURIComponent(artifact),
      historic: "true",
      station,
    })
      .then((res) => {
        setStatus("done");
        setData(res);
      })
      .catch(() => {
        setStatus("done");
      });
  }, [artifact, station]);

  const onStationChange = (s: string) => {
    setStation(s);
  };

  const onSortOptionChange = (c: string) => {
    if (c === "2") {
      setData((d) => {
        const data = [...d];
        return data.sort(
          (
            a: {
              name: string;
              price: number;
              artifacts: { name: string; price: number; history: number[] }[];
            },
            b: {
              name: string;
              price: number;
              artifacts: { name: string; price: number; history: number[] }[];
            }
          ) => a.artifacts[0].price - b.artifacts[0].price
        );
      });
    }
    if (c === "1") {
      setData((d) => {
        const data = [...d];
        return data.sort(
          (
            a: {
              name: string;
              price: number;
              artifacts: { name: string; price: number; history: number[] }[];
            },
            b: {
              name: string;
              price: number;
              artifacts: { name: string; price: number; history: number[] }[];
            }
          ) => b.artifacts[0].price - a.artifacts[0].price
        );
      });
    }
    setSortOption(c);
  };

  return (
    <>
      <div className="pt-4 flex gap-2">
        <Dropdown
          options={stationOptionList}
          placeholder="Select station"
          onChange={onStationChange}
          selectedValue={station}
        />
        <Dropdown
          options={sortOption}
          placeholder="Sort Price"
          onChange={onSortOptionChange}
          selectedValue={sortOpiton}
        />
      </div>
      {status === "loading" && (
        <p className="text-center py-4">Loading Charts ...</p>
      )}
      {status === "done" && data && data?.length === 0 && (
        <p className="text-center py-4">No data found ...</p>
      )}
      <div className="grid md:grid-cols-2 gap-4 py-4">
        {data &&
          data.map(
            (chartData: {
              name: string;
              price: number;
              artifacts: { name: string; price: number; history: number[] }[];
            }) => (
              <LineChart
                key={chartData.name}
                {...{
                  currentPrice: chartData.artifacts[0].price,
                  station: chartData.name,
                  chartData: {
                    labels: getDateRange().map(formatDate),
                    datasets: [
                      {
                        label: "Last 10 days prices",
                        data: chartData.artifacts[0].history,
                        borderColor: "#9CCDDC",
                      },
                    ],
                  },
                }}
              />
            )
          )}
      </div>
    </>
  );
};

const LineChart = ({
  station,
  chartData,
  currentPrice,
}: {
  station: string;
  chartData: ChartData<"line">;
  currentPrice: number;
}) => {
  return (
    <div className="bg-primary p-4 rounded-lg shadow-lg">
      <h2 className="text-black font-semibold text-lg">{station}</h2>
      <p className="text-black text-2xl font-bold">{currentPrice}</p>
      <Line data={chartData} />
    </div>
  );
};

export default PriceChartList;
