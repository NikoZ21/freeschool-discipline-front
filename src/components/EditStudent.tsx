import React, { useState, useEffect } from "react";

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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white shadow-2xl max-w-4xl w-11/12 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-800 bg-slate-700">
          <h2 className="text-2xl font-semibold text-white">
            სტუდენტის რედაქტირება
          </h2>
          <button
            className="text-gray-300 hover:text-white hover:bg-slate-600 p-2 transition-all duration-200 text-2xl"
            onClick={handleCancel}
          >
            ✕
          </button>
        </div>

        <div className="px-8 py-8">
          <form className="space-y-6">
            {/* Personal ID - readonly */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                პირადი ნომერი:
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                className="px-4 py-3 border-2 border-gray-200  bg-gray-50 text-gray-600 cursor-not-allowed focus:outline-none"
                readOnly
              />
            </div>

            {/* Name and Lastname */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  სახელი:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200  focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-200 text-gray-900"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  გვარი:
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200  focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-200 text-gray-900"
                  required
                />
              </div>
            </div>

            {/* Grade and Region */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  კლასი:
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200  focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-200 bg-white text-gray-900"
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
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  უბანი:
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200  focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-200 bg-white text-gray-900"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  დედა:
                </label>
                <input
                  type="text"
                  name="mother"
                  value={formData.mother}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200  focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-200 text-gray-900"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  მამა:
                </label>
                <input
                  type="text"
                  name="father"
                  value={formData.father}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200  focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-200 text-gray-900"
                />
              </div>
            </div>

            {/* Person in charge and siblings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  მეურვე:
                </label>
                <input
                  type="text"
                  name="personInCharge"
                  value={formData.personInCharge}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200  focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-200 text-gray-900"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  დედმამიშვილი:
                </label>
                <input
                  type="text"
                  name="siblings"
                  value={formData.siblings}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200  focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-200 text-gray-900"
                  placeholder="მაგ: 2 brothers, 1 sister, none"
                />
              </div>
            </div>

            {/* Acceptance Date */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                მიღების თარიღი:
              </label>
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
                className="px-4 py-3 border-2 border-gray-200  focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-200 text-gray-900"
                required
              />
            </div>

            {/* Cost */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                გადასახადი (ლარი):
              </label>
              <input
                type="number"
                name="currentCost"
                value={formData.currentCost}
                onChange={handleInputChange}
                className="px-4 py-3 border-2 border-gray-200  focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-200 text-gray-900"
                min="0"
                step="1"
                required
              />
            </div>

            {/* Recommendation */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                რეკომენდაცია:
              </label>
              <textarea
                name="recommendation"
                value={formData.recommendation}
                onChange={handleInputChange}
                className="px-4 py-3 border-2 border-gray-200  focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-200 resize-y min-h-[80px] text-gray-900"
                rows={3}
                placeholder="სტუდენტის შესახებ რეკომენდაცია..."
              />
            </div>

            {/* Cost Benefits */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                შეღავათები:
              </label>
              <textarea
                name="costBenefits"
                value={formData.costBenefits}
                onChange={handleInputChange}
                className="px-4 py-3 border-2 border-gray-200  focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-200 resize-y min-h-[60px] text-gray-900"
                rows={2}
                placeholder="გადასახდის შეღავათები..."
              />
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="usesSchoolBus"
                  checked={formData.usesSchoolBus}
                  onChange={handleInputChange}
                  className="w-5 h-5 accent-slate-700 border-2 border-gray-300 focus:ring-slate-500 focus:ring-2 bg-white"
                />
                <label className="text-sm font-medium text-gray-700 cursor-pointer">
                  სკოლის ავტობუსი
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="personalInfoAgreement"
                  checked={formData.personalInfoAgreement}
                  onChange={handleInputChange}
                  className="w-5 h-5 accent-slate-700 border-2 border-gray-300 focus:ring-slate-500 focus:ring-2 bg-white"
                />
                <label className="text-sm font-medium text-gray-700 cursor-pointer">
                  პირადი ინფორმაციის თანხმობა
                </label>
              </div>
            </div>
          </form>
        </div>

        <div className="flex justify-end space-x-4 px-8 py-6 border-t border-gray-200 bg-gray-50">
          <button
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold  hover:bg-gray-100 transition-all duration-200"
            onClick={handleCancel}
          >
            გაუქმება
          </button>
          <button
            className="px-6 py-3 bg-slate-700 text-white font-semibold  hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={handleSave}
          >
            შენახვა
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
