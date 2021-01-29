import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import NavBar from "./NavBar";
import "./Styles/Stats.css";
import axios from 'axios';
const url="https://localhost:5001";

function Stats() {
    const [stats, setStats] = useState([]);
    const [stats2, setStats2] = useState([]);
    
    useEffect(() => {
       loadData();
    }, [])

    const loadData=()=>{
        axios.get(url+'/api/Vouchers/stats')
        .then(res => {
           setStats(res.data);
        });

        axios.get(url+'/api/Vouchers/incomeStats')
        .then(res => {
           setStats2(res.data);
        });
    }
    const data= {
        labels: ['Styczeń', 'Luty', 'Marzec','Kwiecień', 'Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Pażdziernik','Listopad','Grudzień'],
        datasets: [{
            label: '# Ilość voucherów:',
            data: stats,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    }
    
const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }


  const data2 = {
    labels: ['Styczeń', 'Luty', 'Marzec','Kwiecień', 'Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Pażdziernik','Listopad','Grudzień'],
    datasets: [
      {
        label: 'Przychód miesięczny',
        data: stats2,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'grey',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }




    return (
        <div className="Stats">
            <NavBar />
            <h3>Ilość voucherów utworzonych w danym miesiącu </h3>
            <div className="chart">
                 <Bar data={data} options={options}/>
            </div>
            <h3>Przychód miesięczny</h3>
            <div className="chart">
                <Doughnut data={data2} />
            </div>
        </div>
    );
}

export default Stats;