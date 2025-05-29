import React, { useState } from 'react';

function StudentForm({ setStudents, students }) {
  const [form, setForm] = useState({ id: '', sobrenome: '', nome: '', idade: '', curso: '', ano: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setStudents([...students, { ...form, id: students.length + 1 }]);
    setForm({ id: '', sobrenome: '', nome: '', idade: '', curso: '', ano: '' });
  };

  const handleClear = () => {
    setForm({ id: '', sobrenome: '', nome: '', idade: '', curso: '', ano: '' });
  };

  return (
    <div className="form">
      <h2>Cadastro de Aluno</h2>
      {['id', 'sobrenome', 'nome', 'idade', 'curso', 'ano'].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
        />
      ))}
      <div className="buttons">
        <button onClick={handleAdd}>ADICIONAR</button>
        <button>SALVAR</button>
        <button>EXCLUIR</button>
        <button onClick={handleClear}>LIMPAR</button>
      </div>
    </div>
  );
}

export default StudentForm;
