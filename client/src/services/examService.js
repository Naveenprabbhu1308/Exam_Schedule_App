import API from "../api";

export const getExams = () => API.get("/exams");
export const addExam = (data) => API.post("/exams", data);

export const getHalls = () => API.get("/halls");
export const addHall = (data) => API.post("/halls", data);
