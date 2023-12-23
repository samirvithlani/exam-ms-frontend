import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SideBar } from "../Layouts/SideBar";
import Login from "../login/Login";
import SignUp from "../login/signup";
import Dashboard from "../dashboard/Dashboard";
import { CreateExam } from "../exam/CreateExam";
import { McqQuestion } from "../exam/McqQuestion";
import ExamList from "../exam/ExamList";
import { UpdateExam } from "../exam/updateExam";
import MCQQuestionsPage from "../dashboard/McqPage";
import Historyofuser from "../dashboard/History";
import { ViewAnswer } from "../dashboard/ViewAnswer";
const MainRouter = ({ children }) => {
  //console.log("MainRouter",children);
  const routesData = createBrowserRouter([
    {
      path: "/",
      element: <SignUp/>,
      errorElement: <div>404</div>,
    },
    {
      path: "/login",
      element:<Login/>,
      errorElement: <div>404</div>,
    },
    {
      path: "/dashboard",
      element:<Dashboard/>,
      errorElement: <div>404</div>,
    },
    { 
      path : "/update-exam/:id", 
    element:<UpdateExam />
  },
  { 
    path : "/question/:id", 
  element:< MCQQuestionsPage/>
},
{
  path:"/history",
  element:<Historyofuser/>
},
{
  path:"/viewAnswers/:id",
  element:<ViewAnswer/>
},

    {
      path: "/adminDashboard",
      element: <SideBar />,
      errorElement: <div>404</div>,

      children: [
        {
          path: "",
        //   element:<MainDashBoard/>
        }
        ,
        {
          path: "createexam",
          element: <CreateExam/>,
          errorElement: <div>404</div>,
        },
        {
            path:"examlist",
            // element:<GetAllVc/>,
            element:<ExamList/>,
            errorElement:<div>404</div>
        },
        {
          path: "dashboard",
        //   element: <MainDashBoard />,
          errorElement: <div>404</div>,
        },
        {
          path:"parent",
        //   element:<ParentComp/>,
          errorElement:<div>404</div>
        },
        {
          path:"vcdetail/:id",
        //   element:<VcDetail/>,
          errorElement:<div>404</div>
        },
        {
          path:"mcqquestion/:id",
        //   element:<UsersOfVc/>,
        element:<McqQuestion/>,
          errorElement:<div>404</div>
        },
        {
          path:"mcqquestion",
        //   element:<UsersOfVc/>,
        element:<McqQuestion/>,
          errorElement:<div>404</div>
        },
        {
          path:"allusers",
        //   element:<VcUserList/>,
          errorElement:<div>404</div>
        }

      ],
    },
    {
      basename: `/`,
    },
  ]);
  return (
    <React.Fragment>
      <RouterProvider router={routesData}>{children}</RouterProvider>
    </React.Fragment>
  );
};
export default MainRouter;
