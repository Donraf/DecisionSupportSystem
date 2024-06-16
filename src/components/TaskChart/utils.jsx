import { useDiagramStore } from "../Stores/diagramStore";
import ChartTask from "./TaskChart";

export function addTaskChart(
    data,
    schedulePlanId,
    scheduleId,
    taskId,
    employeeName,
    id,
    x = 0,
    y = 0,
    w = 6,
    h = 13,
    minW = 6,
    minH = 13) {
    const addDiagram = useDiagramStore.getState().addDiagram
    
    addDiagram(
        <div
            key={id}
            data-grid={{
                x: x,
                y: y,
                w: w,
                h: h,
                minW: minW,
                minH: minH,
            }}
        >
            <ChartTask
                data={data}
                schedulePlanId={schedulePlanId}
                scheduleId={scheduleId}
                taskId={taskId}
                employeeName={employeeName}
                id={id}
            />
        </div>
    );
}