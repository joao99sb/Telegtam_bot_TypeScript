import apiTeste from "../service/apiTeste";

interface ApiObj {
  id: number;
  sigla: string;
  nome: string;
  regiao: { id: number; sigla: string; nome: string };
}
async function ApiFunction(): Promise<Array<ApiObj>> {
  const a = await apiTeste.get("api/v1/localidades/estados");

  return a.data;
}
export default ApiFunction;
