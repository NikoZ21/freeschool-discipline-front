import { useState } from "react";
import "./MainPage.css";

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    // TODO: Implement actual search functionality
    setTimeout(() => {
      // Mock search results
      setStudents([
        { id: 1, name: "გიორგი კვარაცხელია", grade: "10ა", age: 16 },
        { id: 2, name: "ნინო მუხარაძე", grade: "11ბ", age: 17 },
      ]);
      setIsLoading(false);
    }, 500);
  };

  const handleShowAllStudents = async () => {
    setIsLoading(true);
    // TODO: Implement actual fetch all students functionality
    setTimeout(() => {
      // Mock all students data
      setStudents([
        { id: 1, name: "გიორგი კვარაცხელია", grade: "10ა", age: 16 },
        { id: 2, name: "ნინო მუხარაძე", grade: "11ბ", age: 17 },
        { id: 3, name: "დავით შალვაშვილი", grade: "9გ", age: 15 },
        { id: 4, name: "ანა ხუდაიბერდიევა", grade: "12ა", age: 18 },
        { id: 5, name: "ლუკა ნოზაძე", grade: "8ვ", age: 14 },
      ]);
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="main-page">
      <div className="container">
        <h1 className="title">სტუდენტების მონაცემთა ბაზა</h1>

        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="მოძებნე სტუდენტი"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="search-button"
              onClick={handleSearch}
              disabled={isLoading}
            >
              ძებნა
            </button>
          </div>

          <button
            className="show-all-button"
            onClick={handleShowAllStudents}
            disabled={isLoading}
          >
            ყველა სტუდენტის ნახვა
          </button>
        </div>

        {isLoading && <div className="loading">იტვირთება...</div>}

        {students.length > 0 && !isLoading && (
          <div className="results-section">
            <h2 className="results-title">სტუდენტები ({students.length})</h2>
            <div className="students-grid">
              {students.map((student) => (
                <div key={student.id} className="student-card">
                  <h3 className="student-name">{student.name}</h3>
                  <p className="student-info">კლასი: {student.grade}</p>
                  <p className="student-info">ასაკი: {student.age} წელი</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {students.length === 0 && !isLoading && searchTerm && (
          <div className="no-results">სტუდენტი ვერ მოიძებნა</div>
        )}
      </div>
    </div>
  );
}
