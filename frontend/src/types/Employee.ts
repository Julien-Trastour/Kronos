export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    role?: { id: string; name: string };
    agency?: { id: string; name: string };
    team?: { id: string; name: string };
    roleId?: string;
    agencyId?: string;
    teamId?: string;
  }
  