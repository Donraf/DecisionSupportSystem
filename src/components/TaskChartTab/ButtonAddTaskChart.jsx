import axios from "axios";
import { makeid } from "../../utils/utils";
import { addTaskChart } from "../TaskChart/utils";

export default function ButtonAddTaskChart({
  fetchUrl,
  schedulePlanId,
  scheduleId,
  taskId,
  employeeName,
}) {
  const onClick = async () => {
    try {
      const res = await axios.get(fetchUrl);
      var id = makeid();
      addTaskChart(res.data, schedulePlanId, scheduleId, taskId, employeeName, id)
    } catch (e) {
      console.log(e);
    }
  };
  return <button onClick={onClick}>Добавить элемент</button>;
}
