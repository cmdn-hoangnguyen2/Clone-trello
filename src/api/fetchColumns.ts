import type { Column } from "../types/column";

export const fetchColumns = async (): Promise<Column[]> => {
  const response = await fetch("/data/columns.json");

  if (!response.ok) {
    throw new Error("Failed to fetch columns");
  }

  return await response.json();
};
