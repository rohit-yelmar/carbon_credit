export interface CreateRecordRequest {
  project_name: string;
  registry: string;
  vintage: number;
  quantity: number;
  serial_number: string;
}

export interface Record {
  id: string;
  project_name: string;
  registry: string;
  vintage: number;
  quantity: number;
  serial_number: string;
  created_at: Date;
  events: Event[];
}

export interface Event {
  id: string;
  record_id: string;
  event_type: string;
  timestamp: Date;
}
