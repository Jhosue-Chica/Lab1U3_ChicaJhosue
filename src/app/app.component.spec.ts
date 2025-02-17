import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        CommonModule,
        FormsModule
      ]
    }).compileComponents();

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

  it('should show error messages when inputs are touched and empty', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Obtener los inputs y el formulario
    const usernameInput = fixture.debugElement.query(By.css('input[name="username"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));

    // Simular que el usuario tocó los inputs y los dejó vacíos
    usernameInput.triggerEventHandler('focus', null);
    usernameInput.triggerEventHandler('blur', null);
    passwordInput.triggerEventHandler('focus', null);
    passwordInput.triggerEventHandler('blur', null);

    fixture.detectChanges();
    tick();

    // Verificar que aparecen los mensajes de error
    const errorMessages = compiled.querySelectorAll('.error-message');
    expect(errorMessages.length).toBe(2);
  }));

  it('should not show error messages when inputs are valid', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Establecer valores válidos
    component.username = 'testuser';
    component.password = 'testpass';

    fixture.detectChanges();
    tick();

    // Verificar que no hay mensajes de error
    const errorMessages = compiled.querySelectorAll('.error-message');
    expect(errorMessages.length).toBe(0);
  }));

  it('should enable submit button when form is valid', fakeAsync(() => {
    // Establecer valores válidos
    component.username = 'testuser';
    component.password = 'testpass';

    fixture.detectChanges();
    tick();

    // Forzar detección de cambios en el formulario
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('input', null);

    fixture.detectChanges();
    tick();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.properties['disabled']).toBeFalse();
  }));

  it('should call onSubmit method when form is submitted', fakeAsync(() => {
    spyOn(component, 'onSubmit');

    // Establecer valores válidos
    component.username = 'testuser';
    component.password = 'testpass';

    fixture.detectChanges();
    tick();

    // Simular el envío del formulario
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    fixture.detectChanges();
    tick();

    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('should log credentials when form is submitted with valid data', () => {
    const consoleSpy = spyOn(console, 'log');

    component.username = 'testuser';
    component.password = 'testpass';
    component.onSubmit();

    expect(consoleSpy).toHaveBeenCalledWith('Login attempted');
    expect(consoleSpy).toHaveBeenCalledWith('Username:', 'testuser');
    expect(consoleSpy).toHaveBeenCalledWith('Password:', 'testpass');
  });

  it('should not log credentials when form is submitted with invalid data', () => {
    const consoleSpy = spyOn(console, 'log');

    component.username = '';
    component.password = '';
    component.onSubmit();

    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
