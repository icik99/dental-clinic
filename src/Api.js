import request from "./utils/request";
import axios from "axios";

class Api {
  static urlAPI() {
    return process.env.REACT_APP_BACKEND_URL;
    // return 'http://localhost:5003/'
  }

  // Begin :: Auth
  static Login(username, password) {
    let path = "login";
    return request(`${this.urlAPI()}${path}`, {
      method: "POST",
      data: {
        username,
        password,
      },
    });
  }
  static Register(data) {
    let path = "register";
    return request(`${this.urlAPI()}${path}`, {
      method: "POST",
      data,
    });
  }

  static Register(data) {
    let path = "register";
    return request(`${this.urlAPI()}${path}`, {
      method: "POST",
      data,
    });
  }

  static Fetch(token) {
    let path = `fetch`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetDashboard(token) {
    let path = `dashboard`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetListKunjungan(token) {
    let path = `list-kunjungan`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // Pasien
  static GetPasien(token, keyword, page) {
    let path = `patient?search=${keyword}&page=${page}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static GetPasienById(token, id) {
    let path = `patient/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static CreatePasien(token, data) {
    let path = `patient`;
    return request(`${this.urlAPI()}${path}`, {
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static UpdatePasien(token, data, id) {
    let path = `patient/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static DeletePasien(token, id) {
    let path = `patient/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Rekam Medis
  static GetRekamMedisByPatient(token, id) {
    let path = `rekam-medis/patient/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static GetRekamMedis(token, keyword, page) {
    let path = `rekam-medis?search=${keyword}&page=${page}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static GetRekamMedisById(token, id) {
    let path = `rekam-medis/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static CreateRekamMedis(token, data) {
    let path = `rekam-medis`;
    return request(`${this.urlAPI()}${path}`, {
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static UpdateRekamMedis(token, data, id) {
    let path = `rekam-medis/put/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static UpdateKoreksiRekamMedis(token, data, id) {
    let path = `rekam-medis-koreksi/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static DeleteRekamMedis(token, id) {
    let path = `rekam-medis/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Payment

  static GetPayment(token, search, page, startDate, endDate, patientId) {
    let path = `invoice?search=${search}&page=${page}&startDate=${startDate}&endDate=${endDate}&patientId=${patientId}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetPaymentById(token, id) {
    let path = `invoice?invoiceId=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static UpdatePayment(token, data, id) {
    let path = `invoice/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static CreateLayanan(token, data) {
    let path = `layanan`;
    return request(`${this.urlAPI()}${path}`, {
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetLayanan(token, page, keyword, sorting) {
    let path = `layanan?page=${page}&search${keyword}=&sorting=${sorting}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetLayananById(token, id) {
    let path = `layanan/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static UpdateLayanan(token, data, id) {
    let path = `layanan/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static DeleteLayanan(token, id) {
    let path = `layanan/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetWilayah(token, kodeProvinsi, kodeKota, kodeKecamatan) {
    let path = `wilayah?kodeProvinsi=${kodeProvinsi}&kodeKota=${kodeKota}&kodeKecamatan=${kodeKecamatan}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetObat(token, page, keyword, sorting) {
    let path = `obat?page=${page}&search${keyword}=&sorting=${sorting}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static CreateObat(token, data) {
    let path = `obat`;
    return request(`${this.urlAPI()}${path}`, {
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetObatById(token, id) {
    let path = `obat/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static UpdateObat(token, data, id) {
    let path = `obat/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static DeleteObat(token, id) {
    let path = `obat/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static SendToWhatsApp(token, phone, formData) {
    let path = `send-wa?phone=${phone}`;
    return axios.post(`${this.urlAPI()}${path}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    .then(response => console.log('Response data:', response.data))
    .catch(error => console.error('Error:', error));
  }
}

export default Api;
