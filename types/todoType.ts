// types/todoType.ts
export interface todoType {
  _id: string;
  id: string;
  title: string;
  isCompleted: boolean;
  completed: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
