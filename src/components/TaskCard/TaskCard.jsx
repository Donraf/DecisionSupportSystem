import { useEffect, useState } from "react";
import { useScenarioPageStore } from "../Stores/scenarioPageStore";
import ExpandIcon from "../icons/ExpandIcon";
import "./TaskCard.css";
import ScenarioTaskChart from "../ScenarioTaskChart/ScenarioTaskChart";
import axios from "axios";

export default function TaskCard({
  employeeName,
  scheduleId,
  taskId,
  startDate,
  endDate,
  id,
}) {
  const currentTaskId = useScenarioPageStore((state) => state.currentTaskId);
  const setTaskId = useScenarioPageStore((state) => state.setTaskId);
  const [isCurrent, setIsCurrent] = useState(false);

  const [dataBefore, setDataBefore] = useState([])
  const [dataAfter, setDataAfter] = useState([])
  const [priority, setPriority] = useState(4)

  useEffect(() => {
    if (currentTaskId === id) {
      setIsCurrent(true);
      try {
        const fetchCharts = async () => {
          var res = await axios.get("http://localhost:5000/api/task_logs/SCT050844");
          if (res.data) {
            setDataBefore(res.data)
          }
          var res = await axios.get("http://localhost:5000/api/task_logs/SCT0508441");
          if (res.data) {
            setDataAfter(res.data)
          }
        }
        fetchCharts()
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsCurrent(false);
    }
  }, [currentTaskId]);

  function onClickExpandButton() {
    if (currentTaskId !== id) {
      setTaskId(id);
    } else {
      setTaskId("");
    }
  }

  return (
    <div className="TaskCard" id={isCurrent ? "activeTaskCard" : ""}>
      <div className="CardHeader">
        Задача {taskId}{" "}
        <button className="IconButton" onClick={() => onClickExpandButton()}>
          <ExpandIcon />
        </button>
      </div>
      <div className="Property">
        Исполнитель: <b className="Value">{employeeName}</b>
      </div>
      <div className="Property">
        Расписание: <b className="Value">{scheduleId}</b>
      </div>
      <div className="Property">
        Дата начала: <b className="Value">{startDate}</b>
      </div>
      <div className="Property">
        Дата окончания: <b className="Value">{endDate}</b>
      </div>
      {isCurrent &&
        <div>
          <hr className="Divider" />
          <div style={{paddingLeft: "8px", fontSize: "large"}}>
            <b>Изменяемые параметры:</b>
          </div>
          <div style={{paddingLeft: "8px"}}><b>Приоритет:</b></div>
          <div style={{paddingLeft: "8px"}}>Начальное значение: <b>4</b></div>
          <div style={{paddingLeft: "8px"}}>Измененное значение: <b><input></input></b></div>
          <button style={{marginLeft: "8px"}} onClick={() => setPriority(7)}>Применить изменения</button>
          <hr className="Divider" />
          <div className="ScenarioChartsContainer">
            <div style={{ height: "400px", width: "500px" }}>
              <div className="ForecastHeader">Прогноз до изменений</div>
              <ScenarioTaskChart data={dataBefore} />
            </div>
            <div style={{ height: "400px", width: "500px" }}>
              <div className="ForecastHeader">Прогноз после изменений</div>
              {priority===7 && <ScenarioTaskChart data={dataAfter} />}
            </div>
          </div>
        </div>
      }
    </div>
  );
}
