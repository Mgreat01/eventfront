export interface Event {
  basicInfo: {
    title: string;
    category_ids: string[];
    location: {
      address: string;
      lat: number;  
      lng: number;  
    };
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

export  interface EventSearch {
  id : number;
  title: string;
  description: string;
  cycle: string;
  categories : Category[];
  created_by : UserSearch;
  date_time_start: String;
  date_time_end: String;
  tickets: Ticket[];
}
