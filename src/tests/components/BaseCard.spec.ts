import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BaseCard from "../../components/BaseCard.vue";

describe("BaseCard.vue", () => {
  it("Should card render with content", () => {
    const wrapper = mount(BaseCard, {
      slots: {
        default: "<p data-testid='card-content'>Test card</p>",
      },
    });

    const cardContent = wrapper.find("[data-testid='card-content']");
    expect(cardContent.text()).toContain("Test card");
  });
});
