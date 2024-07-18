import { Stage } from "./stage";
import { Village } from "./village";

export interface Catalog {
  villages: Village[];
  stages: Stage[];
  dates: Date[];
}
