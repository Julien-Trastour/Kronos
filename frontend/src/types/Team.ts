export interface Team {
    id: string;
    name: string;
    members: number;
    leaderId: string | null;
    agencyId: string | null;
    parentTeamId: string | null;
    createdAt: string;
    agency?: {
      id: string;
      name: string;
    } | null;
    parentTeam?: {
      id: string;
      name: string;
    } | null;
  }
  