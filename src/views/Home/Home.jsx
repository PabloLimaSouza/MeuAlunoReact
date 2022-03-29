import React from "react";
import "./Home.css";

const Home = () => {
    return (
        <div>
            
            <h1>Notas de publicação - Versão atual: xxxxxx</h1>     
            <br/>
                <h2>Itens publicados: xxxxxx</h2>                     
            <ul>
                <li>Bloquear botão login quando ainda não houve retorno do login</li>
                <li>Ícone de Loading quando está aguardando login</li> 
                <li>Mensagem de erro quando</li>                  
            </ul>

            <br/>
                <h2>Itens publicados: v22022022</h2>                     
            <ul>
                <li>Menu contratos com listagem de cláusulas padrões</li>                
            </ul>
            
            <br/>
                <h2>Itens publicados: v17022022</h2>           
            <ul>
                <li>Erro ao cadastrar ou alterar matética</li>
                <li>Exibir menu de acordo com tipo de usuário</li>
                <li>Listar somente empresas que usuário tem acesso</li>
            </ul>
            <br/>
            <h2>Itens em andamento:</h2>
            <ul>
                <li>Contratos - editar cláusula na empresa específica</li>
                <li>Contratos - botão gerar contrato na tela do aluno</li>
                <li>Boletim Aluno</li>
                <li>Agenda na página inicial</li>
                <li>Linha do tempo financeiro, página inicial</li>     
                <li>Integração PagSeguro</li>               
                <li>Evolução do Aluno</li>
            </ul>
        </div>
    )
}

export default Home;