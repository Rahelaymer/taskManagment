
export type SortConfigPatientNotes = {
    key: keyof PNotes | "";
    direction: "ascending" | "descending" | "";
  };
  
  export interface PNotes {
    id: string;
    medicalType: string;
    ScheduleTime: string;
    date: string;
    profilePicture: string;
    name: string;
    detailsModal: {
      gmail: string;
      phNo: string;
      meetLink: string;
    };
  }
  

export interface PatientNote {
    id: string;
    medicalType: string;
    ScheduleTime: string;
    date: string;
    profilePicture: string;
    name: string;
    detailsModal: {
      gmail: string;
      phNo: string;
      meetLink: string;
    };
  }

