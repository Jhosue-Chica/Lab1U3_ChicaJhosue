// register-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterFormComponent, // Importamos el componente en lugar de declararlo
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // Pruebas de creación del componente
  describe('Creación del componente', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render title', () => {
      const title = fixture.debugElement.query(By.css('h2'));
      expect(title.nativeElement.textContent).toContain('Formulario de Registro');
    });
  });

  // Pruebas de elementos del DOM
  describe('Elementos del DOM', () => {
    it('should render all form inputs', () => {
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      expect(inputs.length).toBe(3);
    });

    it('should have correct input types', () => {
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      expect(inputs[0].nativeElement.type).toBe('text');
      expect(inputs[1].nativeElement.type).toBe('email');
      expect(inputs[2].nativeElement.type).toBe('number');
    });

    it('should have submit button disabled initially', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.disabled).toBeTruthy();
    });
  });

  // Pruebas de validación de formulario
  describe('Form Validation', () => {
    it('should validate name field as required', () => {
      const nameControl = component.registerForm.get('name');
      expect(nameControl?.valid).toBeFalsy();
      expect(nameControl?.errors?.['required']).toBeTruthy();
    });

    it('should validate email format', () => {
      const emailControl = component.registerForm.get('email');
      emailControl?.setValue('invalid-email');
      expect(emailControl?.errors?.['email']).toBeTruthy();

      emailControl?.setValue('valid@email.com');
      expect(emailControl?.errors).toBeNull();
    });

    it('should validate age minimum', () => {
      const ageControl = component.registerForm.get('age');
      ageControl?.setValue(16);
      expect(ageControl?.errors?.['min']).toBeTruthy();

      ageControl?.setValue(20);
      expect(ageControl?.errors).toBeNull();
    });
  });

  // Pruebas de interacción con el formulario
  describe('Form Interaction', () => {
    it('should show error message when name is touched and invalid', () => {
      const nameInput = fixture.debugElement.query(By.css('#name'));
      nameInput.nativeElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(By.css('.error-message'));
      expect(errorMessage.nativeElement.textContent).toContain('Nombre es requerido');
    });

    it('should enable submit button when form is valid', () => {
      component.registerForm.setValue({
        name: 'John Doe',
        email: 'john@example.com',
        age: 25
      });
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.disabled).toBeFalsy();
    });

    it('should call onSubmit when form is submitted', () => {
      spyOn(component, 'onSubmit');
      const form = fixture.debugElement.query(By.css('form'));

      component.registerForm.setValue({
        name: 'John Doe',
        email: 'john@example.com',
        age: 25
      });
      fixture.detectChanges();

      form.triggerEventHandler('submit', null);
      expect(component.onSubmit).toHaveBeenCalled();
    });
  });

  // Pruebas de cambios en tiempo real
  describe('Real-time Changes', () => {
    it('should update form control value when input changes', () => {
      const nameInput = fixture.debugElement.query(By.css('#name'));
      nameInput.nativeElement.value = 'John Doe';
      nameInput.nativeElement.dispatchEvent(new Event('input'));

      expect(component.nameControl?.value).toBe('John Doe');
    });

    it('should add is-invalid class when control is invalid and touched', () => {
      const emailInput = fixture.debugElement.query(By.css('#email'));
      emailInput.nativeElement.value = 'invalid-email';
      emailInput.nativeElement.dispatchEvent(new Event('input'));
      emailInput.nativeElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(emailInput.nativeElement.classList.contains('is-invalid')).toBeTruthy();
    });
  });

  // Pruebas de estado inicial
  describe('Initial State', () => {
    it('should initialize with empty form', () => {
      expect(component.registerForm.value).toEqual({
        name: '',
        email: '',
        age: ''
      });
    });

    it('should have all controls marked as untouched', () => {
      expect(component.nameControl?.untouched).toBeTruthy();
      expect(component.emailControl?.untouched).toBeTruthy();
      expect(component.ageControl?.untouched).toBeTruthy();
    });
  });
});
