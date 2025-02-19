import { ReadingService } from "../services/redingService";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "../middleware/errorHandler";
import { MockContext, createMockContext, Context } from "../context";

jest.mock("@prisma/client");

describe("ReadingService", () => {
  let mockCtx: MockContext;
  let ctx: Context;
  let service: ReadingService;

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as Context;
    service = new ReadingService();
  });

  describe("loadReadings", () => {
    it("should successfully load multiple readings", async () => {
      const mockReadings = [
        { date: "2024-02-18", frequency: 2.5 },
        { date: "2024-02-19", frequency: 3.1 },
      ];

      mockCtx.prisma.earthquakeReading.createMany.mockResolvedValue({
        count: 2,
      });

      const result = await service.loadReadings(mockReadings);

      expect(result.count).toBe(2);
      expect(mockCtx.prisma.earthquakeReading.createMany).toHaveBeenCalledWith({
        data: [
          { date: expect.any(Date), frequency: 2.5 },
          { date: expect.any(Date), frequency: 3.1 },
        ],
      });
    });

    it("should handle single reading", async () => {
      const mockReadings = [{ date: "2024-02-18", frequency: 2.5 }];

      mockCtx.prisma.earthquakeReading.createMany.mockResolvedValue({
        count: 1,
      });

      const result = await service.loadReadings(mockReadings);

      expect(result.count).toBe(1);
    });

    it("should handle database error during load", async () => {
      const mockReadings = [{ date: "2024-02-18", frequency: 2.5 }];

      mockCtx.prisma.earthquakeReading.createMany.mockRejectedValue(
        new Error("DB Error")
      );

      await expect(service.loadReadings(mockReadings)).rejects.toThrow();
    });
  });

  describe("getMonthlyReadings", () => {
    it("should return correct monthly statistics", async () => {
      const mockReadings = [
        {
          id: 1,
          date: new Date("2024-02-01"),
          frequency: 2.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          date: new Date("2024-02-15"),
          frequency: 3.1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          date: new Date("2024-02-28"),
          frequency: 2.8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockCtx.prisma.earthquakeReading.findMany.mockResolvedValue(mockReadings);

      const stats = await service.getMonthlyReadings(2024, 2);

      expect(stats).toEqual({
        max: 3.1,
        min: 2.5,
        count: 3,
      });

      expect(mockCtx.prisma.earthquakeReading.findMany).toHaveBeenCalledWith({
        where: {
          date: {
            gte: new Date(2024, 1, 1),
            lte: new Date(2024, 2, 0),
          },
        },
      });
    });

    it("should handle month with single reading", async () => {
      const mockReadings = [{ id: 1, date: new Date("2024-02-15"), frequency: 3.1, createdAt: new Date(), updatedAt: new Date() }];

      mockCtx.prisma.earthquakeReading.findMany.mockResolvedValue(mockReadings);

      const stats = await service.getMonthlyReadings(2024, 2);

      expect(stats).toEqual({
        max: 3.1,
        min: 3.1,
        count: 1,
      });
    });

    it("should throw ApiError for month with no readings", async () => {
      mockCtx.prisma.earthquakeReading.findMany.mockResolvedValue([]);

      await expect(service.getMonthlyReadings(2024, 2)).rejects.toThrow(
        ApiError
      );
      await expect(service.getMonthlyReadings(2024, 2)).rejects.toThrow(
        "No readings found for the specified period"
      );
    });
  });

  describe("getDailyReadings", () => {
    it("should return correct daily statistics", async () => {
      const mockReadings = [
        {
          id: 1,
          date: new Date("2024-02-18T10:00:00"),
          frequency: 2.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          date: new Date("2024-02-18T15:00:00"),
          frequency: 3.1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          date: new Date("2024-02-18T20:00:00"),
          frequency: 2.8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockCtx.prisma.earthquakeReading.findMany.mockResolvedValue(mockReadings);

      const stats = await service.getDailyReadings(2024, 2, 18);

      expect(stats).toEqual({
        max: 3.1,
        min: 2.5,
        count: 3,
      });

      expect(mockCtx.prisma.earthquakeReading.findMany).toHaveBeenCalledWith({
        where: {
          date: {
            gte: new Date(2024, 1, 18),
            lt: new Date(2024, 1, 19),
          },
        },
      });
    });

    it("should handle day with single reading", async () => {
      const mockReadings = [
        { id: 1, date: new Date("2024-02-18T15:00:00"), frequency: 3.1, createdAt: new Date(), updatedAt: new Date() },
      ];

      mockCtx.prisma.earthquakeReading.findMany.mockResolvedValue(mockReadings);

      const stats = await service.getDailyReadings(2024, 2, 18);

      expect(stats).toEqual({
        max: 3.1,
        min: 3.1,
        count: 1,
      });
    });

    it("should throw ApiError for day with no readings", async () => {
      mockCtx.prisma.earthquakeReading.findMany.mockResolvedValue([]);

      await expect(service.getDailyReadings(2024, 2, 18)).rejects.toThrow(
        ApiError
      );
      await expect(service.getDailyReadings(2024, 2, 18)).rejects.toThrow(
        "No readings found for the specified period"
      );
    });
  });

  describe("calculateStats", () => {
    it("should calculate correct statistics for multiple readings", () => {
      const readings = [
        { frequency: 2.5 },
        { frequency: 3.1 },
        { frequency: 2.8 },
      ];

      const stats = service["calculateStats"](readings);

      expect(stats).toEqual({
        max: 3.1,
        min: 2.5,
        count: 3,
      });
    });

    it("should handle single reading", () => {
      const readings = [{ frequency: 2.5 }];

      const stats = service["calculateStats"](readings);

      expect(stats).toEqual({
        max: 2.5,
        min: 2.5,
        count: 1,
      });
    });

    it("should throw ApiError for empty readings array", () => {
      expect(() => service["calculateStats"]([])).toThrow(ApiError);
      expect(() => service["calculateStats"]([])).toThrow(
        "No readings found for the specified period"
      );
    });
  });
});
