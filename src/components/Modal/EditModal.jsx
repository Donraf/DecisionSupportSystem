import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";
import { useEditModalStore } from "../Stores/editModalStore";
import TaskChartEditTab from "../TaskChartTab/TaskEditChartTab";
import SchedulePlanEditTableTab from "../SchedulePlanTableTab/SchedulePlanEditTableTab";
import SchedulePlanEditChartTab from "../SchedulePlanChartTab/SchedulePlanEditChartTab";

const TASK_CHART_TAB = "TaskChartTab";
const SCHEDULE_PLAN_CHART_TAB = "SchedulePlanChartTab";
const SCHEDULE_PLAN_TABLE_TAB = "SchedulePlanTableTab";

export default function EditModal({ children }) {
  const dialog = useRef();
  const isOpened = useEditModalStore((state) => state.isOpened);
  const close = useEditModalStore((state) => state.close);
  const currentTab = useEditModalStore((state) => state.currentTab);

  useEffect(() => {
    if (isOpened) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isOpened]);

  return createPortal(
    <dialog ref={dialog}>
      <div className="Modal">
        <div className="SelectName">Изменить элемент</div>
        {currentTab === TASK_CHART_TAB && <TaskChartEditTab />}
        {currentTab === SCHEDULE_PLAN_CHART_TAB && <SchedulePlanEditChartTab />}
        {currentTab === SCHEDULE_PLAN_TABLE_TAB && <SchedulePlanEditTableTab />}
        <button onClick={() => close()}>Закрыть</button>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
