import { Role } from "../../../generated/graphql";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailPlain: string;
  imgSrc: string;
  roles: Role[];
};