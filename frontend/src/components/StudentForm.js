import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FormContainer,
  FormTitle,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  ButtonContainer,
  Button
} from './StudentForm.styles';

// Zod Schema for validation
const studentSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"), // Assuming ID is a string, can be changed
  sobrenome: z.string().min(1, "Sobrenome é obrigatório"),
  nome: z.string().min(1, "Nome é obrigatório"),
  idade: z.coerce.number().min(1, "Idade é obrigatória").positive("Idade deve ser positiva"),
  curso: z.string().min(1, "Curso é obrigatório"),
  ano: z.string().min(1, "Ano é obrigatório"), // e.g., "3º"
});

function StudentForm({ setStudents, students, selectedStudent, setSelectedStudent }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: selectedStudent || { id: '', sobrenome: '', nome: '', idade: '', curso: '', ano: '' }
  });

  React.useEffect(() => {
    if (selectedStudent) {
      reset(selectedStudent);
    } else {
      reset({ id: '', sobrenome: '', nome: '', idade: '', curso: '', ano: '' });
    }
  }, [selectedStudent, reset]);

  const onSubmit = (data) => {
    if (selectedStudent) {
      // Update existing student
      setStudents(students.map(s => s.id === selectedStudent.id ? { ...s, ...data } : s));
      setSelectedStudent(null); // Clear selection
    } else {
      // Add new student - ID generation might need refinement
      const newId = students.length > 0 ? Math.max(...students.map(s => parseInt(s.id) || 0)) + 1 : 1;
      setStudents([...students, { ...data, id: String(newId) }]);
    }
    reset({ id: '', sobrenome: '', nome: '', idade: '', curso: '', ano: '' });
  };
  
  const handleClear = () => {
    reset({ id: '', sobrenome: '', nome: '', idade: '', curso: '', ano: '' });
    setSelectedStudent(null); // Clear selection if any
  };

  // TODO: Implement handleDelete
  const handleDelete = () => {
    if (selectedStudent) {
      setStudents(students.filter(s => s.id !== selectedStudent.id));
      setSelectedStudent(null);
      reset({ id: '', sobrenome: '', nome: '', idade: '', curso: '', ano: '' });
    }
  };


  return (
    <FormContainer>
      <FormTitle>Cadastro de Aluno</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="id">ID do Aluno:</Label>
          <Input
            type="text"
            id="id"
            {...register("id")}
            placeholder="ID do Aluno"
            disabled={!!selectedStudent} // Disable ID field when editing
          />
          {errors.id && <ErrorMessage>{errors.id.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="sobrenome">Sobrenome:</Label>
          <Input
            type="text"
            id="sobrenome"
            {...register("sobrenome")}
            placeholder="Sobrenome"
          />
          {errors.sobrenome && <ErrorMessage>{errors.sobrenome.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="nome">Nome:</Label>
          <Input
            type="text"
            id="nome"
            {...register("nome")}
            placeholder="Nome"
          />
          {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="idade">Idade:</Label>
          <Input
            type="number"
            id="idade"
            {...register("idade")}
            placeholder="Idade"
          />
          {errors.idade && <ErrorMessage>{errors.idade.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="curso">Curso:</Label>
          <Input
            type="text"
            id="curso"
            {...register("curso")}
            placeholder="Curso"
          />
          {errors.curso && <ErrorMessage>{errors.curso.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="ano">Ano:</Label>
          <Input
            type="text"
            id="ano"
            {...register("ano")}
            placeholder="Ano"
          />
          {errors.ano && <ErrorMessage>{errors.ano.message}</ErrorMessage>}
        </FormGroup>
        <ButtonContainer>
          <Button type="submit" className={selectedStudent ? "btn-save" : "btn-add"}>
            {selectedStudent ? "SALVAR" : "ADICIONAR"}
          </Button>
          {selectedStudent && (
             <Button type="button" onClick={handleDelete} className="btn-delete">EXCLUIR</Button>
          )}
          <Button type="button" onClick={handleClear} className="btn-clear">LIMPAR</Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
}

export default StudentForm;
