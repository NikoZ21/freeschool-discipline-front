import { useState, useEffect } from "react";
import "./MainPage.css";
import StudentsTable from "../components/StudentsTable";

export default function MainPage() {
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
