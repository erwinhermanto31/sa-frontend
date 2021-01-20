import http from "../http-common";

class ShiftDataService {
  getAll() {
    return http.get("/shifts");
  }

  get(id) {
    return http.get(`/shifts/${id}`);
  }

  create(data) {
    return http.post("/shifts", data);
  }

  update(id, data) {
    return http.put(`/shifts/${id}`, data);
  }

  delete(id) {
    return http.put(`/shifts/delete/${id}`);
  }

}

export default new ShiftDataService();