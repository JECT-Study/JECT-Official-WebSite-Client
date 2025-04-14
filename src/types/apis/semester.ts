export interface SemesterData {
  id: number;
  name: string;
}

export interface SemestersResponse {
  semesterResponses: SemesterData[];
}
