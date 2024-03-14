import axios from "axios";

import { serviceUrl } from "../../fixtures.js";

export const apiService = {
  apiUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.apiUrl}/api/users`, user);
    return res.data;
  },
};
