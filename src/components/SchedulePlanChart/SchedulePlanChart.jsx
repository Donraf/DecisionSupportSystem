import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";

import "./SchedulePlanChart.css";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import { useDiagramStore } from "../Stores/diagramStore";
import { useEditModalStore } from "../Stores/editModalStore";

export default function SchedulePlanChart({ data, schedulePlanId, id }) {
  const deleteDiagram = useDiagramStore((state) => state.deleteDiagram);
  const open = useEditModalStore((state) => state.open);

  return (
    <div className="SchedulePlanChart">
      <div className="ElementHeader">
        <b>Прогноз выполнения плана-графика</b>
        <div className="Icons">
          <button
            className="IconButton"
            onClick={() => open("SchedulePlanChartTab", id)}
          >
            <EditIcon />
          </button>
          <button className="IconButton" onClick={() => deleteDiagram(id)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div className="ChartName" style={{ marginBottom: "16px" }}>
        План-график: <b className="Parameter">{schedulePlanId}</b>
      </div>
      <div className="ChartContainer">
        <ResponsiveContainer width="100%" height="100%">
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
    </div>
  );
}
