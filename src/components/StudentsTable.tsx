import React, { useState } from "react";
import "./StudentsTable.css";
import EditStudent from "./EditStudent";
import { type Student, initialStudents } from "../data/students";

const StudentsTable: React.FC = () => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [gradeFilter, setGradeFilter] = useState<string>("");
  const [busFilter, setBusFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("");
  const [agreementFilter, setAgreementFilter] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const itemsPerPage = 9;

  // Initialize studentsData with sample data
  const [studentsData, setStudentsData] = useState<Student[]>(initialStudents);

  // const filterOptions = [
  //   "All",
  //   "With Disciplines",
  //   "School Bus",
  //   "Cost Benefits",
  //   "Recent Acceptance",
  // ];

  // Filter students based on search term and filters
  const filteredStudents = studentsData.filter((student) => {
    // Search filter
    let matchesSearch = true;
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      matchesSearch =
        student.name.toLowerCase().includes(searchLower) ||
        student.lastname.toLowerCase().includes(searchLower) ||
        student.id.includes(searchTerm) ||
        student.grade.toLowerCase().includes(searchLower) ||
        student.region.toLowerCase().includes(searchLower);
    }

    // Region filter
    const matchesRegion = !regionFilter || student.region === regionFilter;

    // Grade filter
    const matchesGrade = !gradeFilter || student.grade === gradeFilter;

    // Bus filter
    let matchesBus = true;
    if (busFilter === "yes") matchesBus = student.usesSchoolBus;
    else if (busFilter === "no") matchesBus = !student.usesSchoolBus;

    // Year filter (based on acceptance date)
    let matchesYear = true;
    if (yearFilter) {
      const studentYear = student.acceptanceDate.split(".")[0];
      matchesYear = studentYear === yearFilter;
    }

    // Agreement filter
    let matchesAgreement = true;
    if (agreementFilter === "yes")
      matchesAgreement = student.personalInfoAgreement;
    else if (agreementFilter === "no")
      matchesAgreement = !student.personalInfoAgreement;

    return (
      matchesSearch &&
      matchesRegion &&
      matchesGrade &&
      matchesBus &&
      matchesYear &&
      matchesAgreement
    );
  });

  // Get unique values for filter options
  const uniqueRegions = [...new Set(studentsData.map((s) => s.region))];
  const uniqueGrades = [...new Set(studentsData.map((s) => s.grade))];
  const uniqueYears = [
    ...new Set(studentsData.map((s) => s.acceptanceDate.split(".")[0])),
  ].sort((a, b) => b.localeCompare(a));

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

  const handleEditStudent = () => {
    if (selectedStudents.length === 1) {
      const student = studentsData.find((s) => s.id === selectedStudents[0]);
      if (student) {
        setStudentToEdit(student);
        setIsEditModalOpen(true);
      }
    }
  };

  const handleSaveStudent = (updatedStudent: Student) => {
    setStudentsData((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setStudentToEdit(null);
  };

  return (
    <div>
      {/* Filter Card */}
      <div className="filter-card">
        <div className="filter-left">
          <div className="search-section-new">
            <label className="filter-label">ძებნა:</label>
            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input-new"
                placeholder="🔍 სახელი, გვარი, ID, კლასი..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="filter-right">
          <div className="filters-section">
            {/* First row of filters */}
            <div className="filters-row">
              <div className="filter-group">
                <label className="filter-label">უბანი:</label>
                <select
                  className="filter-select"
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                >
                  <option value="">ყველა</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">კლასი:</label>
                <select
                  className="filter-select"
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                >
                  <option value="">ყველა</option>
                  {uniqueGrades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">ავტობუსი:</label>
                <select
                  className="filter-select"
                  value={busFilter}
                  onChange={(e) => setBusFilter(e.target.value)}
                >
                  <option value="">ყველა</option>
                  <option value="yes">კი</option>
                  <option value="no">არა</option>
                </select>
              </div>
            </div>

            {/* Second row of filters */}
            <div className="filters-row">
              <div className="filter-group">
                <label className="filter-label">მიღების წელი:</label>
                <select
                  className="filter-select"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  <option value="">ყველა</option>
                  {uniqueYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">თანხმობა:</label>
                <select
                  className="filter-select"
                  value={agreementFilter}
                  onChange={(e) => setAgreementFilter(e.target.value)}
                >
                  <option value="">ყველა</option>
                  <option value="yes">კი</option>
                  <option value="no">არა</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
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
            <button
              className={`action-btn edit-btn ${
                selectedStudents.length !== 1 ? "disabled" : ""
              }`}
              onClick={handleEditStudent}
              disabled={selectedStudents.length !== 1}
            >
              ✏️ ჩასწორება
            </button>
            <button className="action-btn delete-btn">🗑️ წაშლა</button>
            {/* <button className="action-btn duplicate-btn">📄 Export</button>
            <button className="action-btn print-btn">🖨️ Print</button> */}
            <button
              className="close-btn"
              onClick={() => setSelectedStudents([])}
            >
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

      {/* Edit Student Modal */}
      <EditStudent
        student={studentToEdit}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveStudent}
      />
    </div>
  );
};

export default StudentsTable;
