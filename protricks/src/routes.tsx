import Layout from "./components/layout";
import Home from "./components/home";
import Exercises from "./components/exercises";
import type { RouteObject } from "react-router-dom";
import UserPanel from "./components/user";
import CoachPanel from "./components/coach";
import TraineePanel from "./components/trainee";
import Protected from "./components/auth/components/Protected";
import { Role } from "./generated/graphql";

export interface NavItemsObject {
  id: number;
  name: string;
  path?: string;
}

export const items: NavItemsObject[] = [
  {
    id: 1,
    name: "Zajęcia",
    path: "/zajecia",
  },
  {
    id: 2,
    name: "Zloty",
    path: "/zloty",
  },
  {
    id: 3,
    name: "Pokazy",
    path: "/pokazy",
  },
];

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/zajecia",
        element: <Exercises />,
        // children: [
        //   { index: true, element: <Cities /> },
        //   { path: '/zajecia/:id', element: <City /> },
        // ],
      },
      {
        path: "/ustawienia",
        element: (
          <Protected allowedRoles={[Role.User]}>
            <UserPanel />
          </Protected>
        ),
      },
      {
        path: "/trener",
        element: (
          <Protected allowedRoles={[Role.Coach]}>
            <CoachPanel />
          </Protected>
        ),
      },
      {
        path: "/uczen",
        element: (
          <Protected allowedRoles={[Role.Trainee]}>
            <TraineePanel />
          </Protected>
        ),
      },
      { path: "*", element: null },
    ],
  },
];
