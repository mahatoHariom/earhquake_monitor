import { Router } from "express";
import { body, query } from "express-validator";
import { ReadingController } from "../controllers/readingController";
import { validateRequest } from "../middleware/validation";

const router = Router();
const readingController = new ReadingController();

const dateValidation = [
  query("year").isInt({ min: 1900, max: 2100 }).withMessage("Invalid year"),
  query("month").isInt({ min: 1, max: 12 }).withMessage("Invalid month"),
  validateRequest,
];

router.post(
  "/load-data",
  [
    body("fileContent").notEmpty().withMessage("File content is required"),
    validateRequest,
  ],
  readingController.loadData
);

router.get(
  "/readings/monthly",
  dateValidation,
  readingController.getMonthlyReadings
);

router.get(
  "/readings/daily",
  [
    ...dateValidation,
    query("day").isInt({ min: 1, max: 31 }).withMessage("Invalid day"),
    validateRequest,
  ],
  readingController.getDailyReadings
);

export const readingRouter = router;
