import { ChangeEventHandler, MouseEventHandler, useCallback, useState } from "react";
import axios from 'axios';

function App() {
  const [form, setForm] = useState({
    accountType: '',
    name: '',
    role: '',
    documentNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    step: 1,
    error: '',
    success: '',
  });

  const calculateProgress = () => {
    let progress = 0;
    if (form.accountType) progress += 30;
    if (form.name) progress += 15;
    if (form.role) progress += 15;
    if (form.documentNumber) progress += 15;
    if (form.email) progress += 10;
    if (form.password) progress += 10;
    if (form.password && form.password === form.confirmPassword) progress += 5;
    return progress;
  }

  const updateForm: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const validate = useCallback(() => {
    if (form.step === 1 && !form.accountType) {
      setForm((prevForm) => ({
        ...prevForm,
        error: 'Selecione o tipo de conta',
      }));
      return false;
    }

    if (form.step === 2) {
      if (!form.name) {
        setForm((prevForm) => ({
          ...prevForm,
          error: 'Preencha o seu nome',
        }));
        return false;
      }
      if (!form.role) {
        setForm((prevForm) => ({
          ...prevForm,
          error: 'Preencha o seu cargo',
        }));
        return false;
      }
      if (!form.documentNumber) {
        setForm((prevForm) => ({
          ...prevForm,
          error: 'Preencha o seu cpf',
        }));
        return false;
      }
    }

    if (form.step === 3) {
      if (!form.email) {
        setForm((prevForm) => ({
          ...prevForm,
          error: 'Preencha o seu email',
        }));
        return false;
      }
      if (!form.password) {
        setForm((prevForm) => ({
          ...prevForm,
          error: 'Preencha a sua senha',
        }));
        return false;
      }
      if (!form.confirmPassword) {
        setForm((prevForm) => ({
          ...prevForm,
          error: 'Preencha a confirmação da senha',
        }));
        return false;
      }
      if (form.password !== form.confirmPassword) {
        setForm((prevForm) => ({
          ...prevForm,
          error: 'As senhas não conferem',
        }));
        return false;
      }
    }

    setForm((prevForm) => ({
      ...prevForm,
      error: '',
    }));
    return true;
  }, [form.accountType, form.confirmPassword, form.documentNumber, form.email, form.name, form.password, form.role, form.step]);


  const next: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (!validate()) return;

    setForm((prevForm) => ({
      ...prevForm,
      step: prevForm.step + 1,
    }));
  }, [validate]);

  const previous: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setForm((prevForm) => ({
      ...prevForm,
      step: prevForm.step - 1,
    }));
  }, []);

  const confirm: MouseEventHandler<HTMLButtonElement> = useCallback(async () => {
    if (!validate()) return;
    const input = {
      accountType: form.accountType,
      name: form.name,
      role: form.role,
      documentNumber: form.documentNumber,
      email: form.email,
      password: form.password,
    };
    const response = await axios.post('/signup', input);
    if (response.status !== 201) return;
    setForm((prevForm) => ({
      ...prevForm,
      success: 'Conta criada com sucesso',
    }));
  }, [form.accountType, form.documentNumber, form.email, form.name, form.password, form.role, validate]);

  const fill = useCallback(() => {
    setForm({
      accountType: 'administrator',
      name: 'John Doe',
      role: 'Gerente',
      documentNumber: '00011122233',
      email: `john@email.com`,
      password: 'senha123',
      confirmPassword: 'senha123',
      step: 3,
      error: '',
      success: '',
    })
  }, []);

  return (
    <div>
      <div>
        <span onClick={fill}>Passo: </span>
        <span data-testid="span-step">{form.step}</span>
      </div>
      <div>
        <span>Progresso: </span>
        <span data-testid="span-progress">{calculateProgress()}%</span>
      </div>
      {form.error ? (
        <div>
          <span>Erro: </span>
          <span data-testid="span-error">{form.error}</span>
        </div>
      ) : null}
      {form.success ? (
        <div>
          <span>Sucesso: </span>
          <span data-testid="span-success">{form.success}</span>
        </div>
      ) : null}
      {/* Step 1 */}
      {form.step === 1 ? (
        <div>
          <div>
            <input type="radio" id="administrator" name="accountType" value="administrator" onChange={updateForm} checked={form.accountType == 'administrator'} />
            <label htmlFor="administrator">Administrador</label>
            <br />
            <input type="radio" id="operator" name="accountType" value="operator" onChange={updateForm} checked={form.accountType == 'operator'} />
            <label htmlFor="operator">Operador</label>
            <br />
            <input type="radio" id="editor" name="accountType" value="editor" onChange={updateForm} checked={form.accountType == 'editor'} />
            <label htmlFor="editor">Editor</label>
          </div>
        </div>
      ) : null}
      {/* Step 2 */}
      {form.step === 2 ? (
        <div>
          <div>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" placeholder="Informe seu nome" onChange={updateForm} value={form.name} />
          </div>
          <div>
            <label htmlFor="role">Cargo:</label>
            <input type="text" id="role" name="role" placeholder="Informe seu cargo" onChange={updateForm} value={form.role} />
          </div>
          <div>
            <label htmlFor="documentNumber">CPF:</label>
            <input type="text" id="documentNumber" name="documentNumber" placeholder="Informe seu CPF" onChange={updateForm} value={form.documentNumber} />
          </div>
        </div>
      ) : null}
      {/* Step 3 */}
      {form.step === 3 ? (
        <div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" placeholder="Informe seu email" onChange={updateForm} value={form.email} />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input type="text" id="password" name="password" placeholder="Informe sua senha" onChange={updateForm} value={form.password} />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirmação de senha:</label>
            <input type="text" id="confirmPassword" name="confirmPassword" placeholder="Repita sua senha" onChange={updateForm} value={form.confirmPassword} />
          </div>
        </div>
      ) : null}
      <div>
        {form.step > 1 ? (
          <button data-testid="button-previous" onClick={previous}>
            Anterior
          </button>
        ) : null}
        {form.step < 3 ? (
          <button data-testid="button-next" onClick={next}>
            Próximo
          </button>
        ) : null}
        {form.step === 3 ? (
          <button data-testid="button-confirm" onClick={confirm}>
            Confirmar
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default App
