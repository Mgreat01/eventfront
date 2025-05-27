export interface Event {

     basicInfo: {
    title: string;
    category_ids: string[]; 
  };
  details: {
    description: string;
  };
  tickets: { 
    ticketTypes: string[]; 
    date_time_start: Date;
    date_time_end: Date;
  };
}
