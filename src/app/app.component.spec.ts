import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        AppComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Lab1U3_ChicaJhosue' title`, () => {
    expect(component.title).toEqual('Lab1U3_ChicaJhosue');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Lab1U3_ChicaJhosue');
  });

  it('should initialize with empty username and password', () => {
    expect(component.username).toEqual('');
    expect(component.password).toEqual('');
  });

  it('should have form inputs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const usernameInput = compiled.querySelector('input[name="username"]');
    const passwordInput = compiled.querySelector('input[name="password"]');

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  // Nuevas pruebas para aumentar cobertura

  it('should show error messages when inputs are touched and empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Obtener los inputs
    const usernameInput = compiled.querySelector('input[name="username"]') as HTMLInputElement;
    const passwordInput = compiled.querySelector('input[name="password"]') as HTMLInputElement;

    // Simular que el usuario tocó los inputs sin escribir nada
    usernameInput.dispatchEvent(new Event('blur'));
    passwordInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    // Verificar que aparecen los mensajes de error
    const errorMessages = compiled.querySelectorAll('.error-message');
    expect(errorMessages.length).toBe(2);
    expect(errorMessages[0].textContent).toContain('Usuario es requerido');
    expect(errorMessages[1].textContent).toContain('Contraseña es requerida');
  });

  it('should not show error messages when inputs are valid', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Simular entrada de datos válidos
    component.username = 'testuser';
    component.password = 'testpass';
    fixture.detectChanges();

    // Verificar que no hay mensajes de error
    const errorMessages = compiled.querySelectorAll('.error-message');
    expect(errorMessages.length).toBe(0);
  });

  it('should enable submit button when form is valid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;

    // Inicialmente el botón debería estar deshabilitado
    expect(submitButton.disabled).toBeTruthy();

    // Simular entrada de datos válidos
    component.username = 'testuser';
    component.password = 'testpass';
    fixture.detectChanges();

    // El botón debería estar habilitado
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should call onSubmit method when form is submitted', () => {
    // Espiar el método onSubmit
    const onSubmitSpy = spyOn(component, 'onSubmit');

    // Simular datos válidos
    component.username = 'testuser';
    component.password = 'testpass';
    fixture.detectChanges();

    // Simular envío del formulario
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    // Verificar que onSubmit fue llamado
    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('should log credentials when form is submitted with valid data', () => {
    // Espiar console.log
    const consoleSpy = spyOn(console, 'log');

    // Simular datos válidos
    component.username = 'testuser';
    component.password = 'testpass';

    // Llamar a onSubmit
    component.onSubmit();

    // Verificar que se llamó a console.log con los datos correctos
    expect(consoleSpy).toHaveBeenCalledWith('Login attempted');
    expect(consoleSpy).toHaveBeenCalledWith('Username:', 'testuser');
    expect(consoleSpy).toHaveBeenCalledWith('Password:', 'testpass');
  });

  it('should not log credentials when form is submitted with invalid data', () => {
    // Espiar console.log
    const consoleSpy = spyOn(console, 'log');

    // Mantener datos vacíos (inválidos)
    component.username = '';
    component.password = '';

    // Llamar a onSubmit
    component.onSubmit();

    // Verificar que no se llamó a console.log
    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
