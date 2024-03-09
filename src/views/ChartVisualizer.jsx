import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";


function ChartVisualizer(props){


    function parseLeadingZeros(number){
        const n = number.toString();
        return n.length == 1 ? "0" + n : n
      }
    
      function parseTime(datetime){
        const d = new Date(datetime);

        return parseLeadingZeros(d.getHours()) + ":" + parseLeadingZeros(d.getMinutes());
       
      }
      
  
 
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
      });

      useEffect(()=>{
        setChartData({
            labels: props.data && props.data.map((data) => parseTime(data.time)).slice(0,22).reverse(), 
            datasets: [
              {
                type:"line",
                label: "Latency",
                data: props.data && props.data.map((data) => data.latency || 0).slice(0,22).reverse(),
                backgroundColor: "#d8b4fe",
                borderColor:"#ffffff81",
                pointHoverRadius: 6,
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 4,
                pointRadius: 5,
                pointHitRadius: 16,
                lineTension: 0.4,
                radius: 6,
              },
              {
                type:"bar",
                label: "Online",
                data: props.data && props.data.map((data) => data.online ? 100 : 0).slice(0,100).reverse(),
                backgroundColor: "#99f6e33e",
                pointHoverRadius: 6,
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 4,
                pointRadius: 1,
                pointHitRadius: 16,
                borderRadius:6,
                radius: 6,
              }
            ]
          })
      },[props.data])

      return (
        <div className="bg-gray-800 text-white">
          <Line
            data={chartData}
            height="90px"
            options={{
                responsive:true,
                plugins: {
                tooltips: {
                    backgroundColor: '#fff',
                    displayColors: false,
                    titleFontColor: '#000',
                    bodyFontColor: '#000'

                },
                title: {
                    text:"Latency over time",
                    display: true,
                },
                legend: {
                  display: false,
                },
                scales: {
                    xAxes: [{
                      display: false
                    }],
                    yAxes: [{
                      display: false
                    }],
                },
              }
            }}
          />
        </div>
      );
}

export default ChartVisualizer