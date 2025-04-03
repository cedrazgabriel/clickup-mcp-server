export interface ClickUpTaskResponse {
  id: string;
  custom_id: string;
  custom_item_id: number;
  name: string;
  text_content: string;
  description: string;
  status: {
    id: string;
    status: string;
    color: string;
    orderindex: number;
    type: string;
  };
  orderindex: string;
  date_created: string;
  date_updated: string;
  date_closed: string | null;
  date_done: string | null;
  archived: boolean;
  creator: {
    id: number;
    username: string;
    color: string;
    email: string;
    profilePicture: string;
  };
  assignees: {
    id: number;
    username: string;
    color: string;
    initials: string;
    email: string;
    profilePicture: string;
  }[];
  group_assignees: any[];
  watchers: {
    id: number;
    username: string;
    color: string;
    initials: string;
    email: string;
    profilePicture: string;
  }[];
  checklists: any[];
  tags: string[];
  parent: string;
  top_level_parent: string;
  priority: any;
  due_date: string | null;
  start_date: string | null;
  points: number | null;
  time_estimate: number | null;
  time_spent: number | null;
  custom_fields: {
    id: string;
    name: string;
    type: string;
    type_config: any;
    date_created: string;
    hide_from_guests: boolean;
    value?: any;
    required: boolean;
    value_richtext?: any;
  }[];
  dependencies: any[];
  linked_tasks: any[];
  locations: {
    id: string;
    name: string;
  }[];
  team_id: string;
  url: string;
  sharing: {
    public: boolean;
    public_share_expires_on: string | null;
    public_fields: string[];
    token: string | null;
    seo_optimized: boolean;
  };
  permission_level: string;
  list: {
    id: string;
    name: string;
    access: boolean;
  };
  project: {
    id: string;
    name: string;
    hidden: boolean;
    access: boolean;
  };
  folder: {
    id: string;
    name: string;
    hidden: boolean;
    access: boolean;
  };
  space: {
    id: string;
  };
  attachments: any[];
} 