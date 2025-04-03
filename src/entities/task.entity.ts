export interface TaskEntity {
  id: string;
  customId: string;
  name: string;
  description: string;
  status: {
    id: string;
    name: string;
    color: string;
  };
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
  creator: {
    id: number;
    name: string;
    email: string;
    profileImage: string;
  };
  assignees: {
    id: number;
    name: string;
    email: string;
    profileImage: string;
  }[];
  tags: string[];
  dueDate: Date | null;
  timeEstimate: number | null;
  timeSpent: number | null;
  parentTaskId: string | null;
  url: string;
  customFields: Record<string, any>;
} 