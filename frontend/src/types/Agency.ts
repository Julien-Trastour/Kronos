export interface Agency {
  id: string;
  name: string;
  type: { id: number; name: string } | null; // ✅ Correction : type.id est un number
  address: string;
  postalCode: string;
  city: string;
  status: string;
}

export interface AgencyType {
  id: number; // ✅ Correction : id est un number
  name: string;
}
