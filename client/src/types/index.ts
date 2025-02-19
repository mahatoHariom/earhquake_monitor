export interface EarthquakeReading {
  id: number;
  date: string;
  frequency: number;
}

export interface StatsResponse {
  max: number;
  min: number;
  count: number;
}
