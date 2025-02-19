export function parseReadingsFile(
  content: string
): Array<{ date: string; frequency: number }> {
  const lines = content.split("\n");
  const readings: Array<{ date: string; frequency: number }> = [];

  for (const line of lines) {
    const tokens = line.trim().split(/\s+/);
    let currentIndex = 0;

    while (currentIndex < tokens.length) {
      const dateStr = tokens[currentIndex];

      // Validate date format
      if (!/^\d{8}$/.test(dateStr)) {
        currentIndex++;
        continue;
      }

      const year = parseInt(dateStr.substring(0, 4));
      const month = parseInt(dateStr.substring(4, 6));
      const day = parseInt(dateStr.substring(6, 8));

      // Validate date values
      if (month < 1 || month > 12 || day < 1 || day > 31) {
        currentIndex++;
        continue;
      }

      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      currentIndex++;

      // Process frequencies until next date or -999
      let foundNegative999 = false;
      while (currentIndex < tokens.length && !foundNegative999) {
        const frequencyStr = tokens[currentIndex];

        // Stop if we encounter a new date
        if (/^\d{8}$/.test(frequencyStr)) {
          break;
        }

        // Stop processing this line if we hit -999
        if (frequencyStr === "-999") {
          foundNegative999 = true;
          break;
        }

        const frequency = parseFloat(frequencyStr);
        if (!isNaN(frequency) && frequency >= 0 && frequency <= 1000) {
          readings.push({
            date: formattedDate,
            frequency,
          });
        }

        currentIndex++;
      }

      // If we found -999, skip to the next line
      if (foundNegative999) {
        break;
      }
    }
  }

  return readings;
}
