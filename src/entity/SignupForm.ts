type FormState = {
  accountType: string;
  name: string;
  role: string;
  documentNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  step: number;
  error: string;
  success: string;
}

export default class SignupForm extends EventTarget {
  private state: FormState = {
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
  }

  calculateProgress = () => {
    let progress = 0;
    if (this.state.accountType) progress += 30;
    if (this.state.name) progress += 15;
    if (this.state.role) progress += 15;
    if (this.state.documentNumber) progress += 15;
    if (this.state.email) progress += 10;
    if (this.state.password) progress += 10;
    if (this.state.password && this.state.password === this.state.confirmPassword) progress += 5;
    return progress;
  }

  updateForm = <Key extends keyof FormState, Value extends FormState[Key]>(name: Key, value: Value) => {
    this.state = {
      ...this.state,
      [name]: value,
    }
  };

  getFormState = () => this.state;

  private validate = () => {
    this.updateForm('error', '');
    this.updateForm('success', '');

    if (this.state.step === 1 && !this.state.accountType) {
      this.updateForm('error', 'Selecione o tipo de conta');
      return false;
    }

    if (this.state.step === 2) {
      if (!this.state.name) {
        this.updateForm('error', 'Preencha o seu nome');
        return false;
      }
      if (!this.state.role) {
        this.updateForm('error', 'Preencha o seu cargo');
        return false;
      }
      if (!this.state.documentNumber) {
        this.updateForm('error', 'Preencha o seu cpf');
        return false;
      }
    }

    if (this.state.step === 3) {
      if (!this.state.email) {
        this.updateForm('error', 'Preencha o seu email');
        return false;
      }
      if (!this.state.password) {
        this.updateForm('error', 'Preencha a sua senha');
        return false;
      }
      if (!this.state.confirmPassword) {
        this.updateForm('error', 'Preencha a confirmação da senha');
        return false;
      }
      if (this.state.password !== this.state.confirmPassword) {
        this.updateForm('error', 'As senhas não conferem');
        return false;
      }
    }

    return true;
  };

  next = () => {
    if (!this.validate()) return;
    this.updateForm('step', this.state.step + 1);
  };

  previous = () => {
    this.updateForm('step', this.state.step - 1);
  };

  confirm = () => {
    if (!this.validate()) return;

    this.dispatchEvent(new Event('confirmed'));
  }
}
