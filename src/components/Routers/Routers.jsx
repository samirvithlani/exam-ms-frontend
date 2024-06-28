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

import { PrivateRoutes } from "../PrivateRoutes";
import { checkAuthToken } from "../../util/util";
import UserProfile from "../Layouts/UserProfile";
import { StudentDashboard } from "../dashboard/StudentDashboard";
import { Wallet } from "../dashboard/Wallet";
import Allquestions from "../exam/AllQuestion";
import CreditRequestList from "../login/CreditRequest";
import ForgotPassword from "../login/ForgotPassword";
import ResetPassword from "../login/ResetPassword";
import { GridList } from "../login/GridList";
import { ExamDetails } from "../login/ExamDetails";
import { SubjectList } from "../login/SubjectList";
import { UserExamList } from "../login/UserExamLIst";
import { ExamSubjectList } from "../exam/ExamSubjectList";
import { UserExamDetails } from "../exam/UserExamDetails";
import GoogleCallback from "../login/GoogleCallback";
import { QuillDemo } from "../QuillDemo";
import FacultyView from "../Layouts/FacultyView";
import StudentDetail from "../dashboard/StudentDetail";
import { DeletedExam } from "../exam/DeletedExam";
import DeletedMcq from "../exam/DeletedMcq";
import AllUserGivenExam from "../exam/AllUserGivenExam";
import { CreateContest } from "../exam/CreateContest";
import { Annouement } from "../dashboard/Annouement";
import AllContest from "../exam/AllContest";
import ContestDetail from "../exam/ContestDetail";
import UserContestexam from "../exam/UserContestexam";

const MainRouter = ({ children }) => {
  //console.log("MainRouter",children);
  const routesData = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
      errorElement: <div>404</div>,
    },
    {
      path: "/google/callback",
      element: <GoogleCallback />,
      errorElement: <div>404</div>,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <div>404</div>,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />,
      errorElement: <div>404</div>,
    },
    {
      path: "/resetpassword",
      element: <ResetPassword />,
      errorElement: <div>404</div>,
    },
    {
      path: "/quill",
      element: <QuillDemo />,
      errorElement: <div>404</div>,
    },
    {
      path: "user/:id",
      element: <UserRegistration />,
    },
    {
      element: <PrivateRoutes />,
      children: [
        {
          path: "/userDasboard",
          element: <UserSideBar />,
          errorElement: <div>404</div>,
          children: [
            {
              path: "",
              //element:<Dashboard/>,
              element: <StudentDashboard />,
              errorElement: <div>404</div>,
            },
            {
              path: "currentexam",
              element: <CurrentExam />,
              errorElement: <div>404</div>,
            },

            {
              path: "history",
              element: <Historyofuser />,
            },
            {
              path: "viewAnswers/:id",
              element: <ViewAnswer />,
              errorElement: <div>400</div>,
            },
            {
              path: "question/:id",
              element: <MCQQuestionsPage />,
              errorElement: <div>404</div>,
            },
            {
              path: "userprofile",
              element: <UserProfile />,
            },
            {
              path: "wallet",
              element: <Wallet />,
            },
            {
              path: "subject",
              element: <UserExamList />,
            },
            {
              path: "examdetails/:id",
              element: <UserExamDetails />,
            },
            {
              path: "allcontest",
              element: <AllContest/>,
            },
            {
              path: "contestdetails/:id",
              element: <UserContestexam/>,
            },
          ],
        },
      ],
    },
    {
      element: <PrivateRoutes />,
      children: [
        {
          path: "/facultyDashboard",
          element: <FacultySideBar />,
          errorElement: <div>404</div>,
          children: [
            {
              path: "",
              element: <FacultyDashboard />,
              errorElement: <div>404</div>,
            },
            {
              path: "viewalluserexam",
              element: <AllUserGivenExam />,
              errorElement: <div>400</div>,
            },
            {
              path: "createexam",
              element: <CreateExam />,
              errorElement: <div>404</div>,
            },
            {
              path: "examlist",
              element: <ExamList />,
              errorElement: <div>404</div>,
            },
            {
              path: "subjectlist",
              element: <SubjectList />,
              errorElement: <div>404</div>,
            },
            {
              path: "facultylist",
              element: <UserGrid />,
              errorElement: <div>404</div>,
            },

            {
              path: "companylist",
              element: <CompanyList />,
              errorElement: <div>404</div>,
            },
            {
              path: "mcqquestion/:id",
              element: <McqQuestion />,
              errorElement: <div>404</div>,
            },
            {
              path: "mcqquestion",
              element: <McqQuestion />,
              errorElement: <div>404</div>,
            },
            {
              path: "studentlist",
              element: <StudentList />,
              errorElement: <div>404</div>,
            },
            {
              path: "studentDetail/:id",
              element: <StudentDetail />,
              errorElement: <div>404</div>,
            },
            {
              path: "subject",
              element: <AddSubject />,
              errorElement: <dov>404</dov>,
            },
            {
              path: "standard",
              element: <AddStandard />,
              errorElement: <div>404</div>,
            },
            {
              path: "stream",
              element: <AddStream />,
              errorElement: <div>404</div>,
            },
            {
              path: "topic",
              element: <AddTopic />,
              errorElement: <div>404 </div>,
            },
            {
              path: "viewExam/:id",
              element: <ViewExam />,
              errorElement: <div>404</div>,
            },
            {
              path: "update-exam/:id",
              element: <UpdateExam />,
            },
            {
              path: "add/:role",
              element: <AddRole />,
            },
            {
              path: "userprofile",
              element: <UserProfile />,
            },
            {
              path: "allquestion",
              element: <Allquestions />,
            },
            {
              path: "creditRequestList",
              element: <CreditRequestList />,
            },
            {
              path: "subject/:id",
              element: <GridList />,
            },
            {
              path: "examdetails/:id",
              element: <ExamDetails />,
            },
            {
              path: "facultyDetails/:id",
              element: <FacultyView />,
            },
          ],
        },
      ],
    },
    {
      element: <PrivateRoutes />,
      children: [
        {
          path: "/adminDashboard",
          element: <SideBar />,
          errorElement: <div>404</div>,
          //loader: checkAuthToken,

          children: [
            {
              path: "",
              element: <AdminDashboard />,
              errorElement: <div>404</div>,
            },
            {
              path: "createexam",
              element: <CreateExam />,
              errorElement: <div>404</div>,
            },
            {
              path: "examlist",
              element: <ExamList />,
              errorElement: <div>404</div>,
            },
            {
              path: "subjectlist",
              element: <SubjectList />,
              errorElement: <div>404</div>,
            },
            {
              path: "facultylist",
              element: <UserGrid />,
              errorElement: <div>404</div>,
            },

            {
              path: "companylist",
              element: <CompanyList />,
              errorElement: <div>404</div>,
            },
            {
              path: "mcqquestion/:id",
              element: <McqQuestion />,
              errorElement: <div>404</div>,
            },
            {
              path: "mcqquestion",
              element: <McqQuestion />,
              errorElement: <div>404</div>,
            },
            {
              path: "studentlist",
              element: <StudentList />,
              errorElement: <div>404</div>,
            },
            {
              path: "studentDetail/:id",
              element: <StudentDetail />,
              errorElement: <div>404</div>,
            },
            {
              path: "subject",
              element: <AddSubject />,
              errorElement: <dov>404</dov>,
            },
            {
              path: "standard",
              element: <AddStandard />,
              errorElement: <div>404</div>,
            },
            {
              path: "stream",
              element: <AddStream />,
              errorElement: <div>404</div>,
            },
            {
              path: "topic",
              element: <AddTopic />,
              errorElement: <div>404 </div>,
            },
            {
              path: "viewExam/:id",
              element: <ViewExam />,
              errorElement: <div>404</div>,
            },
            {
              path: "update-exam/:id",
              element: <UpdateExam />,
            },
            {
              path: "add/:role",
              element: <AddRole />,
            },
            {
              path: "userprofile",
              element: <UserProfile />,
            },
            {
              path: "allquestion",
              element: <Allquestions />,
            },
            {
              path: "creditRequestList",
              element: <CreditRequestList />,
            },
            {
              path: "subject/:id",
              element: <GridList />,
            },
            {
              path: "examdetails/:id",
              element: <ExamDetails />,
            },
            {
              path: "facultyDetails/:id",
              element: <FacultyView />,
            },
            {
              path: "deletedexam",
              element: <DeletedExam />,
            },
            {
              path:"deletedquestion",
              element:<DeletedMcq/>
            },
            {
              path: "viewAnswers/:id",
              element: <ViewAnswer />,
              errorElement: <div>400</div>,
            },
            {
              path: "viewalluserexam",
              element: <AllUserGivenExam />,
              errorElement: <div>400</div>,
            },
            {
              path: "createcontest",
              element: <CreateContest />,
              errorElement: <div>400</div>,
            },
            {
              path:"annoucement",
              element:<Annouement/>,
              errorElement:<div>404</div>

            },
            {
              path:"contestlist",
              element:<AllContest/>,
              errorElement:<div>404</div>

            },
            {
              path:"contestdetail/:id",
              element:<ContestDetail/>
            }

          ],
        },
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
