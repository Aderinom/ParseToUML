import { Fragment } from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import ParserPage from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route index element={<ParserPage />} />
      <Route path="*" loader={() => redirect("/")}></Route>
    </Fragment>
  )
);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
