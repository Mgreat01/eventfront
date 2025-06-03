export interface Link {
  url: string;
  label: string;
  active: boolean;
}

export interface LinkUrl {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}
