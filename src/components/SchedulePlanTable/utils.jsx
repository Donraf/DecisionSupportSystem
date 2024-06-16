import { useDiagramStore } from "../Stores/diagramStore";
import SchedulePlanTable from "./SchedulePlanTable";

export function addSchedulePlanTable(
    data,
    schedulePlanId,
    id,
    x = 0,
    y = 0,
    w = 6,
    h = 7,
    minW = 6,
    minH = 7) {
    const addDiagram = useDiagramStore.getState().addDiagram

    addDiagram(
        <div key={id} data-grid={{ x: x, y: y, w: w, h: h, minW: minW, minH: minH }}>
            <SchedulePlanTable
                data={data}
                schedulePlanId={schedulePlanId}
                id={id}
            />
        </div>
    );
}