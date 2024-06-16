import "./SchedulePlanTable.css";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import { useDiagramStore } from "../Stores/diagramStore";
import { useEditModalStore } from "../Stores/editModalStore";

export default function SchedulePlanTable({ data, schedulePlanId, id }) {
  const deleteDiagram = useDiagramStore((state) => state.deleteDiagram);
  const open = useEditModalStore((state) => state.open);
  console.log("fdsafasfdsd");
  console.log(data);

  return (
    <div className="TableContainer">
      <div className="ElementHeader">
        <b>Таблица выполнения задач плана-графика</b>
        <div className="Icons">
          <button
            className="IconButton"
            onClick={() => open("SchedulePlanTableTab", id)}
          >
            <EditIcon />
          </button>
          <button className="IconButton" onClick={() => deleteDiagram(id)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div className="TableName">
        План-график: <b className="Parameter">{schedulePlanId}</b>
      </div>
      <div className="SchedulePlanTableContainer">
        <table className="SchedulePlanTable">
          <thead>
            <tr>
              <th>ФИО</th>
              <th>ID расписания</th>
              <th>ID задачи</th>
              <th>Дата начала</th>
              <th>Дата окончания</th>
            </tr>
          </thead>
          <tbody>
            {data.map((task, index) => (
              <tr key={index}>
                <td>{task.employee_name}</td>
                <td>{task.schedule_id}</td>
                <td>{task.task_id}</td>
                <td>{task.start_date}</td>
                <td>{task.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
