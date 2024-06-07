export interface StreakCurrent {
  id: string;
  userId: string;
  currentStreakCount: number;
  lastLessonDate: string;
  startLessonDate: string;
  user: any;
}
export interface StreakHistory {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  streakLength: number;
  user: any;
}
export interface StreakUpdateResponse {
  streak: StreakCurrent;
  isContinueStreakUpdate: boolean;
}
