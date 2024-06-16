import axios from "axios";
import ChartTask from "../TaskChart/TaskChart";
import { useDiagramStore } from "../Stores/diagramStore";
import { useEditModalStore } from "../Stores/editModalStore";

export default function ButtonEditTaskChart({
  fetchUrl,
  schedulePlanId,
  scheduleId,
  taskId,
  employeeName,
  elemId,
}) {
  const updateDiagram = useDiagramStore((state) => state.updateDiagram);
  const close = useEditModalStore((state) => state.close);

  const onClick = async () => {
    try {
      const res = await axios.get(fetchUrl);
      updateDiagram(
        elemId,
        <div
          key={elemId}
          data-grid={{ x: 0, y: 0, w: 6, h: 13, minW: 6, minH: 13 }}
        >
          <ChartTask
            data={res.data}
            schedulePlanId={schedulePlanId}
            scheduleId={scheduleId}
            taskId={taskId}
            employeeName={employeeName}
            id={elemId}
          />
        </div>
      );
      close();
    } catch (e) {
      console.log(e);
    }
  };
  return <button onClick={onClick}>Изменить элемент</button>;
}
