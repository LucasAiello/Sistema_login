const senha = '@iello20ollei@'

const conectar = async (senha)=>{
    if(global.conexao && global.conexao.state != 'disconect') return global.conexao 
    const mySql = require('mysql2/promise')
    const conexao = mySql.createConnection(`mysql://root:${senha}@localhost:3306/profia`)
    console.log("[ conectou ao banco... ]")
    global.conexao = conexao
    return conexao
}

const alterarPontos = async (id, pts)=>{
    const conexao = await conectar(senha)
    try{

        const res = await conexao.query(`UPDATE alunos SET pts_aluno = ${pts} WHERE id_aluno = ${id}`)
        return res
    }catch(erro){
        console.log("[ erro ao acessar o banco...]" + erro)
    }
}

const alunosDeProfessor = async (professor)=>{
    const conexao = await conectar(senha)
    try{

        const [alunos] = await conexao.query(`
            SELECT 
                a.nome_aluno,
                a.sobrenome_aluno,
                a.email_aluno,
                a.pts_aluno,
                a.id_aluno
            FROM alunos a 
            INNER JOIN professores p ON a.professor_aluno = p.id_professor 
            WHERE p.id_professor = ${professor}`)
        return alunos
    }catch(erro){
        console.log("[ erro ao acessar o banco...]" + erro)
    }

}

const usuario_valido = async (usuario, password)=>{
    const conexao = await conectar(senha)
    try{

        const [tabela_aluno] = await conexao.query(`SELECT * FROM alunos WHERE nome_usuario_aluno = "${usuario}" AND senha_aluno = "${password}"`)
    
        const [tabela_professor] = await conexao.query(`SELECT * FROM professores WHERE nome_professor = "${usuario}" AND senha_professor = "${password}"`)
        
        if(Object.values(tabela_aluno).length > 0) return {fonte: "aluno", tabela: tabela_aluno}
        else if(Object.values(tabela_professor).length > 0) return {fonte: "professor", tabela: tabela_professor}
        else return null
    }catch(erro){
        console.log("[ erro ao acessar o banco...]" + erro)
    }
}

module.exports = {
    usuario_valido,
    alunosDeProfessor,
    alterarPontos
}
