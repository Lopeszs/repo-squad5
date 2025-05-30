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

  // TODO: Implement handleSave and handleDelete
  // const handleSave = () => { ... };
  // const handleDelete = () => { ... };

  return (
    // student-form-container styles are applied by App.css
    // No need for an additional className="form" unless more specific styling is required here
    <div>
      <h2>Cadastro de Aluno</h2>
      <div>
        <label htmlFor="id">ID do Aluno:</label>
        <input
          type="text" // Or number, though ID can be alphanumeric
          id="id"
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="ID do Aluno"
        />
      </div>
      <div>
        <label htmlFor="sobrenome">Sobrenome:</label>
        <input
          type="text"
          id="sobrenome"
          name="sobrenome"
          value={form.sobrenome}
          onChange={handleChange}
          placeholder="Sobrenome"
        />
      </div>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
        />
      </div>
      <div>
        <label htmlFor="idade">Idade:</label>
        <input
          type="number"
          id="idade"
          name="idade"
          value={form.idade}
          onChange={handleChange}
          placeholder="Idade"
        />
      </div>
      <div>
        <label htmlFor="curso">Curso:</label>
        <input
          type="text"
          id="curso"
          name="curso"
          value={form.curso}
          onChange={handleChange}
          placeholder="Curso"
        />
      </div>
      <div>
        <label htmlFor="ano">Ano:</label>
        <input
          type="text" // Or number, depending on format e.g., "3º"
          id="ano"
          name="ano"
          value={form.ano}
          onChange={handleChange}
          placeholder="Ano"
        />
      </div>
      <div className="form-buttons">
        <button onClick={handleAdd} className="btn-add">ADICIONAR</button>
        <button className="btn-save">SALVAR</button> {/* onClick={handleSave} */}
        <button className="btn-delete">EXCLUIR</button> {/* onClick={handleDelete} */}
        <button onClick={handleClear} className="btn-clear">LIMPAR</button>
      </div>
    </div>
  );
}

export default StudentForm;
