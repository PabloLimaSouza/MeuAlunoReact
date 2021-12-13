import React, { useState, useEffect, useContext } from "react";
import { Button, Grid, MenuItem, Paper, TextField } from "@material-ui/core";
import useStyles from "../Styles/useStyles";
import StoreContext from "../../contexts/StoreContext";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import "./Usuarios.css";


const Usuarios = () => {
  const { token } = useContext(StoreContext);  
  const classes = useStyles();
  const history = useHistory();

 

  const url = `https://localhost:44389/api/usuariosPorEmpresa/${token.empresaId}`;
  const response = useFetch(url);  


  const initialValues = {
    TipoUsuario: "",
    EmpresaId: "",
    PessoaId: "",
    Login: "",
    Senha: "" ,
    showPassword: false,      
};

const[values,setValues] = useState(initialValues);
  
  function editarUsuario(id){
    history.push(`/cadastroUsuario/${id}`)
  }

  function novoUsuario(){
    history.push("/cadastroUsuario")
  } 

  function showUsuarios(usuarios){
      console.log(usuarios);
    return (
        usuarios.map((usuario) => (
        <tr onClick={() => editarUsuario(usuario.id)}>
          <td key={usuario.id}>{usuario.id}</td>          
          <td key={usuario.empresaNome}>{usuario.empresaNome}</td>
          <td key={usuario.pessoaNome}>{usuario.pessoaNome}</td>
          <td key={usuario.login}>{usuario.login}</td>
          <td key={usuario.tipoUsuario}>{usuario.tipoUsuario === 1 ? "Administrador" : "Cliente"}</td>
          <td key={usuario.ativo}>{usuario.ativo === true ? "Ativo" : "Inativo"}</td>                        
        </tr>
      ))
    )
  }
  
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div className={classes.titulo}>
            <h1>Usuários</h1>
          </div>
          <div className="btn-novo">
          <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={novoUsuario}
                className="btn-novo"                
              >
                Novo
              </Button>
          </div>
          <Paper className={classes.paper}>
         <div className="lista-financeiros">
             <table id="financeiros">
                 <tbody>
                     <tr>
                         <th>Id</th>
                         <th>Empresa</th>
                         <th>Pessoa</th>
                         <th>Login</th>
                         <th>Tipo</th>
                         <th>Status</th>                         
                     </tr>
                    {response.data ?
                    showUsuarios(response.data)
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

export default Usuarios;
