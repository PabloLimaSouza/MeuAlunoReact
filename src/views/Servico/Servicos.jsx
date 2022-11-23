import React , { useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";
import "./Servicos.css";
import StoreContext from "../../contexts/StoreContext";
import { Button } from "@material-ui/core";
import { url } from "../../../src/variaveis";
import { onlyLetters, currencyMask, currencyMaskList } from "../../utils/mask";

const Servicos = () => {
  const history = useHistory();
  const { token, userLogged } = useContext(StoreContext); 
  const response = useFetch(`${ url }/api/v1/servicos/empresa/${userLogged.empresaId}`,"get",token); 
  
  function novoServico() {
    history.push("/cadastroServico");
  }

  function editarServico(id) {
    history.push(`/cadastroServico/${id}`);
  }

  function showServicos(servicos) {
    return servicos.map((servico) => (      
      <tr onClick={() => editarServico(servico.id)}>
        <td key={servico.id}>{servico.id}</td>
        <td key={servico.descricao}>{servico.descricao}</td>
        <td key={servico.valor}>{currencyMaskList(parseFloat(servico.valor).toFixed(2))}</td>
        <td key={servico.qtdAulas}>{servico.qtdAulas}</td>
        <td key={servico.fidelidade}>{servico.fidelidade ? "SIM" : "NÃO"}</td>
      </tr>
    ));
  }
  return (
    <div className="lista-servicos">
      <h1>Serviços</h1>
      <div className="btn-novo">
          <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={novoServico}
                className="btn-novo"                
              >
                Novo Serviço
              </Button>
          </div>
      <table id="servicos">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Qtd. Aulas</th>
            <th>Fidelidade</th>
          </tr>
          {response.data ? showServicos(response.data) : false}
        </tbody>
      </table>
    </div>
  );
};

export default Servicos;
