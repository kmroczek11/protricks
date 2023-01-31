import Layout from "./components/layout";
import Home from "./components/home";
import Exercises from "./components/exercises";
import type { RouteObject } from "react-router-dom";
import UserPanel from "./components/user";
import GroupsPanel from "./components/coach/groups_panel";
import TraineeExercisesPanel from "./components/trainee/trainee_exercises_panel";
import Protected from "./components/auth/components/Protected";
import { Role } from "./generated/graphql";
import CoachExercisesPanel from "./components/coach/coach_exercises";
import Shows from "./components/shows";
import Meetings from "./components/meetings";
import Lost from "./components/lost";
import TraineePaymentsPanel from "./components/trainee/trainee_payments_panel";
import MultistepForm from "./components/exercises/components/MultistepForm";
// import SuccessfullPayment from "./components/successfull_payment";

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
        path: "/zajecia/zarejestruj",
        element: <MultistepForm />,
      },
      {
        path: "/zloty",
        element: <Meetings />,
      },
      {
        path: "/pokazy",
        element: <Shows />,
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
        path: "/trener/zarzadzanie_grupami",
        element: (
          <Protected allowedRoles={[Role.Coach]}>
            <GroupsPanel />
          </Protected>
        ),
      },
      {
        path: "/trener/zajecia",
        element: (
          <Protected allowedRoles={[Role.Coach]}>
            <CoachExercisesPanel />
          </Protected>
        ),
      },
      {
        path: "/uczen/zajecia",
        element: (
          <Protected allowedRoles={[Role.Trainee]}>
            <TraineeExercisesPanel />
          </Protected>
        ),
      },
      {
        path: "/uczen/platnosci",
        element: <TraineePaymentsPanel />,
      },
      { path: "*", element: <Lost /> },
    ],
  },
];
