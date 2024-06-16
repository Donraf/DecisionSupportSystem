import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";
import TaskChartTab from "../TaskChartTab/TaskChartTab";
import SchedulePlanChartTab from "../SchedulePlanChartTab/SchedulePlanChartTab";
import SchedulePlanTableTab from "../SchedulePlanTableTab/SchedulePlanTableTab";

const TASK_CHART_TAB = "TaskChartTab";
const SCHEDULE_PLAN_CHART_TAB = "SchedulePlanChartTab";
const SCHEDULE_PLAN_TABLE_TAB = "SchedulePlanTableTab";

const DEFAULT_CHART_TAB = TASK_CHART_TAB;

export default function Modal({ children, open }) {
  const dialog = useRef();
  const [chartTab, setChartTab] = useState(DEFAULT_CHART_TAB);

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog}>
      <div className="Modal">
        <div className="SelectName">Добавить элемент на рабочий экран</div>
        <div className="SelectName">Тип элемента</div>
        <select
          className="Select"
          id="selectChart"
          defaultValue={DEFAULT_CHART_TAB}
          onChange={(event) => {
            setChartTab(event.target.value);
          }}
        >
          <option className="Option" value={TASK_CHART_TAB}>
            Прогноз выполнения задачи
          </option>
          <option className="Option" value={SCHEDULE_PLAN_CHART_TAB}>
            Прогноз выполнения плана-графика
          </option>
          <option className="Option" value={SCHEDULE_PLAN_TABLE_TAB}>
            Таблица выполнения задач плана-графика
          </option>
        </select>
        {chartTab === TASK_CHART_TAB && <TaskChartTab />}
        {chartTab === SCHEDULE_PLAN_CHART_TAB && <SchedulePlanChartTab />}
        {chartTab === SCHEDULE_PLAN_TABLE_TAB && <SchedulePlanTableTab />}
        {children}
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
