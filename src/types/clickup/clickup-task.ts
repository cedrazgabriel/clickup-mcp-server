export interface ClickUpTask {
  id: string;
  name: string;
  description: string;
  status: {
    status: string;
    color: string;
  };
  assignees: {
    id: number;
    username: string;
    email: string;
    profilePicture: string;
  }[];
  tags: string[];
  dueDate: string | null;
  timeEstimate: number | null;
  createdDate: string;
  updatedDate: string;
}