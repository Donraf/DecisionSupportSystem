import { useEffect, useState } from "react";
import "./ForecastCompletionPage.css";
import Modal from "../../components/Modal/Modal";
import Header from "../../components/Header/Header";
import GridLayout from "react-grid-layout";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import axios from "axios";
import PlusIcon from "../../components/icons/PlusIcon";
import { useDiagramStore } from "../../components/Stores/diagramStore";
import EditModal from "../../components/Modal/EditModal";
import { addTaskChart } from "../../components/TaskChart/utils";
import { addSchedulePlanChart } from "../../components/SchedulePlanChart/utils";
import { addSchedulePlanTable } from "../../components/SchedulePlanTable/utils";

export default function ForecastCompletionPage() {
  const [modal, setModal] = useState(false);
  const [isElementsFetched, setIsElementsFetched] = useState(false);
  const diagrams = useDiagramStore((state) => state.diagrams);
  const setDiagrams = useDiagramStore((state) => state.setDiagrams);
  const onLayoutUpdate = useDiagramStore((state) => state.onLayoutUpdate);

  useEffect(() => {
    fetchCharts();
  }, []);

  async function fetchCharts() {
    setDiagrams([]);
    var charts = await axios.get("http://localhost:5000/api/allDiagrams");
    if (!charts.data) {
      setIsElementsFetched(true);
      return;
    }
    // console.log(JSON.parse(charts.data.diagrams));
    var diagramsJson = JSON.parse(charts.data.diagrams);
    for (var diagramInd in diagramsJson.completion_forecast) {
      var diagram = diagramsJson.completion_forecast[diagramInd];
      if (diagram.type === "ChartTask") {
        const taskData = await axios.get(
          "http://localhost:5000/api/task_logs/" + diagram.taskId
        );
        addTaskChart(
          taskData.data,
          diagram.schedulePlanId,
          diagram.scheduleId,
          diagram.taskId,
          diagram.employeeName,
          diagram.id,
          diagram.x,
          diagram.y,
          diagram.width,
          diagram.height
        );
      } else if (diagram.type === "SchedulePlanChart") {
        const schedulePlanData = await axios.get(
          "http://localhost:5000/api/schedule_plan_logs/" +
            diagram.schedulePlanId
        );
        addSchedulePlanChart(
          schedulePlanData.data,
          diagram.schedulePlanId,
          diagram.id,
          diagram.x,
          diagram.y,
          diagram.width,
          diagram.height
        );
      } else if (diagram.type === "SchedulePlanTable") {
        const schedulePlanData = await axios.get(
          "http://localhost:5000/api/tasks/schedulePlanId/" +
            diagram.schedulePlanId
        );
        addSchedulePlanTable(
          schedulePlanData.data,
          diagram.schedulePlanId,
          diagram.id,
          diagram.x,
          diagram.y,
          diagram.width,
          diagram.height
        );
      }
    }
    setIsElementsFetched(true);
  }

  return (
    <div className="grid-container">
      <Modal open={modal}>
        <button onClick={() => setModal(false)}>Закрыть</button>
      </Modal>
      <EditModal />
      <Header text="Прогноз выполнения">
        <button className="AddDiagramButton" onClick={() => setModal(true)}>
          <PlusIcon />
          <div>Добавить элемент</div>
        </button>
      </Header>
      <GridLayout
        className="layout"
        cols={25}
        rowHeight={30}
        width={2300}
        onLayoutChange={(layout) => {
          console.log("Layout Changed!", layout);
          if (isElementsFetched) {
            console.log("Need to sync with DB!", layout);
            onLayoutUpdate(layout);
          }
        }}
        draggableCancel=".ElementHeader"
      >
        {diagrams}
      </GridLayout>
    </div>
  );
}
