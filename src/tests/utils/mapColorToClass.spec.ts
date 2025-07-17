import { describe, it, expect } from "vitest";
import { mapColorToClass } from "../../utils/mapColorToClass";
import { COLOR } from "../../constants/color";

describe("mapColorToClass.ts", () => {
  it("should return classes for DANGER color", () => {
    const result = mapColorToClass(COLOR.DANGER);
    expect(result).contain("bg-red-400 text-white");
  });

  it("should return classes for DEFAULT color", () => {
    const result = mapColorToClass(COLOR.DEFAULT);
    expect(result).toBe("bg-white text-black");
  });
});
