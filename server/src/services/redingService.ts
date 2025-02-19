import { PrismaClient } from "@prisma/client";
import { ApiError } from "../middleware/errorHandler";

const prisma = new PrismaClient();

export interface ReadingStats {
  max: number;
  min: number;
  count: number;
}

export interface FrequencyData {
  name: string;
  value: number;
}

export class ReadingService {
  async loadReadings(readings: any[]) {
    return await prisma.earthquakeReading.createMany({
      data: readings.map((reading) => ({
        date: new Date(reading.date),
        frequency: reading.frequency,
      })),
    });
  }

  async getMonthlyReadings(year: number, month: number): Promise<ReadingStats> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const readings = await prisma.earthquakeReading.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return this.calculateStats(readings);
  }

  async getDailyReadings(
    year: number,
    month: number,
    day: number
  ): Promise<ReadingStats> {
    const date = new Date(year, month - 1, day);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const readings = await prisma.earthquakeReading.findMany({
      where: {
        date: {
          gte: date,
          lt: nextDate,
        },
      },
    });

    return this.calculateStats(readings);
  }

  private calculateStats(readings: any[]): ReadingStats {
    if (readings.length === 0) {
      throw new ApiError(404, "No readings found for the specified period");
    }

    return {
      max: Math.max(...readings.map((r) => r.frequency)),
      min: Math.min(...readings.map((r) => r.frequency)),
      count: readings.length,
    };
  }
}
