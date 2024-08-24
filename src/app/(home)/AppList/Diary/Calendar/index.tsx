import { memo } from "react";
import { Calendar } from "antd";

import Cell from "./Cell";
import Header from "./Header";
import scss from "./index.module.scss";
import useCalendarSearch from "../hooks/useCalendarSearch";

const Main = () => {
  useCalendarSearch();

  return (
    <Calendar
      className={scss.calendar}
      fullCellRender={(date) => <Cell date={date} />}
      headerRender={(params) => <Header {...params} />}
    />
  );
};

export default memo(Main);
