import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import CardTask from "../../components/CardTask.vue";
import { TASK_STATUS, type Task } from "../../types/task";

const mockTask: Task = {
  id: 1,
  columnId: 1,
  title: "Test title",
  description: "Test description",
  status: TASK_STATUS.DRAFT,
  createdAt: "",
};

describe("CardTask.vue", () => {
  it("Should render task title", () => {
    const wrapper = mount(CardTask, {
      props: {
        task: mockTask,
      },
    });

    const content = wrapper.find("p.card-title");
    expect(content.text()).toContain("Test title");
  });

  it("Should card open detail modal when clicked", async () => {
    const wrapper = mount(CardTask, {
      props: {
        task: mockTask,
      },
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted("view-detail")).toBeTruthy();
    expect(wrapper.emitted("view-detail")?.length).toBe(1);
    expect(wrapper.emitted("view-detail")?.[0]?.[0]).toEqual(mockTask);
  });
});
