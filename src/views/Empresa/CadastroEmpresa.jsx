import React , {useState, useContext} from "react";
import StoreContext from "../../contexts/StoreContext";
import { Button, Grid, Paper, TextField, Select, Divider, Switch, FormLabel } from "@material-ui/core";
import useStyles from "../Styles/useStyles";
import { useFetch } from "../../hooks/useFetch";
import { MenuItem } from "@material-ui/core";

function CadastroEmpresa() {

    const initialValues = {
        //Id: "",
        TipoEmpresa: "",
        UsarDados: false,
        CNPJ_CPF: "",
        RazaoSocial: "",
        Telefone: "",
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
            CPF: "",
            Nome: "",
            Email: "",
            DataNascimento: "",
            Telefone: "",
        }  
     };  
     
     const[values, setValues] = useState(initialValues);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: e.target.value });
        console.log({name,value});
      };

      const handleEndereco = (e) => {
        const { name, value } = e.target;
        console.log({name,value});
        const Endereco = { ...values.Endereco };
        const Pessoa = {...values.Pessoa};
    
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
        } else if (name == "Telefone") {
            Object.keys(Pessoa).forEach((key) => {
            if (key === "Telefone") Pessoa[key] = value;
            });
        }
        setValues({ ...values, Endereco,Pessoa });
      };

      const handleCheckChange = (e) => {
        const {name, checked} = e.target;
        setValues({...values, [name]: e.target.checked});
        console.log(
          "handleCheckChange " +
            ">>name: " +
            e.target.name +
            " >>value: " +
            e.target.value +
            " >>checked: " +
            e.target.checked
        );
        console.log(values);
      };
    
      function handleSubmit(e) {
        alert("Sucess: \n\n" + JSON.stringify(values, null, 4));
        console.log(values);
        e.preventDefault();
    
        const response = fetch("https://localhost:44389/api/empresa/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            if (
              response == "Matéria atualizada" ||
              response == "Matéria não atualizada"
            ) {
              console.log("Deu bom");
              console.log(response);
            } else {
              console.log("Deu ruim");
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
              <form onSubmit={handleSubmit}>
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
                             label= {
                                 (values.TipoEmpresa == "1") ? "CPF" : 
                                 (values.TipoEmpresa == "2") ? "CNPJ" : "CNPJ OU CPF"}
                             fullWidth
                             onChange={handleChange}
                             value={values.CNPJ_CPF}
                          />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                          <TextField 
                             id="Telefone"
                             name="Telefone"
                             label="Telefone"
                             fullWidth
                             onChange={handleChange}
                             value={values.Telefone}
                          />
                      </Grid>
                  </Grid>

                  <Grid container spacing={3}>                
                      <Grid item xs={12} sm={4}>
                        <TextField
                  id="Endereco.Logradouro"
                  name="Logradouro"
                  onChange={handleEndereco}
                  value={values.Endereco.Logradouro}
                  label="Endereço"
                  fullWidth
                        />
              </Grid>
                      <Grid item xs={12} sm={1}>
                <TextField
                  id="Endereco.Numero"
                  name="Numero"
                  label="Nº"
                  onChange={handleEndereco}
                  value={values.Endereco.Numero}
                  fullWidth
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
                  onChange={handleEndereco}
                  value={values.Endereco.Cidade}
                  fullWidth
                />
              </Grid>
                     <Grid item xs={12} sm={2}>
                <TextField
                  id="Endereco.Bairro"
                  name="Bairro"
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
                  onChange={handleEndereco}
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
                  onChange={handleCheckChange}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  fullWidth
                />
              </Grid>

              </Grid>
             
              <Grid item xs={12} sm={4}>
                          <TextField 
                             id="Pessoa.Nome"
                             name="Nome"
                             label="Nome"
                             fullWidth
                             onChange={handleEndereco}
                             value={(values.UsarDados ? values.RazaoSocial : values.Pessoa.Nome)}
                          />
            </Grid>                      
                      <Grid item xs={12} sm={4}>
                          <TextField 
                             id="Pessoa.CPF"
                             name="CPF"                            
                             label="CPF"
                             fullWidth
                             onChange={handleEndereco}
                             value={(values.UsarDados ? values.CNPJ_CPF : values.Pessoa.CPF)}
                            
                          />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                      <TextField
                  id="Pessoa.DataNascimento"
                  name="Pessoa.DataNascimento"
                  label="Data Nascimento"
                  type="date"
                  onChange={handleChange}
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
                             name="Pessoa.Email"
                             label="E-mail"
                             fullWidth
                             onChange={handleChange}
                             value={values.Pessoa.Email}
                          />
                      </Grid>

                      <Grid item xs={12} sm={2}>
                          <TextField 
                             id="Pessoa.Telefone"
                             name="Telefone"
                             label="Telefone"
                             fullWidth
                             onChange={handleEndereco}
                             value={(values.UsarDados ? values.Telefone : values.Pessoa.Telefone)}
                             InputLabelProps={{
                               shrink: true,
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
                    type="submit"
                    className={classes.button}
                  >
                    Cadastrar
                  </Button>
                </div>
              </form>
            </Paper>
          </main>
        </React.Fragment>
      );

}

export default CadastroEmpresa;