import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { SideBar } from "../Layouts/SideBar";
import Login from "../login/Login";
import SignUp from "../login/signup";
import { CreateExam } from "../exam/CreateExam";
import { McqQuestion } from "../exam/McqQuestion";
import ExamList from "../exam/ExamList";
import { UpdateExam } from "../exam/updateExam";
import MCQQuestionsPage from "../dashboard/McqPage";
import Historyofuser from "../dashboard/History";
import { ViewAnswer } from "../dashboard/ViewAnswer";
import { ViewExam } from "../exam/ViewExam";
import { AddRole } from "../login/AddRole";
import UserRegistration from "../login/UserRegistration";
import UserGrid from "../login/FacultyList";
import CompanyList from "../login/CompanyList";
import StudentList from "../login/StudentList";
import { UserSideBar } from "../Layouts/userSidebar";
import CurrentExam from "../dashboard/Dashboard";
import { AdminDashboard } from "../dashboard/AdminDashboard";
import { FacultySideBar } from "../Layouts/Facultysidebar";
import { FacultyDashboard } from "../dashboard/FacultyDashboard";
import { AddSubject } from "../login/Addsubject";
import { AddStandard } from "../login/AddStandard";
import { AddStream } from "../login/AddStream";
import { AddTopic } from "../login/AddTopic";

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
      path : "/update-exam/:id", 
    element:<UpdateExam />
  },
 
{
  path:"/viewAnswers/:id",
  element:<ViewAnswer/>
},
{
  path:"/viewExam/:id",
  element:<ViewExam/>
},
{
  path:"/add/:role",
  element:<AddRole/>
},
{
  path:"user/:id",
  element:<UserRegistration/>
},

{
  path:"/userDasboard",
  element:<UserSideBar/>,
  errorElement:<div>404</div>,
  children : [
    {
      path:"dashboard",
      // element:<Dashboard/>,
      errorElement:<div>404</div>
    },
    {
      path:"currentexam",
      element:<CurrentExam/>,
      errorElement:<div>404</div>
    },
    
    {
      path:"history",
      element:<Historyofuser/>
    },
    {
      path:"viewAnswers/:id",
      element:<ViewAnswer/>,
      errorElement:<div>400</div>
    },
    { 
    path : "question/:id", 
    element:< MCQQuestionsPage/>,
    errorElement:<div>404</div>
  },
  ]
},
{
  path:"/facultyDashboard",
  element:<FacultySideBar/>,
  errorElement:<div>404</div>,
  children:[
    {
      path: "",
      element: <FacultyDashboard />,
      errorElement: <div>404</div>,
    },
    {
      path: "createexam",
      element: <CreateExam/>,
      errorElement: <div>404</div>,
    },
    {
        path:"examlist",
        element:<ExamList/>,
        errorElement:<div>404</div>
    },
    {
      path:"mcqquestion/:id",
    element:<McqQuestion/>,
      errorElement:<div>404</div>
    },
    {
      path:"mcqquestion",
    element:<McqQuestion/>,
      errorElement:<div>404</div>
    },
    {
      path:"studentlist",
      element:<StudentList/>,
      errorElement:<div>404</div>
    }
  ]
},
    {
      path: "/adminDashboard",
      element: <SideBar />,
      errorElement: <div>404</div>,

      children: [
        {
          path: "",
          element: <AdminDashboard />,
          errorElement: <div>404</div>,
        },
        {
          path: "createexam",
          element: <CreateExam/>,
          errorElement: <div>404</div>,
        },
        {
            path:"examlist",
            element:<ExamList/>,
            errorElement:<div>404</div>
        },
        {
          path: "facultylist",
          element:<UserGrid/>,
          errorElement: <div>404</div>,
        },
        
        {
          path:"companylist",
          element:<CompanyList/>,
          errorElement:<div>404</div>
        },
        {
          path:"mcqquestion/:id",
        element:<McqQuestion/>,
          errorElement:<div>404</div>
        },
        {
          path:"mcqquestion",
        element:<McqQuestion/>,
          errorElement:<div>404</div>
        },
        {
          path:"studentlist",
          element:<StudentList/>,
          errorElement:<div>404</div>
        },
        {
          path:"subject",
          element:<AddSubject/>,
          errorElement:<dov>404</dov>
        },
        {
          path:'standard',
          element:<AddStandard/>,
          errorElement:<div>404</div>
        },
        {
          path:'stream',
          element:<AddStream/>,
          errorElement:<div>404</div>
        },
        {
          path:'topic',
          element:<AddTopic/>,
          errorElement:<div>404 </div>
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
