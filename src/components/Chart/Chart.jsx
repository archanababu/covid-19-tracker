import React, {useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({data:{confirmed, recovered, deaths}}) =>{
    const [dailyData, setDailyData] = useState({});
  
    useEffect(() => {
      const fetchAPI = async () => {
        const initialDailyData = await fetchDailyData();  
        setDailyData(initialDailyData);
      };
  
      fetchAPI();

    }, []);

    const LineChart =(
        dailyData[0] ? (
            <Line
                data={{
                    label: dailyData.map(({date})=>date),
                    datasets: [{
                        date: dailyData.map(({data})=>data.confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    },{
                        date: dailyData.map(({data})=>data.deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true,
                    }]
                }}
            />        
        ) : null
    );

    return(
        <div className={styles.container}>
            {LineChart}         
        </div>
    )
}

export default Chart;