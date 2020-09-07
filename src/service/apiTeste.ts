import axios from "axios";

const apiTeste = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/",
});
export default apiTeste;
