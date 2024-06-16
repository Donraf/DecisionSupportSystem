import { FORECAST_COMPLETION__PAGE_PATH, LICENSE_PAGE_PATH, SCENARIOS_PAGE_PATH } from "../../constants/pagePath";
import CheckmarkIcon from "../icons/CheckmarkIcon";
import DocumentIcon from "../icons/DocumentIcon";
import LightbulbIcon from "../icons/LightbulbIcon";

export const SidebarData = [
  {
    title: "Прогноз выполнения",
    icon: <CheckmarkIcon />,
    link: FORECAST_COMPLETION__PAGE_PATH,
  },
  {
    title: "Прогноз лицензий",
    icon: <DocumentIcon />,
    link: LICENSE_PAGE_PATH,
  },
  {
    title: "Сценарии",
    icon: <LightbulbIcon />,
    link: SCENARIOS_PAGE_PATH,
  },
];
