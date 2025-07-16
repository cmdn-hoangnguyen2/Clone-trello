import { TASK_STATUS } from "../types/task";

export const mapColumnIdToStatus = (columnId: number) => {
  const columnStatusMap = () => {
    switch (columnId) {
      case 1:
        return TASK_STATUS.DRAFT;
      case 2:
        return TASK_STATUS.TODO;
      case 3:
        return TASK_STATUS.DOING;
      case 4:
        return TASK_STATUS.PREVIEW;
      case 5:
        return TASK_STATUS.DONE;
      default:
        return TASK_STATUS.DRAFT;
    }
  };

  return columnStatusMap();
};
