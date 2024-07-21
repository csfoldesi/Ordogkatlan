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
  villageName: string;
  stageId: string;
  stageName: string;
  isSelected: boolean;
}
