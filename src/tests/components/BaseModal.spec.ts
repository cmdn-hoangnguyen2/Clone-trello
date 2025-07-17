import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BaseModal from "../../components/BaseModal.vue";

describe("BaseModal.vue", () => {
  it("should not render modal when isOpen is false", () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: false,
        isShadowBackground: false,
      },
      slots: {
        default: "<p data-testid='modal-content'>Test modal</p>",
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    const modalContent = wrapper.find('[data-testid="modal-content"]');
    expect(modalContent.exists()).toBeFalsy();
  });

  it("should render modal", () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
        isShadowBackground: false,
      },
      slots: {
        default: "<p data-testid='modal-content'>Test modal</p>",
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    const modalContent = wrapper.find('[data-testid="modal-content"]');
    expect(modalContent.exists()).toBeTruthy();
    expect(modalContent.text()).toContain("Test modal");
  });

  it("should render modal without shadow bg", () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
        isShadowBackground: false,
      },
      slots: {
        default: "<p data-testid='modal-content'>Test modal</p>",
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    const shadowBackground = wrapper.find("div.modal-shadow-bg");
    expect((shadowBackground.element as HTMLElement).style.display).toBe(
      "none"
    );
  });

  it("should render modal with shadow bg", () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
        isShadowBackground: true,
      },
      slots: {
        default: "<p data-testid='modal-content'>Test modal</p>",
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    const shadowBackground = wrapper.find("div.modal-shadow-bg");
    expect(shadowBackground.exists()).toBeTruthy();
  });

  it("should close modal after handle close", async () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
        isShadowBackground: true,
      },
      slots: {
        default: "<p data-testid='modal-content'>Test modal</p>",
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    const shadowBackground = wrapper.find("div.modal-shadow-bg");
    await shadowBackground.trigger("click");

    expect(wrapper.emitted("close-modal")).toBeTruthy();
  });
});
