export interface ClickUpUpdateTaskRequest {
  name?: string;
  description?: string;
  status?: string;
  priority?: number | null;
  time_estimate?: number | null;
  assignees?: {
    add?: number[];
    rem?: number[];
  };
  archived?: boolean;
  due_date?: number | null;
  start_date?: number | null;
  notify_all?: boolean;
  parent?: string | null;
  links_to?: string | null;
  check_required_custom_fields?: boolean;
  custom_fields?: {
    id: string;
    value: any;
  }[];
} 