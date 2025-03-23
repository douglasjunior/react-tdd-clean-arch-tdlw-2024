import { beforeEach, describe, expect, test, vi } from "vitest";
import SignupForm from "./SignupForm";

let form: SignupForm;

beforeEach(() => {
  form = new SignupForm();
});

describe("SignupForm", () => {
  test('Deve testar o fluxo de progresso no preenchimento do formulário', () => {
    expect(form.calculateProgress()).toBe(0);
    form.updateForm('accountType', 'administrator');
    expect(form.calculateProgress()).toBe(30);
    form.updateForm('name', 'John Doe');
    expect(form.calculateProgress()).toBe(45);
    form.updateForm('role', 'Gerente');
    expect(form.calculateProgress()).toBe(60);
    form.updateForm('documentNumber', '00011122233');
    expect(form.calculateProgress()).toBe(75);
    form.updateForm('email', 'john@email.com');
    expect(form.calculateProgress()).toBe(85);
    form.updateForm('password', 'senha123');
    expect(form.calculateProgress()).toBe(95);
    form.updateForm('confirmPassword', 'senha124');
    expect(form.calculateProgress()).toBe(95);
    form.updateForm('confirmPassword', 'senha123');
    expect(form.calculateProgress()).toBe(100);
  });

  test('Deve testar o controle de passos no formulário', () => {
    expect(form.getFormState().step).toBe(1);
    form.updateForm('accountType', 'administrator');
    form.next();
    expect(form.getFormState().step).toBe(2);
    form.updateForm('name', 'John Doe');
    form.updateForm('role', 'Gerente');
    form.updateForm('documentNumber', '00011122233');
    form.next();
    expect(form.getFormState().step).toBe(3);
    form.updateForm('email', 'john@email.com');
    form.updateForm('password', 'senha123');
    form.updateForm('confirmPassword', 'senha123');
    form.previous();
    expect(form.getFormState().step).toBe(2);
    form.previous();
    expect(form.getFormState().step).toBe(1);
  });

  test('Deve testar as validação dos campos e o controle do preenchimento no formulário', () => {
    form.next();
    expect(form.getFormState().error).toBe('Selecione o tipo de conta');
    form.updateForm('accountType', 'administrator');
    form.next();
    expect(form.getFormState().error).toBe('');
    form.next();
    expect(form.getFormState().error).toBe('Preencha o seu nome');
    form.updateForm('name', 'John Doe');
    form.next();
    expect(form.getFormState().error).toBe('Preencha o seu cargo');
    form.updateForm('role', 'Gerente');
    form.next();
    expect(form.getFormState().error).toBe('Preencha o seu cpf');
    form.updateForm('documentNumber', '00011122233');
    form.next();
    expect(form.getFormState().error).toBe('');
    form.confirm();
    expect(form.getFormState().error).toBe('Preencha o seu email');
    form.updateForm('email', 'john@email.com');
    form.confirm();
    expect(form.getFormState().error).toBe('Preencha a sua senha');
    form.updateForm('password', 'senha123');
    form.confirm();
    expect(form.getFormState().error).toBe('Preencha a confirmação da senha');
    form.updateForm('confirmPassword', 'senha124');
    form.confirm();
    expect(form.getFormState().error).toBe('As senhas não conferem');
    form.updateForm('confirmPassword', 'senha123');
    form.confirm();
    expect(form.getFormState().error).toBe('');
  })

  test('Deve testar o fluxo de criação da conta integrando com o backend', () => {
    form.updateForm('accountType', 'administrator');
    form.updateForm('name', 'John Doe');
    form.updateForm('role', 'Gerente');
    form.updateForm('documentNumber', '00011122233');
    form.updateForm('email', 'john@email.com');
    form.updateForm('password', 'senha123');
    form.updateForm('confirmPassword', 'senha124');
    form.updateForm('confirmPassword', 'senha123');
    const callback = vi.fn();
    form.addEventListener('confirmed', callback);
    form.confirm();
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(new Event('confirmed'));
  });
});
