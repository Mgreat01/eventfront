import { LinkUrl } from "./link";
import { Meta } from "./meta";

export interface Response<T> {
  data: T[];
  meta: Meta;
  links: LinkUrl;
}

export interface ResponseThree<T> {
  data: T[];
}