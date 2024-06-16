import { useEffect, useState } from "react";
import axios from "axios";
import "./SchedulePlanTableTab.css";
import ButtonEditPlanTable from "./ButtonEditPlanTable";
import { useEditModalStore } from "../Stores/editModalStore";

export default function SchedulePlanEditTableTab() {
  const [fetchUrl, setFetchUrl] = useState("");
  const [schedulePlan, setSchedulePlan] = useState([]);
  const [curSchedulePlanId, setCurSchedulePlanId] = useState("");

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
    setCurSchedulePlanId(schedulePlanId);
    setFetchUrl(
      "http://localhost:5000/api/tasks/schedulePlanId/" + schedulePlanId
    );
  }

  return (
    <div className="SchedulePlanTableTab">
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
          {schedulePlan.map((id, ind) => {
            return <option key={"schedulePlanSelect" + id}>{id}</option>;
          })}
        </select>
      </div>
      <ButtonEditPlanTable
        fetchUrl={fetchUrl}
        schedulePlanId={curSchedulePlanId}
        elemId={elemId}
      ></ButtonEditPlanTable>
    </div>
  );
}
