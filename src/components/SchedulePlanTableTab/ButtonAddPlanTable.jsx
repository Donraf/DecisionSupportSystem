import axios from "axios";
import { makeid } from "../../utils/utils";
import "./ButtonAddPlanTable.css";
import { addSchedulePlanTable } from "../SchedulePlanTable/utils";

export default function ButtonAddPlanTable({ fetchUrl, schedulePlanId }) {
  var id = makeid();
  const onClick = async () => {
    try {
      const res = await axios.get(fetchUrl);
      addSchedulePlanTable(res.data, schedulePlanId, id)
    } catch (e) {
      console.log(e);
    }
  };
  return <button onClick={onClick}>Добавить элемент</button>;
}
