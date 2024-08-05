import { PatientNote } from "../types";

export const patientNotes: PatientNote[] = [
    {
      id: "1",
      medicalType: "Consultation",
      ScheduleTime: "09:00 AM",
      date: "01/06/2023",
      profilePicture: "/person4.jpg",
      name: "Alice Smith",
      detailsModal: {
        gmail: "alice20@gmail.com",
        phNo: "+251910123456",
        meetLink: "https://www.google.com/search?q=consultation+",
      },
    },
    {
      id: "2",
      medicalType: "X-Ray Examination",
      ScheduleTime: "10:30 AM",
      date: "02/06/2023",
      profilePicture: "/person5.jpg",
      name: "John Doe",
      detailsModal: {
        gmail: "john20@gmail.com",
        phNo: "+251911234567",
        meetLink: "https://www.google.com/search?q=xray+examination+",
      },
    },
    {
      id: "3",
      medicalType: "Lab Test",
      ScheduleTime: "11:00 AM",
      date: "03/06/2023",
      profilePicture: "/person6.jpg",
      name: "Emily Johnson",
      detailsModal: {
        gmail: "emily20@gmail.com",
        phNo: "+251912345678",
        meetLink: "https://www.google.com/search?q=lab+test+",
      },
    },
    {
      id: "4",
      medicalType: "Physical Therapy",
      ScheduleTime: "01:00 PM",
      date: "04/06/2023",
      profilePicture: "/person7.jpg",
      name: "Michael Wilson",
      detailsModal: {
        gmail: "michael20@gmail.com",
        phNo: "+251913456789",
        meetLink: "https://www.google.com/search?q=physical+therapy+",
      },
    },
    {
      id: "5",
      medicalType: "Ultrasound",
      ScheduleTime: "02:30 PM",
      date: "05/06/2023",
      profilePicture: "/person8.jpg",
      name: "Sophia Martinez",
      detailsModal: {
        gmail: "sophia20@gmail.com",
        phNo: "+251914567890",
        meetLink: "https://www.google.com/search?q=ultrasound+",
      },
    },
    {
      id: "6",
      medicalType: "EKG",
      ScheduleTime: "03:30 PM",
      date: "06/06/2023",
      profilePicture: "/person9.jpg",
      name: "Matthew Brown",
      detailsModal: {
        gmail: "matthew20@gmail.com",
        phNo: "+251915678901",
        meetLink: "https://www.google.com/search?q=ekg+",
      },
    },
  ];
  