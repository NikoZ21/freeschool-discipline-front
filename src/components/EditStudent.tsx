import React, { useState, useEffect } from "react";
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
  acceptanceDate: string;
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

interface EditStudentProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedStudent: Student) => void;
}

const EditStudent: React.FC<EditStudentProps> = ({
  student,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Student | null>(null);

  useEffect(() => {
    if (student) {
      setFormData({ ...student });
    }
  }, [student]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (!formData) return;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name === "currentCost") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData(student ? { ...student } : null);
    onClose();
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>სტუდენტის რედაქტირება</h2>
          <button className="modal-close-btn" onClick={handleCancel}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <form className="edit-form">
            {/* Personal ID - readonly */}
            <div className="form-group">
              <label className="form-label">პირადი ნომერი:</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                className="form-input readonly"
                readOnly
              />
            </div>

            {/* Name and Lastname */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">სახელი:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">გვარი:</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Grade and Region */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">კლასი:</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">აირჩიეთ კლასი</option>
                  <option value="1st">1-ლი კლასი</option>
                  <option value="2nd">მე-2 კლასი</option>
                  <option value="3rd">მე-3 კლასი</option>
                  <option value="4th">მე-4 კლასი</option>
                  <option value="5th">მე-5 კლასი</option>
                  <option value="6th">მე-6 კლასი</option>
                  <option value="7th">მე-7 კლასი</option>
                  <option value="8th">მე-8 კლასი</option>
                  <option value="9th">მე-9 კლასი</option>
                  <option value="10th">მე-10 კლასი</option>
                  <option value="11th">მე-11 კლასი</option>
                  <option value="12th">მე-12 კლასი</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">უბანი:</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">აირჩიეთ უბანი</option>
                  <option value="ვაკე">ვაკე</option>
                  <option value="საბურთალო">საბურთალო</option>
                  <option value="ისანი">ისანი</option>
                  <option value="მთაწმინდა">მთაწმინდა</option>
                  <option value="გლდანი">გლდანი</option>
                  <option value="დიდუბე">დიდუბე</option>
                  <option value="ნაძალადევი">ნაძალადევი</option>
                  <option value="ჩუღურეთი">ჩუღურეთი</option>
                </select>
              </div>
            </div>

            {/* Parents */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">დედა:</label>
                <input
                  type="text"
                  name="mother"
                  value={formData.mother}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">მამა:</label>
                <input
                  type="text"
                  name="father"
                  value={formData.father}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            {/* Person in charge and siblings */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">მეურვე:</label>
                <input
                  type="text"
                  name="personInCharge"
                  value={formData.personInCharge}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">დედმამიშვილი:</label>
                <input
                  type="text"
                  name="siblings"
                  value={formData.siblings}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="მაგ: 2 brothers, 1 sister, none"
                />
              </div>
            </div>

            {/* Acceptance Date */}
            <div className="form-group">
              <label className="form-label">მიღების თარიღი:</label>
              <input
                type="date"
                name="acceptanceDate"
                value={formData.acceptanceDate.split(".").reverse().join("-")}
                onChange={(e) => {
                  const dateValue = e.target.value;
                  const formattedDate = dateValue
                    .split("-")
                    .reverse()
                    .join(".");
                  handleInputChange({
                    ...e,
                    target: {
                      ...e.target,
                      name: "acceptanceDate",
                      value: formattedDate,
                    },
                  });
                }}
                className="form-input"
                required
              />
            </div>

            {/* Cost */}
            <div className="form-group">
              <label className="form-label">გადასახადი (ლარი):</label>
              <input
                type="number"
                name="currentCost"
                value={formData.currentCost}
                onChange={handleInputChange}
                className="form-input"
                min="0"
                step="1"
                required
              />
            </div>

            {/* Recommendation */}
            <div className="form-group">
              <label className="form-label">რეკომენდაცია:</label>
              <textarea
                name="recommendation"
                value={formData.recommendation}
                onChange={handleInputChange}
                className="form-textarea"
                rows={3}
                placeholder="სტუდენტის შესახებ რეკომენდაცია..."
              />
            </div>

            {/* Cost Benefits */}
            <div className="form-group">
              <label className="form-label">შეღავათები:</label>
              <textarea
                name="costBenefits"
                value={formData.costBenefits}
                onChange={handleInputChange}
                className="form-textarea"
                rows={2}
                placeholder="გადასახდის შეღავათები..."
              />
            </div>

            {/* Checkboxes */}
            <div className="form-row">
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="usesSchoolBus"
                    checked={formData.usesSchoolBus}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  სკოლის ავტობუსი
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="personalInfoAgreement"
                    checked={formData.personalInfoAgreement}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  პირადი ინფორმაციის თანხმობა
                </label>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleCancel}>
            გაუქმება
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            შენახვა
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
