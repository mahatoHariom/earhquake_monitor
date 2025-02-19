import { parseReadingsFile } from "../utils/fileParser";

describe("fileParser", () => {
  it("should parse valid readings correctly", () => {
    const input = "20230110 500 200 100";
    const result = parseReadingsFile(input);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({
      date: "2023-01-10",
      frequency: 500,
    });
  });

  it("should skip invalid dates", () => {
    const input = "20231312 900 200";
    const result = parseReadingsFile(input);

    expect(result).toHaveLength(0);
  });

  it("should stop at -999", () => {
    const input = "20230810 800 250 180 -999 20230927 2.5 40 50";
    const result = parseReadingsFile(input);

    expect(result).toHaveLength(3); // Only count readings before -999 for 20230810
    expect(result.every((r) => r.date === "2023-08-10")).toBe(true);
  });

  it("should handle multiple lines with -999", () => {
    const input = `20230810 800 250 180 -999 20230927 2.5 40 50
                  20230111 100 200 -999 300 400
                  20230112 500 600`;
    const result = parseReadingsFile(input);

    expect(result).toHaveLength(7); // 3 from first date + 2 from second date + 2 from third date
  });
});
