import { describe, expect, it } from "vitest";
import { getResultType } from "./result-type";

const toPoints = (ys: number[]) =>
  ys.map((y, i) => ({ id: i, x: i / ys.length, y, title: "" }));

describe("getResultType", () => {
  it("계속 오르면 승승장구", () => {
    expect(getResultType(toPoints([0.9, 0.6, 0.3, 0.1]))).toBe("승승장구😎");
  });

  it("크게 떨어졌다가 회복하면 다시 일어나기", () => {
    expect(getResultType(toPoints([0.4, 0.9, 0.2]))).toBe("넘어져도 다시 일어나기💪");
  });

  it("같은 입력이면 항상 같은 결과", () => {
    const points = toPoints([0.5, 0.3, 0.7, 0.4]);
    expect(getResultType(points)).toBe(getResultType(points));
  });

  it("x 순서와 무관하게 정렬 후 판단", () => {
    const points = toPoints([0.9, 0.6, 0.3, 0.1]).reverse();
    expect(getResultType(points)).toBe("승승장구😎");
  });
});
