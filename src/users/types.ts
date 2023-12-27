export interface User {
  id: number;
  name: string;
  roles: Role[];
  groups: string[];
}

export interface ResponseObject {
  status: string;
  message: string;
}

export interface Role {
  name: string;
  code: string;
  permissions: Array<string>;
  inheritGroups?: Array<string>;
}
