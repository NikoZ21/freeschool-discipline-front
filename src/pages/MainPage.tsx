import { useState, useEffect } from "react";
import "./MainPage.css";
import StudentsTable from "../components/StudentsTable";

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  // const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // Load all students on component mount
  useEffect(() => {
    const loadAllStudents = () => {
      // Mock all students data
      const allStudents = [
        { id: 1, name: "გიორგი კვარაცხელია", grade: "10ა", age: 16 },
        { id: 2, name: "ნინო მუხარაძე", grade: "11ბ", age: 17 },
        { id: 3, name: "დავით შალვაშვილი", grade: "9გ", age: 15 },
        { id: 4, name: "ანა ხუდაიბერდიევა", grade: "12ა", age: 18 },
        { id: 5, name: "ლუკა ნოზაძე", grade: "8ვ", age: 14 },
      ];
      setStudents(allStudents);
      // setFilteredStudents(allStudents);
      // setIsLoading(false);
    };

    // Simulate loading delay
    setTimeout(loadAllStudents, 500);
  }, []);

  // Filter students based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      // setFilteredStudents(students);
    } else {
      // const filtered = students.filter(
      //   (student) =>
      //     student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //     student.grade.toLowerCase().includes(searchTerm.toLowerCase())
      // );
      // setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  return (
    <div className="main-page">
      <div className="container">
        <h1 className="title">სტუდენტების მონაცემთა ბაზა</h1>

        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="მოძებნე სტუდენტი სახელით ან კლასით..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

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
