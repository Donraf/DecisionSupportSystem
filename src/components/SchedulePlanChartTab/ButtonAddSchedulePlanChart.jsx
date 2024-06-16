import axios from "axios";
import { makeid } from "../../utils/utils";
import { addSchedulePlanChart } from "../SchedulePlanChart/utils";

export default function ButtonAddSchedulePlanChart({ fetchUrl, schedulePlanId }) {
  var id = makeid();
  const onClick = async () => {
    try {
      const res = await axios.get(fetchUrl);
      addSchedulePlanChart(res.data, schedulePlanId, id)
    } catch (e) {
      console.log(e);
    }
  };
  return <button onClick={onClick}>Добавить элемент</button>;
}
