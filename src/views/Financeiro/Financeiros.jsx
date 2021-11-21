import React, { useState, useEffect, useContext } from "react";
import { Button, Grid, MenuItem, Paper, TextField } from "@material-ui/core";
import useStyles from "../Styles/useStyles";
import StoreContext from "../../contexts/StoreContext";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import "./Financeiros.css";
import CurrencyFormat from 'react-currency-format';

const Financeiros = () => {
  const { token } = useContext(StoreContext);  
  const classes = useStyles();
  const history = useHistory();

 

  const url = `https://localhost:44389/api/financeiroPorEmpresa/${token.empresaId}`;
  const response = useFetch(url);  

  var CurrencyFormat = require('react-currency-format');

  const initialValues = {
    Id: 0,
    AlunoId: 0,
    NomeAluno: "",
    DataVencimento: "",    
    Valor: 0,
    FormaPagamento: "",
    Situacao: 0,
    EmpresaId: 0,    
  }
  const [values,setValues] = useState(initialValues); 
  
  function editarFinanceiro(id){
    history.push(`/cadastroFinanceiro/${id}`)
  }

  function novoFinanceiro(){
    history.push("/cadastroFinanceiro")
  } 

  function showFinanceiros(financeiros){
    return (
      financeiros.map((financeiro) => (
        <tr onClick={() => editarFinanceiro(financeiro.id)}>
          <td key={financeiro.id}>{financeiro.id}</td>
          <td>Receber</td>
          <td key={financeiro.nomeAluno}>{financeiro.nomeAluno}</td>
          <td key={financeiro.dataVencimento}>{format(new Date(financeiro.dataVencimento),'dd/MM/yyy')}</td>
          <CurrencyFormat value={financeiro.valor} displayType='text' thousandSeparator={true} prefix={'R$'} 
          renderText={value => <td key={financeiro.valor}>{value}</td>}/>
          <td key={financeiro.situacao}>Em aberto            
         </td>                
        </tr>
      ))
    )
  }
  
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div className={classes.titulo}>
            <h1>Financeiro</h1>
          </div>
          <div className="btn-novo">
          <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={novoFinanceiro}
                className="btn-novo"                
              >
                Novo
              </Button>
          </div>
          <Paper className={classes.paper}>              
            <div className={classes.subtitulo}>
              <Grid container spacing={4}>
                <Grid item xs={3}>
                  <TextField
                    id="VencimentoInicio"
                    name="VencimentoInicio"
                    type="date"
                    label="Vencimento Inicio"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="VencimentoFim"
                    name="VencimentoFim"
                    type="date"
                    label="Vencimento Fim"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="Tipo"
                    name="Tipo"
                    label="Tipo"
                    fullWidth
                    select
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem value="CRE">CRE</MenuItem>
                    <MenuItem value="CPA">CPA</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                <TextField
                    id="Situacao"
                    name="Situacao"
                    label="Situação"
                    fullWidth
                    select
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem value="Todos">Todos</MenuItem>  
                    <MenuItem value="Aberto">Abertos</MenuItem>
                    <MenuItem value="Fechado">Fechados</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={12}>
                <Grid item xs={6}>
                  <TextField
                    id="Aluno"
                    name="Aluno"
                    type="Aluno"
                    label="Aluno"
                    fullWidth                   
                  />
                </Grid>
                <Grid item xs={2}>
                <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={novoFinanceiro}
                className="btn-novo"                
              >
                Pesquisar
              </Button>
                </Grid>
                </Grid>
               
            </div>
            </Paper>
          <Paper className={classes.paper}>
         <div className="lista-financeiros">
             <table id="financeiros">
                 <tbody>
                     <tr>
                         <th>Id</th>
                         <th>Tipo</th>
                         <th>Aluno</th>
                         <th>Vencimento</th>
                         <th>Valor</th>
                         <th>Situação</th>                         
                     </tr>
                    {response.data ?
                    showFinanceiros(response.data)
                    : false}
                 </tbody>
             </table>

         </div>
          </Paper>
        </Paper>
       
      </main>
    </React.Fragment>
  );
}

export default Financeiros;
