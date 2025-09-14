import "./MainPage.css";
import StudentsTable from "../components/StudentsTable";

export default function MainPage() {
  return (
    <div className="main-page">
      <div className="container">
        {/* Order Management Table */}
        <div className="order-management-section">
          <h2 className="section-title">
            მოსწავლეების დისციპლინარული მონაცემები
          </h2>
          <StudentsTable />
        </div>
      </div>
    </div>
  );
}
