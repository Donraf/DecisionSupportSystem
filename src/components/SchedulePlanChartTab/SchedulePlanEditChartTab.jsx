import { useEffect, useState } from "react";
import axios from "axios";
import "./SchedulePlanChartTab.css";
import ButtonEditSchedulePlanChart from "./ButtonEditSchedulePlanChart";
import { useEditModalStore } from "../Stores/editModalStore";

export default function SchedulePlanEditChartTab() {
  const [fetchUrl, setFetchUrl] = useState("");
  const [curSchedulePlanId, setCurSchedulePlanId] = useState("");
  const [schedulePlan, setSchedulePlan] = useState([]);

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
    setFetchUrl(
      "http://localhost:5000/api/schedule_plan_logs/" + schedulePlanId
    );
    setCurSchedulePlanId(schedulePlanId);
  }

  return (
    <div className="SchedulePlanChartTab">
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
      <ButtonEditSchedulePlanChart
        fetchUrl={fetchUrl}
        schedulePlanId={curSchedulePlanId}
        elemId={elemId}
      ></ButtonEditSchedulePlanChart>
    </div>
  );
}
