import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "./url";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Legend} from 'recharts';


export default function Charts() {
    
    const [date, setdate] = useState({
        startdt: "2024-04-06",
        enddt: "2024-06-18"
    })
    function useQuery() {
        return new URLSearchParams(window.location.search);
    }
    const query = useQuery();

    const [info, setinfo] = useState([]);
    const obj = {
        
        SP_NAME: "GET_SALES",
        START_DT: query.get('start_dt'),
        END_DT: query.get('end_dt'),
        COMP_CD: query.get('comp_cd'),
        LOC_CD: query.get('loc_cd')
    }


    const fetchData = async () => {
        try {
            const newurl = new URLSearchParams()
            const response = await axios.post(url, obj);
            const result = await response.data;
            const formattedData = result.map(item => ({
                montH_YEAR: item.montH_YEAR,
                gooD_WT: item.gooD_WT,
                rR_WT: item.rR_WT,
                inhousE_REJ_WT: item.inhousE_REJ_WT,
                montH_CD: item.montH_CD

            }));
            setinfo(formattedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    //---------------------Manually insert date----------------//

    const ResultData = {
        SP_NAME: "GET_SALES",
        START_DT: date.startdt.replace("-", "").replace("-", ""),
        END_DT: date.enddt.replace("-", "").replace("-", ""),
        COMP_CD: query.get('comp_cd'),
        LOC_CD: query.get('loc_cd')
    }
    console.log(date.startdt);
    console.log(date.enddt);

    const onsubmit = async (e) => {
        e.preventDefault();

        try {
            const response1 = await axios.post(url, ResultData);
            const result = await response1.data;
            const formattedData = result.map(item => ({
                montH_YEAR: item.montH_YEAR,
                gooD_WT: item.gooD_WT,
                rR_WT: item.rR_WT,
                inhousE_REJ_WT: item.inhousE_REJ_WT,
                montH_CD: item.montH_CD

            }));
            setinfo(formattedData);
        } catch (error) { }
    }

    const handlechange = (e) => {
        e.preventDefault();
        setdate({ ...date, [e.target.id]: e.target.value });
    }

    useEffect(() => {
        fetchData();
        //onsubmit();
    }, []);


    return (
        <>
            <div className="container mt-4">
                <div className="d-flex align-items-center mb-3">
                    <p className="mb-0 me-2">Start Date</p>
                    <input type="date" class="form-control me-3" id="startdt" style={{ maxWidth: "150px" }} value={date.startdt} onChange={handlechange} />
                    <p className="mb-0 me-2">End Date</p>
                    <input type="date" class="form-control me-3" id="enddt" style={{ maxWidth: "150px" }} value={date.enddt} onChange={handlechange} defaultValue={'20240631'} />
                    <button type="button" class="btn btn-primary" id="enddt" onClick={(e) => { onsubmit(e) }}>Show</button>
                </div>
            </div>


            <div className="chart-container " style={{ marginTop: "20px" }}>
            <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                        data={info}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 20,
                            bottom: 8,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="montH_YEAR" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="gooD_WT"
                            fill="#B3CDAD"
                            activeBar={<Rectangle fill="pink" stroke="blue" />}
                        />
                        <Bar
                            dataKey="inhousE_REJ_WT"
                            fill="#FF5F5E"
                            activeBar={<Rectangle fill="gold" stroke="purple" />}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}
