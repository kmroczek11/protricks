import { Role } from "../../generated/graphql";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imgSrc: string;
  roles: Role[];
};

export default User;
