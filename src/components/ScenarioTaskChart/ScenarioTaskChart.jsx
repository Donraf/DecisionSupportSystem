import { Tooltip } from "@mui/material";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import "../TaskChart/TaskChart.css"

export default function ScenarioTaskChart({ data }) {
    return (
        <div className="ChartContainer">
            <ResponsiveContainer width="100%" height="100%" minHeight="400px" minWidth="500px">
                <LineChart data={data} className="container">
                    <CartesianGrid stroke="#ccc" />
                    <XAxis
                        label={{ value: "Дата", position: "insideBottom" }}
                        dataKey="log_date"
                        height={40}
                    />
                    <YAxis
                        padding={{ top: 2, bottom: 2 }}
                        type="number"
                        allowDataOverflow
                        label={{
                            value: "% завершения",
                            angle: -90,
                            position: "insideLeft",
                        }}
                        width={50}
                        tickCount={12}
                        domain={[0, 100]}
                    />
                    <Legend />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="planned_work"
                        stroke="#1F77B4"
                        dot={false}
                        strokeWidth={3}
                        name="План"
                    />
                    <Line
                        type="monotone"
                        dataKey="actual_work"
                        stroke="#D62728"
                        dot={false}
                        strokeWidth={3}
                        name="Факт"
                    />
                    <Line
                        type="monotone"
                        dataKey="necessary_work"
                        stroke="#4DAF4A"
                        dot={false}
                        strokeWidth={3}
                        name="Необходимо произвести"
                    />
                    <Line
                        type="monotone"
                        dataKey="forecast_work"
                        stroke="#FFA10E"
                        dot={false}
                        strokeWidth={3}
                        name="Прогноз"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}