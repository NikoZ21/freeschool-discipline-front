import React, { useState } from "react";
import "./StudentsTable.css";

interface Student {
  id: string;
  name: string;
  lastname: string;
  usesSchoolBus: boolean;
  region: string;
  siblings: string;
  mother: string;
  father: string;
  personInCharge: string;
  grade: string;
  acceptanceDate: string; // format: 2025.08.17
  recommendation: string;
  currentCost: number;
  personalInfoAgreement: boolean;
  costBenefits: string;
  images: string[];
  disciplines: {
    date: string;
    name: string;
    comment: string;
    attachments: string[];
  }[];
}

const StudentsTable: React.FC = () => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  // Sample student data
  const students: Student[] = [
    {
      id: "STD001",
      name: "ანა",
      lastname: "ნიკოლაძე",
      usesSchoolBus: true,
      region: "ვაკე",
      siblings: "1 sister",
      mother: "მარიამ ნიკოლაძე",
      father: "გიორგი ნიკოლაძე",
      personInCharge: "მარიამ ნიკოლაძე",
      grade: "7th",
      acceptanceDate: "2024.08.15",
      recommendation: "Excellent academic performance",
      currentCost: 1200,
      personalInfoAgreement: true,
      costBenefits: "50% discount for siblings",
      images: ["student1.jpg"],
      disciplines: [
        {
          date: "2024.11.15",
          name: "Late arrival",
          comment: "Arrived 15 minutes late to first period",
          attachments: [],
        },
      ],
    },
    {
      id: "STD002",
      name: "დავით",
      lastname: "მამარდაშვილი",
      usesSchoolBus: false,
      region: "საბურთალო",
      siblings: "none",
      mother: "ნინო მამარდაშვილი",
      father: "ალექსანდრე მამარდაშვილი",
      personInCharge: "ნინო მამარდაშვილი",
      grade: "9th",
      acceptanceDate: "2024.08.20",
      recommendation: "Good in mathematics",
      currentCost: 1500,
      personalInfoAgreement: true,
      costBenefits: "None",
      images: ["student2.jpg"],
      disciplines: [],
    },
    {
      id: "STD003",
      name: "ნინო",
      lastname: "ცხოვრებაძე",
      usesSchoolBus: true,
      region: "ისანი",
      siblings: "2 brothers",
      mother: "ეკა ცხოვრებაძე",
      father: "Unknown",
      personInCharge: "ეკა ცხოვრებაძე",
      grade: "5th",
      acceptanceDate: "2024.09.01",
      recommendation: "Creative and artistic",
      currentCost: 800,
      personalInfoAgreement: true,
      costBenefits: "Social benefit - 30% discount",
      images: ["student3.jpg"],
      disciplines: [
        {
          date: "2024.12.01",
          name: "Disruptive behavior",
          comment: "Talking during class",
          attachments: ["incident_report.pdf"],
        },
      ],
    },
    {
      id: "STD004",
      name: "გიორგი",
      lastname: "კვარცხელია",
      usesSchoolBus: false,
      region: "მთაწმინდა",
      siblings: "1 brother",
      mother: "თამარ კვარცხელია",
      father: "ლევან კვარცხელია",
      personInCharge: "თამარ კვარცხელია",
      grade: "11th",
      acceptanceDate: "2023.08.10",
      recommendation: "Excellent in sports",
      currentCost: 1800,
      personalInfoAgreement: true,
      costBenefits: "Sports scholarship - 25% discount",
      images: ["student4.jpg"],
      disciplines: [],
    },
    {
      id: "STD005",
      name: "მარიამ",
      lastname: "ღუდუშაური",
      usesSchoolBus: true,
      region: "გლდანი",
      siblings: "none",
      mother: "ლელა ღუდუშაური",
      father: "ვახტანგ ღუდუშაური",
      personInCharge: "ლელა ღუდუშაური",
      grade: "6th",
      acceptanceDate: "2024.08.25",
      recommendation: "Excellent language skills",
      currentCost: 1000,
      personalInfoAgreement: true,
      costBenefits: "None",
      images: ["student5.jpg"],
      disciplines: [],
    },
  ];

  const filterOptions = [
    "All",
    "With Disciplines",
    "School Bus",
    "Cost Benefits",
    "Recent Acceptance",
  ];

  // Show all students since filters are hidden
  const filteredStudents = students;

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === currentStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(currentStudents.map((student) => student.id));
    }
  };

  const getDisciplineStatusColor = (disciplineCount: number) => {
    if (disciplineCount === 0) return "#4caf50"; // Green for no disciplines
    if (disciplineCount <= 2) return "#ff9800"; // Orange for few disciplines
    return "#f44336"; // Red for many disciplines
  };

  const formatCurrency = (amount: number) => {
    return `₾${amount.toFixed(0)}`;
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split(".");
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="order-table-container">
      {/* Filter Tabs - Hidden for now */}
      {/* <div className="filter-tabs">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            className={`filter-tab ${currentFilter === filter ? "active" : ""}`}
            onClick={() => setCurrentFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div> */}

      {/* Action Buttons */}
      {selectedStudents.length > 0 && (
        <div className="action-buttons">
          <span className="selected-count">
            {selectedStudents.length} Selected
          </span>
          <button className="action-btn duplicate-btn">📄 Export</button>
          <button className="action-btn print-btn">🖨️ Print</button>
          <button className="action-btn delete-btn">🗑️ Delete</button>
          <button className="close-btn" onClick={() => setSelectedStudents([])}>
            ✕
          </button>
        </div>
      )}

      {/* Table */}
      <div className="table-wrapper">
        <table className="order-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  checked={
                    selectedStudents.length === currentStudents.length &&
                    currentStudents.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th>პირადი ნომერი ↕</th>
              <th>სრული სახელი ↕</th>
              <th>კლასი ↕</th>
              <th>საცხოვრებელი უბანი ↕</th>
              <th>სკოლის ავტობუსი ↕</th>
              <th>დედმამიშვილი ↕</th>
              <th>დედა ↕</th>
              <th>მამა ↕</th>
              <th>მეურვე ↕</th>
              <th>მიღების თარიღი ↕</th>
              <th>რეკომენდაცია ↕</th>
              <th>გადასახადი ↕</th>
              <th>თანხმობა ↕</th>
              <th>შეღავათები ↕</th>
              <th>სურათები ↕</th>
              <th>დისციპლინა ↕</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr
                key={student.id}
                className={
                  selectedStudents.includes(student.id) ? "selected" : ""
                }
              >
                <td className="checkbox-col">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleSelectStudent(student.id)}
                  />
                </td>
                <td className="order-number">{student.id}</td>
                <td className="customer-info">
                  <div className="customer-cell">
                    <span className="avatar">👤</span>
                    <span className="name">
                      {student.name} {student.lastname}
                    </span>
                  </div>
                </td>
                <td>{student.grade}</td>
                <td>{student.region}</td>
                <td>
                  <span
                    className={`payment-status ${
                      student.usesSchoolBus ? "paid" : "unpaid"
                    }`}
                  >
                    {student.usesSchoolBus ? "კი" : "არა"}
                  </span>
                </td>
                <td>{student.siblings}</td>
                <td>{student.mother}</td>
                <td>{student.father}</td>
                <td>{student.personInCharge}</td>
                <td>{formatDate(student.acceptanceDate)}</td>
                <td className="recommendation">{student.recommendation}</td>
                <td className="amount">
                  {formatCurrency(student.currentCost)}
                </td>
                <td>
                  <span
                    className={`payment-status ${
                      student.personalInfoAgreement ? "paid" : "unpaid"
                    }`}
                  >
                    {student.personalInfoAgreement ? "კი" : "არა"}
                  </span>
                </td>
                <td className="benefits">{student.costBenefits}</td>
                <td>{student.images.length} ფაილი</td>
                <td>
                  <span
                    className="status-badge"
                    style={{
                      backgroundColor: getDisciplineStatusColor(
                        student.disciplines.length
                      ),
                    }}
                  >
                    {student.disciplines.length}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">
          Showing {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of{" "}
          {filteredStudents.length} students
        </div>
        <div className="pagination-controls">
          <button
            className="page-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`page-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          {totalPages > 3 && <span className="page-dots">...</span>}
          <button
            className="page-btn"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsTable;
