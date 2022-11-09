import React, { useContext, useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import StoreContext from "../../contexts/StoreContext";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { cepMask, cpfMask, onlyLetters, onlyNumbersMax5, phoneMask, dateFormat, dayNumber } from "../../utils/mask";
import { url } from "../../../src/variaveis";
import Loader from "../../utils/loader";

import {
  Button,
  Divider,
  Grid,  
  MenuItem,
  Paper,
  Select,
  TextField,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  CircularProgress

} from "@material-ui/core";
import useStyles from "../Styles/useStyles";
import { format } from 'date-fns';
import { useHistory } from "react-router";


function CadastroAluno() {
  const { token, userLogged } = useContext(StoreContext);

  const materiasUrl = `${ url }/api/materiaPorEmpresa/${userLogged.empresaId}`;
  const materiasResponse = useFetch(materiasUrl,"get",token);
  const servicosUrl = `${ url }/api/servicoPorEmpresa/${userLogged.empresaId}`;
  const servicosResponse = useFetch(servicosUrl,"get",token);
  
  const gerarContrato = () => {
    fetch(`${ url }/api/gerarContratoPDF/${userLogged.empresaId},${values.Id}`, {
      method: "GET",
      headers: {
        Authorization: 'Bearer '+token,
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
  };  

  const editarAlunoId = window.location.pathname.split("/");
  var editarAlunoUrl = "";

  if (editarAlunoId[2] != null) {
    editarAlunoUrl = `${ url }/api/aluno/${editarAlunoId[2]}`;
  }

  const history = useHistory();

  const alunoResponse = useFetch(editarAlunoUrl,"get",token);
  const [open, setOpen] = useState(false);
  
  const initialValues = {
    Id: 0,
    Nome: "",
    DataNascimento: "",
    Serie: "",
    NomeResponsavel: "",
    CPFResponsavel: "",
    TelefoneResponsavel: "",
    EmailResponsavel: "",
    Escola: "",
    Endereco: {
      Logradouro: "",
      Numero: "",
      Complemento: "",
      Bairro: "",
      Cidade: "",
      Estado: "",
      CEP: "",
    },
    EmpresaId: userLogged.empresaId,
    ServicoId: "",
    MateriaAlunos: [],
    DiaVencimento: 1
  };

  const [values, setValues] = useState(initialValues);

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
    if(values.Nome ===""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar nome do aluno" });
      setOpen(true);      
    } else if(values.DataNascimento ===""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar data de nascimento do aluno" });
      setOpen(true); 
    } else if(values.Serie ===""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar a série do aluno" });
      setOpen(true); 
    } else if(values.Escola ===""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o nome da escola do aluno" });
      setOpen(true); 
    } else if(values.NomeResponsavel ===""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o nome do responsável pelo aluno" });
      setOpen(true); 
    
    // else if(values.CPFResponsavel ===""){
    //   setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o CPF do responsável pelo aluno" });
    //   setOpen(true); 
    // 

    // } else if(values.TelefoneResponsavel ===""){
    //   setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o telefone do responsável pelo aluno" });
    //   setOpen(true); 

    } else if(values.Endereco.Logradouro ===""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o logradouro do endereço" });
      setOpen(true); 
    } else if(values.Endereco.Numero ===""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o número do endereço" });
      setOpen(true); 
    } else if(values.Endereco.Cidade ===""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar a cidade do endereço" });
      setOpen(true); 
    } else if(values.Endereco.Bairro ===""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o bairro do endereço" });
      setOpen(true); 
    } else if(values.Endereco.Estado ===""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o estado do endereço" });
      setOpen(true); 
    } else if(values.Endereco.CEP ===""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário informar o CEP do endereço" });
      setOpen(true); 
    } else if(values.MateriaAlunos.length === 0){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário selecionar pelo menos uma matéria" });
      setOpen(true); 
    } else if(values.ServicoId ===""){
      setMensagem({ ...values, title: "Alerta!", text: "Necessário selecionar o serviço contratado" });
      setOpen(true); 
    } else {
      return true;
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(
    function () {
      if (alunoResponse.data != null) {        

        var materias = []
        alunoResponse.data.materiaAlunos.map((materia => (
          materias.push({ MateriaId: materia.materiaId })
        )))

        setValues((prevState) => ({
          Id: alunoResponse.data.id,
          Nome: alunoResponse.data.nome,
          DataNascimento: format(new Date(alunoResponse.data.dataNascimento), 'yyyy-MM-dd'),
          Serie: alunoResponse.data.serie,
          Escola: alunoResponse.data.escola,
          NomeResponsavel: alunoResponse.data.nomeResponsavel,
          CPFResponsavel: alunoResponse.data.cpfResponsavel,
          TelefoneResponsavel: alunoResponse.data.telefoneResponsavel,
          EmailResponsavel: alunoResponse.data.emailResponsavel,
          Endereco: {
            Logradouro: alunoResponse.data.endereco.logradouro,
            Numero: alunoResponse.data.endereco.numero,
            Complemento: alunoResponse.data.endereco.complemento,
            Bairro: alunoResponse.data.endereco.bairro,
            Cidade: alunoResponse.data.endereco.cidade,
            Estado: alunoResponse.data.endereco.estado,
            CEP: alunoResponse.data.endereco.cep,
          },
          ServicoId: alunoResponse.data.servicoId,
          EmpresaId: alunoResponse.data.empresaId,
          MateriaAlunos: materias,
          DiaVencimento: alunoResponse.data.diaVencimento
        }));
      }
    },
    [alunoResponse]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: e.target.value });
  };

  const handleEndereco = (e) => {
    const { name, value } = e.target;
    const Endereco = { ...values.Endereco };

    if (name === "Logradouro") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Logradouro") Endereco[key] = value;
      });
    } else if (name === "Numero") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Numero") Endereco[key] = value;
      });
    } else if (name === "Complemento") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Complemento") Endereco[key] = value;
      });
    } else if (name === "Bairro") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Bairro") Endereco[key] = value;
      });
    } else if (name === "Cidade") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Cidade") Endereco[key] = value;
      });
    } else if (name === "Estado") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "Estado") Endereco[key] = value;
      });
    } else if (name === "CEP") {
      Object.keys(Endereco).forEach((key) => {
        if (key === "CEP") Endereco[key] = value;
      });
    }

    setValues({ ...values, Endereco });
  };

  const handleMateria = (e) => {
    const { name, value, checked } = e.target;

    var MateriaAlunos = [...values.MateriaAlunos]; //matérias que tem atualmente
    const materiaIdIndex = value.search("id");
    const index = value.substring(6, materiaIdIndex - 1);
    const materiaId = value.substring(materiaIdIndex + 3);
    var newValues = "";

    //se desmarcar checkbox da matéria
    if (checked === false) {
      //se encontrar materiaId no array, faz filter e tira
      MateriaAlunos = MateriaAlunos.filter((n) => n.MateriaId != materiaId);
      setValues({ ...values, MateriaAlunos });
    }

    //se marcar checkbox da matéria
    if (checked === true) {
      //adiciona materia no array
      MateriaAlunos.push({ MateriaId: materiaId });
      setValues({ ...values, MateriaAlunos });
    }
  };

  function checkMateria(id) {
    var checkMateria = [...values.MateriaAlunos]
    var matIds = []
    checkMateria.map((mat, i) => (
      matIds.push(Object.values(mat))
    ))
    if (matIds.find(e => e == id)) {
      return true
    } else
      return false
  }

  function handleSubmit(e) {  
    document.getElementById("div-loading").style.display = "block";
 
    const response = fetch(`${ url }/api/aluno/`, {
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
        document.getElementById("div-loading").style.display = "none";
        if (response === "Aluno cadastrado") {
          setMensagem({ ...values, title: "Sucesso!", text: response })
          setOpen(true);
         } 
        else {
          setMensagem({ ...values, title: "Erro!", text: "Erro ao cadastrar aluno" })
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
            <h1>Cadastro de Aluno</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className={classes.subtitulo}>
                  <h4>Dados do Aluno</h4>
                  <Divider />
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Nome"
                  name="Nome"
                  label="Nome Aluno"
                  required={true}
                  fullWidth
                  onChange={(e) => { handleChange(onlyLetters(e)) }}
                  value={values.Nome}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="DataNascimento"
                  name="DataNascimento"
                  label="Data Nascimento"
                  type="date"
                  required={true}
                  
                  onChange={(e) => { handleChange(dateFormat(e)) }}
                  value={values.DataNascimento}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Serie"
                  name="Serie"
                  label="Serie"
                  
                  onChange={handleChange}
                  value={values.Serie}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="Escola"
                  name="Escola"
                  label="Escola"
                  
                  onChange={(e) => { handleChange(onlyLetters(e)) }}
                  value={values.Escola}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="NomeResponsavel"
                  name="NomeResponsavel"
                  label="Nome Responsável"
                  required={true}
                  fullWidth
                  onChange={(e) => { handleChange(onlyLetters(e)) }}
                  value={values.NomeResponsavel}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="CPFResponsavel"
                  name="CPFResponsavel"
                  label="CPF"
                  
                  onChange={(e) => { handleChange(cpfMask(e)) }}
                  value={values.CPFResponsavel}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="TelefoneResponsavel"
                  name="TelefoneResponsavel"
                  label="Telefone"
                  
                  onChange={(e) => { handleChange(phoneMask(e)) }}
                  value={values.TelefoneResponsavel}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>              
              <Grid item xs={12} sm={4}>
                <TextField
                  id="EmailResponsavel"
                  name="EmailResponsavel"
                  label="E-mail"
                  onChange={handleChange}
                  
                  value={values.EmailResponsavel}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.subtitulo}>
                  <h4>Endereço</h4>
                  <Divider />
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Endereco.Logradouro"
                  name="Logradouro"
                  required={true}
                  onChange={handleEndereco}
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
                  onChange={(e) => { handleEndereco(onlyNumbersMax5(e)) }}
                  value={values.Endereco.Numero}
                  fullWidth
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="Endereco.Complemento"
                  name="Complemento"
                  label="Complemento"
                  onChange={handleEndereco}
                  value={values.Endereco.Complemento}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Endereco.Cidade"
                  name="Cidade"
                  label="Cidade"
                  required={true}
                  onChange={handleEndereco}
                  value={values.Endereco.Cidade}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="Endereco.Bairro"
                  name="Bairro"
                  required={true}
                  onChange={handleEndereco}
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
                  required={true}
                  onChange={handleEndereco}
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
                  
                  onChange={(e) => { handleEndereco(cepMask(e)) } }
                  value={values.Endereco.CEP}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.subtitulo}>
                  <h4>Matérias</h4>
                  <Divider />
                </div>
              </Grid>

              <Grid item xs={12}>                
                {
                  materiasResponse.data ?
                    (
                      materiasResponse.data.map((mat, j) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={`MateriaAlunos${[]}.MateriaId`}
                              onChange={handleMateria}                              
                              value={`index:${j},id:${mat.id}`}
                              checked={checkMateria(mat.id)}
                            />
                          }
                          label={mat.nome}
                        />
                      ))) : false
                }
                
              </Grid>

              <Grid item xs={12}>
                <div className={classes.subtitulo}>
                  <h4>Serviço Contratado</h4>
                  <Divider />
                </div>
              </Grid>

              <Grid item xs={12}>
                <Select
                  id="Servico"
                  label="Servico Contratado"
                  onChange={handleChange}
                  name="ServicoId"
                  
                  value={values.ServicoId}

                >
                  {servicosResponse.data ? (

                    servicosResponse.data.map((serv) => (
                      <MenuItem value={serv.id}>
                        {serv.descricao + " - Valor: R$" + serv.valor}
                      </MenuItem>
                    ))) : false
                  }
                </Select>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="DiaVencimento"
                  name="DiaVencimento"
                  label="Dia Vencimento"                  
                  onChange={(e) => { handleChange(dayNumber(e)) }}
                  value={values.DiaVencimento}
                  type="text"
                  fullWidth 
                  inputProps={{  maxLength: 2, inputMode: 'numeric', pattern: '[0-9]*'  }}               
                  InputLabelProps={{
                    shrink: true                    
                  }}
                  
                />
              </Grid>
            </Grid>
            <div classname={classes.buttons}>
              <Button
                variant="contained"
                color="inherit"
                className={classes.button}
              >
                Limpar
              </Button>
              <Button
                variant="contained"
                color="primary"                
                onClick={handleClickOpen}
                className={classes.button}
              >
                Cadastrar
              </Button>
              <Button
                variant="contained"
                color="primary"                
                onClick={gerarContrato}
                className={classes.button}
              >
                Contrato
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
          {(mensagem.text == "Aluno cadastrado") ?     
          <Button onClick={() => { handleClose(); history.push("/alunos"); }}>Ok</Button>
           : <Button onClick={handleClose}>Ok</Button>}          
        </Dialog>        
      </main>
     <Loader/>   
    </React.Fragment>
   
  );
}

export default CadastroAluno;
