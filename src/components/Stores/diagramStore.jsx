import { create } from "zustand";
import axios from "axios";

export const useDiagramStore = create((set, get) => ({
  diagrams: [],
  diagramInfo: [],
  addDiagram: (diagram) => {
    console.log(get().diagrams);
    set((state) => ({ diagrams: state.diagrams.concat(diagram) }));
    //updateDiagrams (сделать так, чтобы координаты и размеры на сбрасывались после добавления -- привести массив diagrams в соответствие с digramInfo)
  },
  setDiagrams: (diagrams) => set(() => ({ diagrams: diagrams })),
  deleteDiagram: (diagramId) =>
    set((state) => ({
      diagrams: state.diagrams.filter((diagram) => diagram.key !== diagramId),
    })),
  updateDiagram: (diagramId, newDiagram) => {
    get().diagrams.forEach((diagram) => {
      if (diagram.key === diagramId) {
        get().deleteDiagram(diagramId);
        get().addDiagram(newDiagram);
      }
    });
  },
  onLayoutUpdate: (newLayout) => {
    set(() => ({ diagramInfo: { completion_forecast: [] } }));
    newLayout.forEach((element) => {
      var elemId = element.i;
      get().diagrams.forEach((diagram) => {
        if (elemId === diagram.props.children.props.id) {
          var infoObj = {};

          infoObj["width"] = element.w;
          infoObj["height"] = element.h;
          infoObj["y"] = element.y;
          infoObj["x"] = element.x;

          for (const [k, v] of Object.entries(diagram.props.children.props)) {
            if (k !== "data") {
              infoObj[k] = v;
            }
          }
          infoObj["type"]=diagram.props.children.type.name
          set((state) => ({
            diagramInfo: {
              completion_forecast:
                state.diagramInfo["completion_forecast"].concat(infoObj),
            },
          }));
        }
      });
    });
    console.log("UPDATED DIAGRAM INFO");
    axios.post("http://localhost:5000/api/allDiagrams/", get().diagramInfo);
  },
}));
