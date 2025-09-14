export interface Student {
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

export const initialStudents: Student[] = [
  {
    id: "01025077162",
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
    id: "02847319548",
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
    id: "03691724853",
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
    id: "04582936174",
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
    id: "05738241965",
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
