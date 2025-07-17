import { describe, expect, it, vi } from "vitest";
import type { Column } from "../../types/column";
import { TASK_STATUS } from "../../types/task";
import { mount } from "@vue/test-utils";
import Board from "../../components/Board.vue";
import CardAddTask from "../../components/CardAddTask.vue";
import CardTask from "../../components/CardTask.vue";
import draggableComponent from "vuedraggable";

vi.mock("../../hooks/useAddTask", () => ({
  useAddTask: () => ({
    addNewTask: vi.fn(() => Promise.resolve()),
  }),
}));

const mockColumn: Column = {
  id: 1,
  name: "test name",
  tasks: [
    {
      id: 1,
      columnId: 1,
      title: "Test title",
      description: "Test description",
      status: TASK_STATUS.DRAFT,
      createdAt: new Date().toISOString(),
    },
  ],
};

describe("Board.vue", () => {
  it("Should render column name", () => {
    const wrapper = mount(Board, {
      props: {
        column: mockColumn,
      },
    });

    const title = wrapper.find("h2");
    expect(title.exists()).toBeTruthy();
    expect(title.text()).toBe("test name");
  });

  it("Should render button with the correct attribute", () => {
    const wrapper = mount(Board, {
      props: {
        column: mockColumn,
      },
    });

    const button = wrapper.find("button");
    expect(button.exists()).toBeTruthy();
    expect(button.attributes("type")).toBe("button");
  });

  it("Should render icon the correct class", () => {
    const wrapper = mount(Board, {
      props: {
        column: mockColumn,
      },
    });

    const icon = wrapper.find("i");
    expect(icon.exists()).toBeTruthy();
    expect(icon.classes()).toContain("pi-plus");
  });

  it("Should show CardAddTask when click button", async () => {
    const wrapper = mount(Board, {
      props: {
        column: mockColumn,
      },
    });

    await wrapper.find("button").trigger("click");

    const cardAddTask = wrapper.findComponent(CardAddTask);
    expect(cardAddTask.exists()).toBeTruthy();
    expect(cardAddTask.isVisible()).toBeTruthy();
  });

  it("Should add new card after submit and hide CardAddTask", async () => {
    const wrapper = mount(Board, {
      props: {
        column: mockColumn,
      },
    });

    await wrapper.find("button.button-show-card-new-task").trigger("click");
    await wrapper.find("input.input-add-new-task").setValue("Test");

    const cardAddTask = wrapper.findComponent(CardAddTask);
    await cardAddTask.find("button.button-add-new-task").trigger("click");
    expect(cardAddTask.emitted("submit-add-task")).toBeTruthy();
    expect(cardAddTask.emitted("submit-add-task")?.length).toBe(1);
    expect(cardAddTask.isVisible()).toBeFalsy();
  });

  it("Should open detail modal when card is clicked", async () => {
    const wrapper = mount(Board, {
      props: {
        column: mockColumn,
      },
    });

    const card = wrapper.findComponent(CardTask);
    await card.trigger("click");

    const emit = card.emitted("view-detail");
    expect(emit).toBeTruthy();
    expect(emit?.length).toBe(1);
    expect(emit?.[0]?.[0]).toEqual(mockColumn.tasks[0]);
  });

  it("Should add task to new column when drag from others", async () => {
    const wrapper = mount(Board, {
      props: {
        column: mockColumn,
      },
    });

    const draggable = wrapper.findComponent(draggableComponent);
    expect(draggable.exists()).toBeTruthy();

    await draggable.vm.$emit("add", { task: mockColumn.tasks[0] });

    const emit = wrapper.emitted("task-add");
    expect(emit).toBeTruthy();
    expect(emit?.[0]?.[0]).toEqual({ task: mockColumn.tasks[0] });
  });

  it("Should remove task from previous column after drop in others", async () => {
    const wrapper = mount(Board, {
      props: {
        column: mockColumn,
      },
    });

    const draggable = wrapper.findComponent(draggableComponent);
    expect(draggable.exists()).toBeTruthy();

    await draggable.vm.$emit("remove", { task: mockColumn.tasks[0] });

    const emit = wrapper.emitted("task-remove");
    expect(emit).toBeTruthy();
    expect(emit?.[0]?.[0]).toEqual({ task: mockColumn.tasks[0] });
  });

  it("Should shows fallback text if no tasks", () => {
    const emptyColumn = { ...mockColumn, tasks: [] };
    const wrapper = mount(Board, {
      props: {
        column: emptyColumn,
      },
    });

    const emptyText = wrapper.find(".board-empty-column-text");
    expect(emptyText.exists()).toBeTruthy();
    expect(emptyText.text()).toContain("No tasks");
  });
});
