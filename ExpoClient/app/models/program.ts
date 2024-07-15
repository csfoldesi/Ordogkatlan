export interface ProgramDTO {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  performanceId: string;
  date: Date;
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  villageId: string;
  village: string;
  stageId: string;
  stage: string;
}
