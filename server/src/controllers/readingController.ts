import { Request, Response, NextFunction } from "express";
import { ReadingService } from "../services/redingService";
import { parseReadingsFile } from "../utils/fileParser";
import { ApiError } from "../middleware/errorHandler";

const readingService = new ReadingService();

export class ReadingController {
  async loadData(req: Request, res: Response, next: NextFunction) {
    try {
      const { fileContent } = req.body;
      const readings = parseReadingsFile(fileContent);
      const formattedReadings = readings.map((reading) => ({
        date: new Date(reading.date),
        frequency: reading.frequency,
      }));
      await readingService.loadReadings(formattedReadings);
      res.json({ message: "Data loaded successfully" });
    } catch (error) {
      next(new ApiError(500, "Failed to load data"));
    }
  }

  async getMonthlyReadings(req: Request, res: Response, next: NextFunction) {
    try {
      const { year, month } = req.query;
      const stats = await readingService.getMonthlyReadings(
        Number(year),
        Number(month)
      );
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }

  async getDailyReadings(req: Request, res: Response, next: NextFunction) {
    try {
      const { year, month, day } = req.query;
      const stats = await readingService.getDailyReadings(
        Number(year),
        Number(month),
        Number(day)
      );
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
}
