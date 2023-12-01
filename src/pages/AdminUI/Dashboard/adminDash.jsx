import React, { Component,useState,useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import { createRoot } from "react-dom/client";
import { adminAxiosInstant } from "../../../utils/axiosUtils";


const ActiveUsersGuideChart = () => {
    const [chartData, setChartData] = useState({
      series: [],
      options: {
        chart: { height: 350, type: 'treemap' },
        title: { text: 'Active Users & Guides Chart' },      },
    });
  
    useEffect(() => {
      // Fetch data from the backend
      adminAxiosInstant.get('/active-users-guide-count')
        .then(response => response.data)
        .then(data => {
          // Transform data for ApexCharts
          const transformedData = {
            active_users_series: {
              name: 'Active Users',
              type: 'line', // Set the type to 'line' for a line chart
              data: data.active_users_count_by_date.map(item => ({
                x: item.join_date,
                y: item.count,
              })),
            },
            active_guides_series: {
              name: 'Active Guides',
              type: 'line', // Set the type to 'line' for a line chart
              data: data.active_guides_count_by_date.map(item => ({
                x: item.join_date,
                y: item.count,
              })),
            },
          };
  
          // Update chartData state
          setChartData({
            series: [transformedData.active_users_series, transformedData.active_guides_series],
            options: {
              // ... (rest of your options)
            },
          });
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []); // Empty dependency array to run effect only once
  
    return (
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
      </div>
    );
  };
  
 
class PlaceChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{ data: [] }],
            options: {
                legend: { show: false },
                chart: { height: 350, type: 'treemap' },
                title: { text: 'Trip Place & Budget Chart' },
            },
        };
    }

    componentDidMount() {
        // Fetch data from Django API
        adminAxiosInstant.get('main_place_data/')
            .then((response) => {
                const series = [{ data: response.data.map(place => ({ x: place.main_place, y: place.budget })) }];
                this.setState({ series });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="treemap" height={350} />
            </div>
        );
    }
}


const TripPlaceBudgetPieChart = () => {
    const [chartData, setChartData] = useState({
      series: [],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    });
  
    useEffect(() => {
      // Fetch data from the backend
      adminAxiosInstant.get('main-place-data/')  // Update the endpoint
        .then(response => response.data)
        .then(data => {
          // Transform data for ApexCharts
          const transformedData = {
            series: data.map(item => item.budget),
            labels: data.map(item => item.main_place),
          };
  
          // Update chartData state
          setChartData({
            series: transformedData.series,
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: transformedData.labels,
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
                    },
                    legend: {
                      position: 'bottom',
                    },
                  },
                },
              ],
            },
          });
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []); // Empty dependency array to run effect only once
  
    return (
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={380} />
      </div>
    );
  };
  
 

export default function AdminDash() {
  return (
     <>
      <PlaceChart/>
      <div className='mt-4'>
      <ActiveUsersGuideChart />
      </div>
      <TripPlaceBudgetPieChart/>

      </>  
   
  );
}

// Use createRoot from "react-dom/client"
const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);
root.render(<AdminDash />);
