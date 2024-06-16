import { useEffect, useState } from "react";
import axios from "axios";
import "./TaskChartTab.css";
import ButtonEditTaskChart from "./ButtonEditTaskChart";
import { useEditModalStore } from "../Stores/editModalStore";

const SCHEDULE_PLAN_SELECT = "schedulePlanSelect";
const SCHEDULE_SELECT = "scheduleSelect";
const EMPLOYEE_SELECT = "employeeSelect";

export default function TaskChartEditTab() {
  const [fetchUrl, setFetchUrl] = useState("");

  const [currentSelect, setCurrentSelect] = useState("");

  const [schedulePlan, setSchedulePlan] = useState([]);
  const [curSchedulePlanId, setCurSchedulePlanId] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [curScheduleId, setCurScheduleId] = useState("");
  const [employee, setEmployee] = useState([]);
  const [curEmployeeName, setCurEmployeeName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [curTaskId, setCurTaskId] = useState("");

  const elemId = useEditModalStore((state) => state.editElemId);

  useEffect(() => {
    fetchSchedulePlans();
  }, []);

  async function fetchSchedulePlans() {
    await axios
      .get("http://localhost:5000/api/schedule_plans")
      .then((res) => setSchedulePlan(res.data.map((obj) => obj.id)));
  }

  async function onChangeSchedulePlansSelect(schedulePlanId) {
    setCurrentSelect(SCHEDULE_PLAN_SELECT);
    setCurSchedulePlanId(schedulePlanId);
    setSchedule([]);
    setEmployee([]);
    setTasks([]);
    await fetchSchedules(schedulePlanId);
  }

  async function fetchSchedules(schedulePlanId) {
    await axios
      .get(
        "http://localhost:5000/api/schedules/schedulePlanId/" + schedulePlanId
      )
      .then((res) => setSchedule(res.data.map((obj) => obj.id)));
  }

  async function onChangeSchedulesSelect(scheduleId) {
    setCurrentSelect(SCHEDULE_SELECT);
    setCurScheduleId(scheduleId);
    setEmployee([]);
    setTasks([]);
    await fetchEmployees(scheduleId);
  }

  async function fetchEmployees(scheduleId) {
    await axios
      .get("http://localhost:5000/api/employees/scheduleId/" + scheduleId)
      .then((res) => setEmployee(res.data));
  }

  async function onChangeEmployeesSelect(scheduleId, employeeName) {
    setCurrentSelect(EMPLOYEE_SELECT);
    setCurEmployeeName(employeeName);
    setTasks([]);
    var employeeId = -1;
    for (var i in employee) {
      if (employee[i].name === employeeName) {
        employeeId = employee[i].id;
        console.log(employeeId);
        break;
      }
    }
    await fetchTasks(scheduleId, employeeId);
  }

  async function fetchTasks(scheduleId, employeeId) {
    await axios
      .get(
        "http://localhost:5000/api/tasks/scheduleIdEmployeeId/" +
          scheduleId +
          "-" +
          employeeId
      )
      .then((res) => setTasks(res.data.map((obj) => obj.id)));
  }

  async function onChangeTasksSelect(taskId) {
    setFetchUrl("http://localhost:5000/api/task_logs/" + taskId);
    setCurTaskId(taskId);
  }

  return (
    <div className="TaskChartTab">
      <div>
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
      </div>

      <div>
        <div className="SelectName">Расписание</div>
        <select
          disabled={
            currentSelect === SCHEDULE_PLAN_SELECT ||
            currentSelect === SCHEDULE_SELECT ||
            currentSelect === EMPLOYEE_SELECT
              ? false
              : true
          }
          onChange={(event) => onChangeSchedulesSelect(event.target.value)}
        >
          <option value="" selected hidden>
            Расписание
          </option>
          {schedule.map((id) => {
            return <option key={"scheduleSelect" + id}>{id}</option>;
          })}
        </select>
      </div>

      <div>
        <div className="SelectName">Сотрудник</div>
        <select
          disabled={
            currentSelect === SCHEDULE_SELECT ||
            currentSelect === EMPLOYEE_SELECT
              ? false
              : true
          }
          onChange={(event) =>
            onChangeEmployeesSelect(curScheduleId, event.target.value)
          }
        >
          <option value="" selected hidden>
            Сотрудник
          </option>
          {employee.map((obj, ind) => {
            return <option key={"employeeSelect" + obj.id}>{obj.name}</option>;
          })}
        </select>
      </div>

      <div>
        <div className="SelectName">Задача</div>
        <select
          disabled={currentSelect === EMPLOYEE_SELECT ? false : true}
          onChange={(event) => onChangeTasksSelect(event.target.value)}
        >
          <option value="" selected hidden>
            Задача
          </option>
          {tasks.map((id) => {
            return <option key={"taskSelect" + id}>{id}</option>;
          })}
        </select>
      </div>

      <ButtonEditTaskChart
        fetchUrl={fetchUrl}
        schedulePlanId={curSchedulePlanId}
        scheduleId={curScheduleId}
        taskId={curTaskId}
        employeeName={curEmployeeName}
        elemId={elemId}
      ></ButtonEditTaskChart>
    </div>
  );
}
