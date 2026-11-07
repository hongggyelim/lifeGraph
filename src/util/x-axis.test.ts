import { describe, expect, it } from "vitest";
import { getXAxis } from "./x-axis";

describe("getXAxis", () => {
  it("나이 기준: 0부터 간격만큼 증가", () => {
    expect(getXAxis({ birthYear: 2000, scale: 5, mode: "age", currentYear: 2025 })).toEqual([
      0, 5, 10, 15, 20, 25,
    ]);
  });

  it("연도 기준: 출생년도부터 간격만큼 증가하고 현재 연도를 넘지 않음", () => {
    expect(getXAxis({ birthYear: 2000, scale: 5, mode: "year", currentYear: 2023 })).toEqual([
      2000, 2005, 2010, 2015, 2020,
    ]);
  });
});
