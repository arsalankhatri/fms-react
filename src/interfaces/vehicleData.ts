export interface VehicleData {
  _id:string;
  vmodel: string;
  name: string;
  type: string;
  status?: string;
  picture?: File | undefined;
}
