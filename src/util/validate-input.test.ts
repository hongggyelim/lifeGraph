import { describe, expect, it } from "vitest";
import { validateInput } from "./validate-input";

describe("validateInput", () => {
  it("정상 입력은 에러 없음", () => {
    expect(validateInput({ name: "홍길동", birthYear: 2025 }, 2026)).toEqual({ name: "", birth: "" });
  });

  it("공백뿐인 이름은 에러", () => {
    expect(validateInput({ name: "   ", birthYear: 1990 }, 2026).name).not.toBe("");
  });

  it("범위를 벗어난 연도는 에러", () => {
    expect(validateInput({ name: "a", birthYear: 1899 }, 2026).birth).not.toBe("");
    expect(validateInput({ name: "a", birthYear: 2027 }, 2026).birth).not.toBe("");
    expect(validateInput({ name: "a", birthYear: undefined }, 2026).birth).not.toBe("");
  });
});
