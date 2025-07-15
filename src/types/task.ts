export const TASK_STATUS = {
  DRAFT: "draft",
  TODO: "todo",
  DOING: "doing",
  DONE: "done",
  PREVIEW: "preview",
};

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export interface Task {
  id: number;
  columnId: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}
