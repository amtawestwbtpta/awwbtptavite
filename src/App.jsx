import "./App.css";
import "react-toastify/dist/ReactToastify.css";
//eslint-disable-next-line
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./app/Home";
import Dashboard from "./app/dashboard/page";
import JulySalary from "./app/JulySalary/page";
import TaxCalculator from "./app/taxcalculator/page";
import PayslipWbtpta from "./app/payslipwbtpta/page";
import PaySlipOsmsNew from "./app/paysliposmsNew/page";
import Form16NewPage from "./app/Form16New/Form16NewPage";
import Form16Prev from "./app/Form16Prev/page";
import Downloads from "./app/downloads/page";
import SchoolTeacherData from "./app/schoolteacherdata/page";
import SchoolTeacherDataUnlog from "./app/SchoolTeacherDataUnlog/page";
import TechSalary from "./app/techsalary/page";
import AgeCalculator from "./app/agecalculator/page";
import GpWiseSchool from "./app/gpwiseschool/page";
import GPWiseTeacher from "./app/GPWiseTeacher/page";
import FlexibleComp from "./app/FlexibleComp/page";
import TeacherServiceLife from "./app/TeacherServiceLife/page";
import YearWiseTeachers from "./app/YearWiseTeachers/page";
import Ropa2019 from "./app/Ropa2019/page";
import EditTeacher from "./app/EditTeacher/page";
import TeacherPhotoCorner from "./app/TeacherPhotoCorner/page";
import QuestionSec from "./app/questionsec/page";
import QuestionRequisition from "./app/QuestionRequisition/page";
import PrintQuestionInvoice from "./app/printquestioninvoice/page";
import PrintQuestionAll from "./app/PrintQuestionAll/page";
import PrintQuestionAllCompact from "./app/PrintQuestionAllCompact/page";
import TeacherDatabase from "./app/teacherdatabase/page";
import TeacherDatabaseUnlog from "./app/TeacherDatabaseUnlog/page";
import ChangePhoto from "./app/ChangePhoto/page";
import FindTeacher from "./app/findteacher/page";
import TeacherAddress from "./app/teacherAddress/page";
import DisplayDatabase from "./app/displaydatabase/page";
import DisplayComplain from "./app/displaycomplain/page";
import ViewDetails from "./app/ViewDetails/page";
import AddTeacher from "./app/AddTeacher/page";
import AdminDashboard from "./app/admindashboard/page";
import AdminUploadFile from "./app/adminUploadFile/page";
import AdminUploadImage from "./app/adminUploadImage/page";
import MemoSection from "./app/MemoSection/page";
import Notification from "./app/Notification/page";
import NoticeDetails from "./components/NoticeDetails";
import FloodRelief from "./app/FloodRelief/page";
import DownloadOsmsPayslip from "./app/downloadOsmsPayslip/DownloadOsmsPayslip";
import DownloadWBTPTAPayslip from "./app/downloadWBTPTAPayslip/DownloadWBTPTAPayslip";
import IncomeTaxReloded from "./app/IncomeTaxReloded/page";
import LeaveProposalNewPage from "./app/LeaveProposalNew/page";
import HRADeclarationApp from "./app/HRADeclaration/page";
import UpdateSelf from "./app/update_self/page";
import UpdateUP from "./app/updateunp/page";
import Complain from "./app/complain/page";
import Login from "./app/login/page";
import SignUpPage from "./app/signup/page";
import Registration from "./components/Registration";
import LogOut from "./app/logout/page";
import OtpForm from "./app/forgotPassword/page";
import RetirementCalculator from "./app/RetirementCalculator/page";
import TechersAccuitance from "./app/TechersAccuitance/page";
import Retirement from "./app/Retirement/page";
import MonthlyAWSalary from "./app/MonthlyAWSalary/page";
import ChangeUserImage from "./app/ChangeUserImage/page";
import DAArrearCalculation from "./app/daarrearcalculation/page";
import DCRGForm from "./app/DCRGForm/page";
import EPensionFiles from "./app/EPensionFiles/page";
import HolisticPRCard from "./app/HolisticPRCardAny/page";
import ImageUpload from "./app/imageUpload/page";
import MonthlyDAArrear from "./app/monthlyDAArrear/page";
import TeacherTransferComponent from "./app/TeacherSelection/page";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { GlobalContextProvider } from "./context/Store";

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/JulySalary" element={<JulySalary />} />
      <Route exact path="/taxcalculator" element={<TaxCalculator />} />
      <Route exact path="/payslipwbtpta" element={<PayslipWbtpta />} />
      <Route exact path="/techpaysliposmsNew" element={<PaySlipOsmsNew />} />
      <Route exact path="/Form16NewPage" element={<Form16NewPage />} />
      <Route exact path="/Form16Prev" element={<Form16Prev />} />
      <Route exact path="/downloads" element={<Downloads />} />
      <Route exact path="/schoolteacherdata" element={<SchoolTeacherData />} />
      <Route
        exact
        path="/SchoolTeacherDataUnlog"
        element={<SchoolTeacherDataUnlog />}
      />
      <Route exact path="/techsalary" element={<TechSalary />} />
      <Route exact path="/agecalculator" element={<AgeCalculator />} />
      <Route exact path="/gpwiseschool" element={<GpWiseSchool />} />
      <Route exact path="/GPWiseTeacher" element={<GPWiseTeacher />} />
      <Route exact path="/FlexibleComp" element={<FlexibleComp />} />
      <Route
        exact
        path="/TeacherServiceLife"
        element={<TeacherServiceLife />}
      />
      <Route exact path="/YearWiseTeachers" element={<YearWiseTeachers />} />
      <Route exact path="/Ropa2019" element={<Ropa2019 />} />
      <Route exact path="/EditTeacher" element={<EditTeacher />} />
      <Route
        exact
        path="/TeacherPhotoCorner"
        element={<TeacherPhotoCorner />}
      />
      <Route exact path="/questionsec" element={<QuestionSec />} />
      <Route
        exact
        path="/QuestionRequisition"
        element={<QuestionRequisition />}
      />
      <Route
        exact
        path="/printquestioninvoice"
        element={<PrintQuestionInvoice />}
      />
      <Route exact path="/PrintQuestionAll" element={<PrintQuestionAll />} />

      <Route
        exact
        path="/PrintQuestionAllCompact"
        element={<PrintQuestionAllCompact />}
      />

      <Route exact path="/teacherdatabase" element={<TeacherDatabase />} />
      <Route
        exact
        path="/TeacherDatabaseUnlog"
        element={<TeacherDatabaseUnlog />}
      />
      <Route exact path="/ChangePhoto" element={<ChangePhoto />} />
      <Route exact path="/findteacher" element={<FindTeacher />} />
      <Route exact path="/teacherAddress" element={<TeacherAddress />} />
      <Route exact path="/displaydatabase" element={<DisplayDatabase />} />
      <Route exact path="/displaycomplain" element={<DisplayComplain />} />
      <Route exact path="/ViewDetails" element={<ViewDetails />} />
      <Route exact path="/AddTeacher" element={<AddTeacher />} />

      <Route exact path="/admindashboard" element={<AdminDashboard />} />
      <Route exact path="/adminUploadFile" element={<AdminUploadFile />} />
      <Route exact path="/adminUploadImage" element={<AdminUploadImage />} />
      <Route exact path="/MemoSection" element={<MemoSection />} />
      <Route exact path="/Notification" element={<Notification />} />
      <Route exact path="/NoticeDetails" element={<NoticeDetails />} />
      <Route exact path="/FloodRelief" element={<FloodRelief />} />
      <Route
        exact
        path="/DownloadOsmsPayslip"
        element={<DownloadOsmsPayslip />}
      />
      <Route
        exact
        path="/DownloadWBTPTAPayslip"
        element={<DownloadWBTPTAPayslip />}
      />
      <Route exact path="/IncomeTaxReloded" element={<IncomeTaxReloded />} />
      <Route
        exact
        path="/LeaveProposalNewPage"
        element={<LeaveProposalNewPage />}
      />
      <Route exact path="/HRADeclarationApp" element={<HRADeclarationApp />} />
      <Route exact path="/update_self" element={<UpdateSelf />} />
      <Route exact path="/updateunp" element={<UpdateUP />} />
      <Route exact path="/complain" element={<Complain />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUpPage />} />
      <Route exact path="/registration" element={<Registration />} />
      <Route exact path="/logout" element={<LogOut />} />
      <Route exact path="/forgotPassword" element={<OtpForm />} />
      <Route
        exact
        path="/RetirementCalculator"
        element={<RetirementCalculator />}
      />
      <Route exact path="/TechAccuitance" element={<TechersAccuitance />} />
      <Route exact path="/Retirement" element={<Retirement />} />
      <Route exact path="/MonthlyAWSalary" element={<MonthlyAWSalary />} />
      <Route exact path="/ChangeUserImage" element={<ChangeUserImage />} />
      <Route
        exact
        path="/DAArrearCalculation"
        element={<DAArrearCalculation />}
      />
      <Route exact path="/DCRGForm" element={<DCRGForm />} />
      <Route exact path="/EPensionFiles" element={<EPensionFiles />} />
      <Route exact path="/HolisticPRCard" element={<HolisticPRCard />} />
      <Route exact path="/ImageUpload" element={<ImageUpload />} />
      <Route exact path="/MonthlyDAArrear" element={<MonthlyDAArrear />} />
      <Route
        exact
        path="/TeacherTransferComponent"
        element={<TeacherTransferComponent />}
      />
    </Routes>
  );
};
function App() {
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowAlert(true);
    }, 500);
    setTimeout(() => {
      setShowAlert(false);
    }, 15000);
  }, []);
  return (
    <GlobalContextProvider>
      <HashRouter>
        <div className="container-fluid w-100 h-100 bg-light text-center mx-auto">
          {showAlert && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>To download Our Android App Click</strong>{" "}
              <a
                className="d-inline-block text-decoration-none fw-bold"
                href="https://drive.google.com/drive/folders/1QQzBMJjI_MXTKxP3_ayTo7QflGD0vbVP?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Here
              </a>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setShowAlert(false)}
              ></button>
            </div>
          )}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
            theme="light"
          />
          <Navbar />
          <Routing />
          <Footer />
        </div>
      </HashRouter>
    </GlobalContextProvider>
  );
}

export default App;
