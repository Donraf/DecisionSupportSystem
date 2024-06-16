import axios from "axios";
import "./ScenarioPage.css";
import { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard/TaskCard";
import HeaderScenario from "../../components/HeaderScenario/HeaderScenario";

export default function ScenarioPage() {
  const [schedulePlan, setSchedulePlan] = useState([]);
  const [schedulePlanTableData, setSchedulePlanTableData] = useState("");

  useEffect(() => {
    fetchSchedulePlans();
  }, []);

  async function fetchSchedulePlans() {
    await axios
      .get("http://localhost:5000/api/schedule_plans")
      .then((res) => setSchedulePlan(res.data.map((obj) => obj.id)));
  }

  async function onChangeSchedulePlansSelect(schedulePlanId) {
    var res = await axios.get(
      "http://localhost:5000/api/tasks/schedulePlanId/" + schedulePlanId
    );
    setSchedulePlanTableData(res.data);
  }

  return (<>
    <HeaderScenario />
    <div className="ScenarioPage">
      <div className="SelectName">План-график</div>
      <select
        onChange={(event) => {
          onChangeSchedulePlansSelect(event.target.value);
        }}
      >
        <option value="" selected disabled hidden>
          План-график
        </option>
        {schedulePlan.map((id) => {
          return <option key={"schedulePlanSelect" + id}>{id}</option>;
        })}
      </select>
      <div className="TaskCards">
        {schedulePlanTableData &&
          schedulePlanTableData.map((task) => (
            <TaskCard
              employeeName={task.employee_name}
              scheduleId={task.schedule_id}
              taskId={task.task_id}
              startDate={task.start_date}
              endDate={task.end_date}
              id={"TaskCard" + task.task_id}
            ></TaskCard>
          ))}
      </div>
    </div>
  </>
  );
}
