import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * Formulario para crear citas con validaciones (Actividad 2).
 *
 * Validaciones solicitadas:
 * - frase: obligatoria y mínimo 5 caracteres
 * - autor: obligatorio y mínimo 2 caracteres
 *
 * Comunicación:
 * - @Output create: emite la cita validada al padre (ManageQuotesPage)
 */
@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './quote-form.component.html',
})
export class QuoteFormComponent {
  /** Evento para enviar datos validados al padre */
  @Output() create = new EventEmitter<{ frase: string; autor: string }>();

  /**
   * FormGroup con validadores.
   * Reactive Forms facilita mantener validaciones en TS y mostrar errores en la vista.
   */
  form = this.fb.group({
    // required = obligatorio, minLength = largo mínimo
    frase: ['', [Validators.required, Validators.minLength(5)]],
    autor: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(private fb: FormBuilder) {}

  /**
   * Se ejecuta al presionar "Agregar".
   * - Si el formulario es inválido: marca todo como touched para mostrar errores.
   * - Si es válido: emite el objeto al padre y limpia el formulario.
   */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const frase = this.form.value.frase!.trim();
    const autor = this.form.value.autor!.trim();

    this.create.emit({ frase, autor });
    this.form.reset();
  }

  /** Getters para simplificar el HTML */
  get fraseCtrl() {
    return this.form.get('frase');
  }
  get autorCtrl() {
    return this.form.get('autor');
  }
}
