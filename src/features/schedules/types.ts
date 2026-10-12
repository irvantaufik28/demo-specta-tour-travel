export interface DepartureSchedule {
  id: string;
  packageId: string;
  departureDate: string;
  returnDate: string | null;
  price: number | null;
  quota: number | null;
  active: boolean;
}
