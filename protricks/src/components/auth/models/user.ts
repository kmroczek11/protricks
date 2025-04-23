import { Role } from "../../../generated/graphql";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imgSrc: string;
  roles: Role[];
};