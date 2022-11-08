import React, { useState, useContext, useEffect } from "react";
import { url } from "../../../src/variaveis";
import StoreContext from "../../contexts/StoreContext";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Select,
  Divider,
  Switch,
  FormLabel,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  Tooltip,
} from "@material-ui/core";
import useStyles from "../Styles/useStyles";
import { useFetch } from "../../hooks/useFetch";
import { MenuItem } from "@material-ui/core";
import { format } from "date-fns";
import { useHistory } from "react-router";
import { cepMask, cpfMask, currencyMask, onlyLetters, onlyNumbersMax5, phoneMask, onlyNumbers, cnpjMask } from "../../utils/mask";



function CadastroEmpresa() {
  const { token } = useContext(StoreContext);
  const { userLogged, setUserLogged } = useContext(StoreContext);
  var editando = false;
  var editarEmpresaUrl = "";
  const editarEmpresaId = window.location.pathname.split("/");
  if (editarEmpresaId[2] != null) {
    editarEmpresaUrl = `${ url }/api/empresa/${editarEmpresaId[2]}`;
    editando = true;
  }

  const empresaResponse = useFetch(editarEmpresaUrl,"get",token);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const person = { Nome: "", Telefone: "" };
  const [disableFields, setDisable] = useState(false);

  const initialValues = {
    Id: 0,
    TipoEmpresa: "",
    UsarDados: false,
    CNPJ_CPF: "",
    RazaoSocial: "",
    Telefone: "",
    Ativo: true,
    Endereco: {
      Logradouro: "",
      Numero: "",
      Complemento: "",
      Bairro: "",
      Cidade: "",
      Estado: "",
      CEP: "",
    },
    Pessoa: {
        Nome: "",
        CPF: "",
        DataNascimento: "",
        Email: "",
        Telefone: "",        
    },
  };

  const [values, setValues] = useState(initialValues);
  const alertas = {
    text: "",
    title: ""
  }

  const [mensagem, setMensagem] = useState(alertas);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {      
    if (validadorForm()) {
      handleSubmit();      
    } else {
      console.log("form inválido");
    }
  };

  const validadorForm = () => {
    if(values.TipoEmpresa == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o tipo da empresa" });
      setOpen(true);      
    } else if(values.RazaoSocial == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar nome da empresa" });
      setOpen(true);  
    } else if(values.CNPJ_CPF == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar CNPJ ou CPF da empresa" });
      setOpen(true);  
    } else if(values.Telefone == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o nº de telefone da empresa" });
      setOpen(true); 
    } else if(values.Endereco.Logradouro == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o logradouro do endereço" });
      setOpen(true); 
    } else if(values.Endereco.Numero == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o número do endereço" });
      setOpen(true); 
    } else if(values.Endereco.Cidade == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar a cidade do endereço" });
      setOpen(true); 
    } else if(values.Endereco.Bairro == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o bairro do endereço" });
      setOpen(true); 
    } else if(values.Endereco.Estado == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o estado do endereço" });
      setOpen(true); 
    } else if(values.Endereco.CEP == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o CEP do endereço" });
      setOpen(true); 
    } else if(values.Pessoa.Nome == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o nome da pessoa" });
      setOpen(true); 
    } else if(values.Pessoa.CPF == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o CPF da pessoa" });
      setOpen(true); 
    } else if(values.Pessoa.DataNascimento == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar a data de nascimento da pessoa" });
      setOpen(true); 
    } else if(values.Pessoa.Email == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o e-mail da pessoa" });
      setOpen(true); 
    } else if(values.Pessoa.Telefone == ""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o telefone da pessoa" });
      setOpen(true); 
    }
    else {
      return true;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(
    function () {
      if (empresaResponse.data != null) {
        setValues((prevState) => ({
          Id: empresaResponse.data.id,
          TipoEmpresa: empresaResponse.data.cnpJ_CPF.length < 12 ? "1" : "2",
          CNPJ_CPF: empresaResponse.data.cnpJ_CPF,
          RazaoSocial: empresaResponse.data.razaoSocial,
          Telefone: empresaResponse.data.telefone,
          Ativo: empresaResponse.data.ativo,
          Endereco: {
            Id: empresaResponse.data.endereco.id,
            Logradouro: empresaResponse.data.endereco.logradouro,
            Numero: empresaResponse.data.endereco.numero,
            Complemento: empresaResponse.data.endereco.complemento,
            Bairro: empresaResponse.data.endereco.bairro,
            Cidade: empresaResponse.data.endereco.cidade,
            Estado: empresaResponse.data.endereco.estado,
            CEP: empresaResponse.data.endereco.cep,
          },
          Pessoa: {
            Nome: empresaResponse.data.pessoas[0].nome,
            CPF: empresaResponse.data.pessoas[0].cpf,
            Email: empresaResponse.data.pessoas[0].email,
            DataNascimento: format(
              new Date(empresaResponse.data.pessoas[0].dataNascimento),
              "yyyy-MM-dd"
            ),
            Telefone: empresaResponse.data.pessoas[0].telefone,
          },
        }));
        setDisable(true);
      }
    },
    [empresaResponse]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: e.target.value });
  };

  const handlePessoa = (e) => {
    const { name, value } = e.target;
    const Endereco = { ...values.Endereco };
    const Pessoa = { ...values.Pessoa };

    if (name == "Logradouro") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Logradouro") Endereco[key] = value;
      });
    } else if (name == "Numero") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Numero") Endereco[key] = value;
      });
    } else if (name == "Complemento") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Complemento") Endereco[key] = value;
      });
    } else if (name == "Bairro") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Bairro") Endereco[key] = value;
      });
    } else if (name == "Cidade") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Cidade") Endereco[key] = value;
      });
    } else if (name == "Estado") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Estado") Endereco[key] = value;
      });
    } else if (name == "CEP") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "CEP") Endereco[key] = value;
      });
    } else if (name == "CPF") {
      Object.keys(Pessoa).forEach((key) => {
        if (key === "CPF") Pessoa[key] = value;
      }); 
    } else if (name == "Nome") {
      Object.keys(Pessoa).forEach((key) => {
        if (key === "Nome") Pessoa[key] = value;
      }); 
    } else if (name == "Email") {
      Object.keys(Pessoa).forEach((key) => {
        if (key === "Email") Pessoa[key] = value;
      }); 
    } else if (name == "Telefone") {
      Object.keys(Pessoa).forEach((key) => {
        if (key === "Telefone") Pessoa[key] = value;
      }); 
    } else if (name == "DataNascimento") {
      Object.keys(Pessoa).forEach((key) => {
        if (key === "DataNascimento") Pessoa[key] = value;
      }); 
    }    
    setValues({ ...values, Endereco, Pessoa});
  };

  const funcUsarDadosEmpresa = (e) => {
    const { name, checked } = e.target;
    const newPessoa = values;
    
    newPessoa.Pessoa = {
      Nome: values.RazaoSocial,
      CPF: values.CNPJ_CPF,
      Telefone: values.Telefone,
      DataNascimento: "",
      Email: "",    
    };
    setValues({...values, Pessoa: newPessoa});
    setValues({ ...values, [name]: e.target.checked });   
  };

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    setValues({ ...values, [name]: e.target.checked });
  };

  function handleSubmit(e) {
    if (values.Id != 0) {
      const valuesToSubmit = values;
      setValues({ ...values, valuesToSubmit });
    }
   
    const response = fetch(`${ url }/api/empresa/`, {
      method: "POST",
      headers: {
        Authorization: 'Bearer '+token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {          
          setUserLogged({ ...userLogged, empresa: response })
          setMensagem({ ...values, title: "Sucesso!", text: editando ? "Empresa atualizada" : "Empresa cadastrada" })
          setOpen(true);
         } 
        else {
          setMensagem({ ...values, title: "Erro!", text: response })
          setOpen(true);
        }        
      });
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div className={classes.titulo}>
            <h1>Cadastro de Empresa</h1>
          </div>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="TipoEmpresa"
                  name="TipoEmpresa"
                  label="Tipo"
                  select
                  fullWidth
                  value={values.TipoEmpresa}
                  onChange={handleChange}
                >
                  <MenuItem value="1">Física</MenuItem>
                  <MenuItem value="2">Jurídica</MenuItem>
                </TextField>
                </Grid>

                <Grid item xs={12} sm={2}>
                  <FormLabel>Ativa?</FormLabel>

                  <Switch
                    color="primary"
                    name="Ativo"
                    value={values.Ativo}
                    checked={values.Ativo}
                    onChange={handleCheckChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    fullWidth
                  />
                </Grid>


            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="RazaoSocial"
                  name="RazaoSocial"
                  label="Nome"
                  fullWidth
                  onChange={handleChange}
                  value={values.RazaoSocial}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  id="CNPJ_CPF"
                  name="CNPJ_CPF"
                  label={
                    values.TipoEmpresa == "1"
                      ? "CPF"
                      : values.TipoEmpresa == "2"
                      ? "CNPJ"
                      : "CNPJ OU CPF"
                  }
                  fullWidth
                  
                  onChange={(e) => { values.TipoEmpresa == "1" ? handleChange(cpfMask(e)) : handleChange(cnpjMask(e)) } }
                  value={values.CNPJ_CPF}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Telefone"
                  name="Telefone"
                  label="Telefone"
                  fullWidth
                  onChange={(e) => { handleChange(phoneMask(e)) }}
                  value={values.Telefone}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Endereco.Logradouro"
                  name="Logradouro"
                  onChange={handlePessoa}
                  value={values.Endereco.Logradouro}
                  label="Logradouro"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <TextField
                  id="Endereco.Numero"
                  name="Numero"
                  label="Nº"
                  onChange={(e) => { handlePessoa(onlyNumbersMax5(e)) }}
                  value={values.Endereco.Numero}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="Endereco.Complemento"
                  name="Complemento"
                  label="Complemento"
                  onChange={handlePessoa}
                  value={values.Endereco.Complemento}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Endereco.Cidade"
                  name="Cidade"
                  label="Cidade"
                  onChange={handlePessoa}
                  value={values.Endereco.Cidade}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Endereco.Bairro"
                  name="Bairro"
                  onChange={handlePessoa}
                  value={values.Endereco.Bairro}
                  label="Bairro"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Endereco.Estado"
                  name="Estado"
                  label="Estado"
                  onChange={handlePessoa}
                  value={values.Endereco.Estado}
                  fullWidth
                  select
                >
                  <MenuItem value="AC">Acre</MenuItem>
                  <MenuItem value="AL">Alagoas</MenuItem>
                  <MenuItem value="AP">Amapá</MenuItem>
                  <MenuItem value="AM">Amazonas</MenuItem>
                  <MenuItem value="BA">Bahia</MenuItem>
                  <MenuItem value="CE">Ceará</MenuItem>
                  <MenuItem value="DF">Distrito Federal</MenuItem>
                  <MenuItem value="ES">Espírito Santo</MenuItem>
                  <MenuItem value="GO">Goiás</MenuItem>
                  <MenuItem value="MA">Maranhão</MenuItem>
                  <MenuItem value="MT">Mato Grosso</MenuItem>
                  <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
                  <MenuItem value="MG">Minas Gerais</MenuItem>
                  <MenuItem value="PA">Pará</MenuItem>
                  <MenuItem value="PB">Paraíba</MenuItem>
                  <MenuItem value="PR">Paraná</MenuItem>
                  <MenuItem value="PE">Pernambuco</MenuItem>
                  <MenuItem value="PI">Piauí</MenuItem>
                  <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                  <MenuItem value="RN">Rio Grande do Norte</MenuItem>
                  <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                  <MenuItem value="RO">Rondônia</MenuItem>
                  <MenuItem value="RR">Roraima</MenuItem>
                  <MenuItem value="SC">Santa Catarina</MenuItem>
                  <MenuItem value="SP">São Paulo</MenuItem>
                  <MenuItem value="SE">Sergipe</MenuItem>
                  <MenuItem value="TO">Tocantins</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Endereco.CEP"
                  name="CEP"
                  label="CEP"
                  onChange={(e) => { handlePessoa(cepMask(e)) }}
                  value={values.Endereco.CEP}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <br></br>
                <div className={classes.subtitulo}>
                  <h4>Dados Usuário</h4>
                  <Divider />
                </div>
                <Grid item xs={12} sm={4}>
                  <FormLabel>Usar dados da empresa?</FormLabel>

                  <Switch
                    color="primary"
                    name="UsarDados"
                    value={values.UsarDados}
                    checked={values.UsarDados}
                    disabled={disableFields}
                    onChange={funcUsarDadosEmpresa}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Pessoa.Nome"
                  name="Nome"
                  label="Nome"
                  fullWidth
                  disabled={disableFields}
                  onChange={(e) => { handlePessoa(onlyLetters(e)) }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    values.UsarDados ? values.RazaoSocial : values.Pessoa.Nome
                  }
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  id="Pessoa.CPF"
                  name="CPF"
                  label="CPF"
                  fullWidth
                  disabled={disableFields}
                  onChange={(e) => { handlePessoa(cpfMask(e)) }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    values.UsarDados ? values.CNPJ_CPF : values.Pessoa.CPF
                  }
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="Pessoa.DataNascimento"
                  name="DataNascimento"
                  label="Data Nascimento"
                  type="date"
                  onChange={handlePessoa}
                  disabled={disableFields}
                  value={values.Pessoa.DataNascimento}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Pessoa.Email"
                  name="Email"
                  label="E-mail"
                  disabled={disableFields}
                  fullWidth
                  onChange={handlePessoa}
                  value={values.Pessoa.Email}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <TextField
                  id="Pessoa.Telefone"
                  name="Telefone"
                  label="Telefone"
                  disabled={disableFields}
                  fullWidth
                  onChange={(e) => { handlePessoa(phoneMask(e)) }}
                  value={
                    values.UsarDados ? values.Telefone : values.Pessoa.Telefone
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
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

          {(mensagem.title == "Sucesso!") ?     
            <Button onClick={() => { handleClose(); history.push("/empresas"); }}>Ok</Button>
             : <Button onClick={handleClose}>Ok</Button>} 
          
        </Dialog>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default CadastroEmpresa;
