import { ChangeEventHandler, MouseEventHandler, useCallback, useRef, useState } from "react";
import AccountGateway from "./gateway/AccountGateway";
import { useInject } from "./registry/RegistryProvider";
import SignupForm from "./entity/SignupForm";

function App() {
  const accountGateway: AccountGateway = useInject('accountGateway');

  const form = useRef(new SignupForm());
  const [formState, setFormState] = useState(form.current.getFormState());

  const updateForm: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    form.current.updateForm(event.target.name as any, event.target.value);
    setFormState(form.current.getFormState());
  }, []);

  const next: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    form.current.next()
    setFormState(form.current.getFormState());
  }, []);

  const previous: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    form.current.previous();
    setFormState(form.current.getFormState());
  }, []);

  const confirm: MouseEventHandler<HTMLButtonElement> = useCallback(async () => {
    form.current.addEventListener('confirmed', async () => {
      const input = {
        accountType: form.current.getFormState().accountType,
        name: form.current.getFormState().name,
        role: form.current.getFormState().role,
        documentNumber: form.current.getFormState().documentNumber,
        email: form.current.getFormState().email,
        password: form.current.getFormState().password,
      };
      const id = await accountGateway.signup(input);
      form.current.updateForm('success', 'Conta criada com sucesso: #' + id);
      setFormState(form.current.getFormState());
    }, { once: true })

    form.current.confirm();
    setFormState(form.current.getFormState());
  }, [accountGateway]);

  return (
    <div>
      <div>
        <span>Passo: </span>
        <span data-testid="span-step">{formState.step}</span>
      </div>
      <div>
        <span>Progresso: </span>
        <span data-testid="span-progress">{form.current.calculateProgress()}%</span>
      </div>
      {formState.error ? (
        <div>
          <span>Erro: </span>
          <span data-testid="span-error">{formState.error}</span>
        </div>
      ) : null}
      {formState.success ? (
        <div>
          <span>Sucesso: </span>
          <span data-testid="span-success">{formState.success}</span>
        </div>
      ) : null}
      {/* Step 1 */}
      {formState.step === 1 ? (
        <div>
          <div>
            <input type="radio" id="administrator" name="accountType" value="administrator" onChange={updateForm} checked={formState.accountType == 'administrator'} />
            <label htmlFor="administrator">Administrador</label>
            <br />
            <input type="radio" id="operator" name="accountType" value="operator" onChange={updateForm} checked={formState.accountType == 'operator'} />
            <label htmlFor="operator">Operador</label>
            <br />
            <input type="radio" id="editor" name="accountType" value="editor" onChange={updateForm} checked={formState.accountType == 'editor'} />
            <label htmlFor="editor">Editor</label>
          </div>
        </div>
      ) : null}
      {/* Step 2 */}
      {formState.step === 2 ? (
        <div>
          <div>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" placeholder="Informe seu nome" onChange={updateForm} value={formState.name} />
          </div>
          <div>
            <label htmlFor="role">Cargo:</label>
            <input type="text" id="role" name="role" placeholder="Informe seu cargo" onChange={updateForm} value={formState.role} />
          </div>
          <div>
            <label htmlFor="documentNumber">CPF:</label>
            <input type="text" id="documentNumber" name="documentNumber" placeholder="Informe seu CPF" onChange={updateForm} value={formState.documentNumber} />
          </div>
        </div>
      ) : null}
      {/* Step 3 */}
      {formState.step === 3 ? (
        <div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" placeholder="Informe seu email" onChange={updateForm} value={formState.email} />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input type="text" id="password" name="password" placeholder="Informe sua senha" onChange={updateForm} value={formState.password} />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirmação de senha:</label>
            <input type="text" id="confirmPassword" name="confirmPassword" placeholder="Repita sua senha" onChange={updateForm} value={formState.confirmPassword} />
          </div>
        </div>
      ) : null}
      <div>
        {formState.step > 1 ? (
          <button data-testid="button-previous" onClick={previous}>
            Anterior
          </button>
        ) : null}
        {formState.step < 3 ? (
          <button data-testid="button-next" onClick={next}>
            Próximo
          </button>
        ) : null}
        {formState.step === 3 ? (
          <button data-testid="button-confirm" onClick={confirm}>
            Confirmar
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default App
