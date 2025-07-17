import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import CardAddTask from "../../components/CardAddTask.vue";

describe("CardAddTask.vue", () => {
  it("Should render input and button icon", () => {
    const wrapper = mount(CardAddTask);

    expect(wrapper.find("input").exists()).toBeTruthy();
    expect(wrapper.find("button").exists()).toBeTruthy();
    expect(wrapper.find("i").exists()).toBeTruthy();
  });

  it("Should render input with correct attributes", () => {
    const wrapper = mount(CardAddTask);

    const input = wrapper.find("input");
    expect(input.attributes("type")).toBe("text");
    expect(input.attributes("placeholder")).toBe("Enter task title");
  });

  it("Should render button with correct attributes", () => {
    const wrapper = mount(CardAddTask);
    expect(wrapper.find("button").attributes("type")).toBe("submit");
  });

  it("Should render icon with correct attributes", () => {
    const wrapper = mount(CardAddTask);

    const icon = wrapper.find("i");
    expect(icon.classes()).toContain("pi");
    expect(icon.classes()).toContain("pi-check");
  });

  it("Should submit success when input has values", async () => {
    const wrapper = mount(CardAddTask);

    await wrapper.find("input").setValue("Test input");
    await wrapper.find("button").trigger("click");

    const emitted = wrapper.emitted("submit-add-task");
    expect(emitted).toBeTruthy();
    expect(emitted?.length).toBe(1);
    expect(emitted?.[0]?.[0]).toContain("Test input");
  });

  it("Should not submit with empty input", async () => {
    const wrapper = mount(CardAddTask);

    await wrapper.find("input").setValue("");
    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("submit-add-task")).toBeFalsy();
  });

  it("should reset input after submission", async () => {
    const wrapper = mount(CardAddTask);

    const input = wrapper.find("input");
    await input.setValue("Task A");
    await wrapper.find("button").trigger("click");

    expect((input.element as HTMLInputElement).value).toBe("");
  });
});
