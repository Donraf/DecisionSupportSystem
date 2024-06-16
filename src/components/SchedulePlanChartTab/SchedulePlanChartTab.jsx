import { useEffect, useState } from "react";
import axios from "axios";
import "./SchedulePlanChartTab.css";
import ButtonAddSchedulePlanChart from "./ButtonAddSchedulePlanChart";

export default function SchedulePlanChartTab() {
  const [fetchUrl, setFetchUrl] = useState("");
  const [curSchedulePlanId, setCurSchedulePlanId] = useState("");
  const [schedulePlan, setSchedulePlan] = useState([]);

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
      <ButtonAddSchedulePlanChart
        fetchUrl={fetchUrl}
        schedulePlanId={curSchedulePlanId}
      ></ButtonAddSchedulePlanChart>
    </div>
  );
}
