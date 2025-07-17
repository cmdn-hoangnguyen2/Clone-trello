import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import BaseButton from "../../components/BaseButton.vue";
import { COLOR } from "../../constants/color";
import { BUTTON_VARIANT } from "../../constants/button";

vi.mock("../../utils/mapColorToClass", () => ({
  mapColorToClass: () => `text-white bg-red-400`,
}));

describe("BaseButton.vue", () => {
  it("Should return button with danger color", async () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: "Test Button",
        variant: BUTTON_VARIANT.BUTTON_ICON,
        color: COLOR.DANGER,
        icon: "plus",
      },
    });

    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    expect(button.text()).contains("Test Button");
    expect(button.classes()).toContain("text-white");
    expect(button.classes()).toContain("bg-red-400");
  });

  it("Should return button with icon", async () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: "Test Button",
        variant: BUTTON_VARIANT.BUTTON_ICON,
        color: COLOR.DANGER,
        icon: "plus",
      },
    });

    const icon = wrapper.find("i");
    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain("pi");
    expect(icon.classes()).toContain("pi-plus");
  });

  it("Should click 1 time when button is clicked", () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: "Test Button",
        variant: BUTTON_VARIANT.BUTTON_ICON,
        color: COLOR.DANGER,
        icon: "plus",
      },
    });

    const button = wrapper.find("button");
    button.trigger("click");

    expect(wrapper.emitted("on-click")).toBeTruthy();
    expect(wrapper.emitted("on-click")?.length).toBe(1);
  });

  it("Should not click time when button is disable", () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: "Test Button",
        variant: BUTTON_VARIANT.BUTTON_ICON,
        color: COLOR.DANGER,
        icon: "plus",
        isDisable: true,
      },
    });

    const button = wrapper.find("button");
    button.trigger("click");

    expect(wrapper.emitted("on-click")).toBeFalsy();
  });

  it("Should return type correctly", () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: "Submit Button",
        variant: BUTTON_VARIANT.BUTTON_ICON,
        color: COLOR.DANGER,
        type: "submit",
      },
    });

    const button = wrapper.find("button");
    expect(button.attributes("type")).toBe("submit");
  });
});
