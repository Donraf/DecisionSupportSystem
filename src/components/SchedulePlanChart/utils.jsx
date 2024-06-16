import { useDiagramStore } from "../Stores/diagramStore";
import SchedulePlanChart from "./SchedulePlanChart";

export function addSchedulePlanChart(
    data,
    schedulePlanId,
    id,
    x = 0,
    y = 0,
    w = 6,
    h = 10,
    minW = 6,
    minH = 10) {
    const addDiagram = useDiagramStore.getState().addDiagram

    addDiagram(
        <div
            key={id}
            data-grid={{ x: x, y: y, w: w, h: h, minW: minW, minH: minH }}
        >
            <SchedulePlanChart
                data={data}
                schedulePlanId={schedulePlanId}
                id={id}
            />
        </div>
    );
}