const prisma = require("../databases/prisma");
const AlunoInvalidoError = require("../errors/AlunoInvalidoError");

class AlunoService{

    async findMany(page, pageSize){
        //SELECT * FROM alunos
       const skip = (Number(page) - 1) * Number(pageSize);
        const take = Number(pageSize);

        // Busca paginada, ordenada e a contagem total simultaneamente
        const [alunos, total] = await Promise.all([
            prisma.aluno.findMany({
                skip,
                take,
                orderBy: {
                    [orderBy]: order
                }
            }),
            prisma.aluno.count()
        ]);

        return { alunos, total };
    }

    async create(aluno){
        const {nome, email} = aluno;
        if(!nome || !email){
            throw new AlunoInvalidoError();
        }
        //create = insert
        //update = update
        //delete = delete
        //findMany = select * from
        const novoAluno = await prisma.aluno.create({data:aluno});

        return novoAluno;
    }

    async findUnique(id){
        const aluno = await prisma.aluno.findUnique({
            where: { id: Number(id) }
        });

        if(!aluno){
            throw new AlunoNaoEncontradoError();
        }

        return aluno;
    }
}

module.exports = new AlunoService();