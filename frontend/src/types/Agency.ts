export interface Agency {
    id: string;
    name: string;
    type: { id: string; name: string } | null;
    address: string;
    postalCode: string;
    city: string;
    status: string;
  }
  
  export interface AgencyType {
    id: string;
    name: string;
  }
  