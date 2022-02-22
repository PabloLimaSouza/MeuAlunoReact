import { 
    Grid, MenuItem, Paper, TextField, Button,  DialogTitle,
    DialogContent,
    DialogContentText,  
    Dialog,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import useStyles from "../Styles/useStyles";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";
import StoreContext from "../../contexts/StoreContext";
import { url } from "../../../src/variaveis";

function CadastroUsuario() {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const history = useHistory();
    const { token, userLogged } = useContext(StoreContext);

    var editando = false;
    var editarUsuarioUrl = "";
    const editarUsuarioId = window.location.pathname.split("/");
    if (editarUsuarioId[2] != null) {
        editarUsuarioUrl = `${ url }/api/usuarioPorId/${editarUsuarioId[2]}`;
        editando = true;
    }

    const listaEmpresas = useFetch(`${ url }/api/empresa`,"get",token);
    var listaPessoas = "";  

    const initialValues = {
        Id: 0,
        TipoUsuario: "",
        EmpresaId: "",
        PessoaId: "",
        Login: "",
        Senha: "",
        EmpresaNome: "",
        PessoaNome: "",
        Ativo: false          
    };

    const[values,setValues] = useState(initialValues);
    const [responsePessoas,setResponse] = useState({
        data: null,
        loading: true
    })

    useEffect( () => {        
      const responsePessoas = fetch(`${ url }/api/pessoasPorEmpresa/${userLogged.EmpresaId}`, {          
      //const responsePessoas = fetch(`https://localhost:44389/api/pessoasPorEmpresa/${values.EmpresaId}`, {          
        method: "GET",
        headers: {
          Authorization: 'Bearer '+token,
          Accept: "application/json",
          "Content-Type": "application/json",
        }})
        .then(resp => resp.json())
        .then(json => setResponse({
                data: json,
                loading: false
            }));                              
    }, [values.EmpresaId]);

    useEffect( () => {
      console.log(responsePessoas.data);
    },[responsePessoas])

  const responseEditarUsuario = useFetch(editarUsuarioUrl);
    
  useEffect(
    function() {
      if(responseEditarUsuario.data != null){
        setValues((prevState) => ({
          Id: responseEditarUsuario.data.id,
          TipoUsuario: responseEditarUsuario.data.tipoUsuario,
          EmpresaId: responseEditarUsuario.data.empresaId,
          PessoaId: responseEditarUsuario.data.pessoaId,
          Login: responseEditarUsuario.data.login,          
          EmpresaNome: responseEditarUsuario.data.empresaNome,
          PessoaNome: responseEditarUsuario.data.pessoaNome,
          Ativo: responseEditarUsuario.data.ativo, 
        }))
      }
    },[responseEditarUsuario]
  );

    const showPessoas = () => {
        return  responsePessoas.data ? 
         (
            responsePessoas.data.map((pessoa) => (
                 <MenuItem value={pessoa.id}>
                     {pessoa.nome}
                </MenuItem>
             ))
         ) : false
     };

    const showEmpresas = () => {
        console.log(listaEmpresas);
       return  listaEmpresas.data ? 
        (
            listaEmpresas.data.map((empresa) => (
                <MenuItem value={empresa.id}>
                    {empresa.razaoSocial}
               </MenuItem>
            ))
        ) : false
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: e.target.value});
        console.log({name, value});
    };

    const alertas = {
        text: "",
        title: ""
      }
    const [mensagem, setMensagem] = useState(alertas);

  const handleClickOpen = () => {      
    if (validadorForm()) {
      handleSubmit();      
    } else {
      console.log("form inválido");
    }
  };

  const validadorForm = () => {
    if(values.TipoUsuario == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar tipo de usuário" });
      setOpen(true);      
    } else if (values.EmpresaId == ""){
        setMensagem({ ...values, title: "Alerta!", text: "Necessário selecionar empresa do usuário" });
      setOpen(true);
    } else if (values.PessoaId == ""){
        setMensagem({ ...values, title: "Alerta!", text: "Necessário selecionar pessoa do usuário" });
      setOpen(true);
    } else if (values.Login == ""){
        setMensagem({ ...values, title: "Alerta!", text: "Necessário informar login do usuário" });
      setOpen(true);
    } else if (values.Senha == ""){
        setMensagem({ ...values, title: "Alerta!", text: "Necessário informar senha do usuário" });
      setOpen(true);
    } else {
      return true;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit(e) {
    alert("Sucess: \n\n" + JSON.stringify(values, null, 4));
    console.log(values);    

    const response = fetch(`${ url }/api/usuario/`, {
      //const response = fetch("https://localhost:44389/api/usuario/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response === "Usuário cadastrado com sucesso" || response === "Usuário atualizada") {
          setMensagem({ ...values, title: "Sucesso!", text: response })
          setOpen(true);
         } 
        else {
          setMensagem({ ...values, title: "Erro!", text: "Erro ao cadastrar usuário" })
          setOpen(true);
        }
      });
  }


    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <div className={classes.titulo}>
                        <h1>Cadastro de Usuários</h1>
                    </div>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    id="TipoUsuario"
                                    name="TipoUsuario"
                                    label="Tipo"
                                    select
                                    onChange={handleChange}
                                    fullWidth
                                    value={values.TipoUsuario}
                                >
                                    <MenuItem value="1">Admin</MenuItem>
                                    <MenuItem value="2">Cliente</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="EmpresaId"
                                    name="EmpresaId"
                                    label="Empresa"
                                    fullWidth
                                    value={values.EmpresaId}
                                    onChange={handleChange}                                    
                                    select                                   
                                >
                                     {listaEmpresas.data ? showEmpresas() : false}
                                    </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="PessoaId"
                                    name="PessoaId"
                                    label="Pessoa"
                                    fullWidth
                                    value={values.PessoaId}
                                    onChange={handleChange}
                                    select                                    
                                >
                                {showPessoas()}
                            	</TextField>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    id="Login"
                                    name="Login"
                                    label="Login"
                                    disabled={editando}
                                    fullWidth
                                    value={values.Login}
                                    onChange={handleChange}
                                />
                            </Grid>
                            {editando ?
                            ""
                            : (
                                <Grid item xs={12} sm={4}>
                                <TextField
                                    id="Senha"
                                    name="Senha"
                                    label="Senha"
                                    type="password"
                                    value={values.Senha}
                                    onChange={handleChange}                                   
                                />
                            </Grid>
                            )}

                            {editando ?
                            (
                                <Grid item xs={12} sm={4}>
                                <TextField
                                    id="Ativo"
                                    name="Ativo"
                                    label="Situação"                                  
                                    value={values.Ativo}
                                    onChange={handleChange}
                                    select                                   
                                >
                                  <MenuItem value={true}>Ativo</MenuItem>
                                  <MenuItem value={false}>Inativo</MenuItem>
                                </TextField>                               
                            </Grid>
                            )
                          : ""}
                           
                        </Grid>

                        <div className={classes.buttons}>
                            {editando
                                ? false
                                : <Button
                                    variant="contained"
                                    color="inherit"
                                    className={classes.button}
                                >
                                    Limpar
                                </Button>}

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleClickOpen}
                                className={classes.button}
                            >
                                {editando ? "Atualizar" : "Cadastrar"}
                            </Button>
                        </div>
                    </form>
                </Paper>
                <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{mensagem.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {mensagem.text}
            </DialogContentText>
          </DialogContent>          

          {(mensagem.text == "Usuário cadastrado com sucesso" || mensagem.text == "Usuário atualizado com sucesso") ?     
            <Button onClick={() => { handleClose(); history.push("/usuarios"); }}>Ok</Button>
             : <Button onClick={handleClose}>Ok</Button>} 
          
        </Dialog>
            </main>
        </React.Fragment>
    );
}

export default CadastroUsuario;