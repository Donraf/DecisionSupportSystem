import axios from "axios";
import SchedulePlanChart from "../SchedulePlanChart/SchedulePlanChart";
import { useDiagramStore } from "../Stores/diagramStore";
import { useEditModalStore } from "../Stores/editModalStore";

export default function ButtonEditSchedulePlanChart({
  fetchUrl,
  schedulePlanId,
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
          data-grid={{ x: 0, y: 0, w: 6, h: 10, minW: 6, minH: 10 }}
        >
          <SchedulePlanChart
            data={res.data}
            schedulePlanId={schedulePlanId}
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
