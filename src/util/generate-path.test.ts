import { describe, expect, it } from "vitest";
import { generatePath } from "./generate-path";

describe("generatePath", () => {
  it("점이 2개 미만이면 빈 문자열", () => {
    expect(generatePath([{ x: 0, y: 0 }])).toBe("");
  });

  it("점이 2개면 직선", () => {
    expect(generatePath([{ x: 0, y: 0 }, { x: 10, y: 10 }])).toBe("M 0 0 L 10 10");
  });

  it("점이 3개 이상이면 곡선 구간이 (점 개수 - 1)개", () => {
    const path = generatePath([{ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 20, y: 0 }]);
    expect(path.match(/C/g)).toHaveLength(2);
    expect(path.endsWith("20 0")).toBe(true);
  });
});
