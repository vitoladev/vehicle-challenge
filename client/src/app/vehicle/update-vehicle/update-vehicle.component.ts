import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { VehicleService } from '../vehicle.service';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../vehicle.interface';

@Component({
  selector: 'app-update-vehicle',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './update-vehicle.component.html',
  styleUrl: './update-vehicle.component.css',
})
export class UpdateVehicleComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Vehicle,
    private dialogRef: MatDialogRef<UpdateVehicleComponent>,
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar
  ) {}
  vehicleForm = this.formBuilder.group({
    placa: [
      this.data.placa,
      [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
    ],
    chassi: [
      this.data.chassi,
      [Validators.required, Validators.minLength(17), Validators.maxLength(17)],
    ],
    renavam: [this.data.renavam, Validators.required],
    modelo: [this.data.modelo, Validators.required],
    marca: [this.data.marca, Validators.required],
    ano: [
      this.data.ano,
      [
        Validators.required,
        Validators.min(1886),
        Validators.max(new Date().getFullYear()),
      ],
    ],
  });

  onSubmit() {
    const input = this.vehicleForm.value as Partial<Vehicle>;

    this.vehicleService.update(this.data.id, input).subscribe({
      next: (response) => {
        this.dialogRef.close(true);
        this.snackBar.open(
          `Veiculo ${response.placa} atualizado com sucesso`,
          'Fechar',
          {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          }
        );
      },
      error: (error) => {
        if (error.error.code === 'PLACA_ALREADY_EXISTS') {
          this.vehicleForm.controls.placa.setErrors({ placaExists: true });
        }

        if (error.error.code === 'CHASSI_ALREADY_EXISTS') {
          this.vehicleForm.controls.chassi.setErrors({ chassiExists: true });
        }

        if (error.error.code === 'RENAVAM_ALREADY_EXISTS') {
          this.vehicleForm.controls.renavam.setErrors({ renavamExists: true });
        }

        this.snackBar.open(error.error.message, 'Fechar', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 1000,
        });

        if (
          ![
            'PLACA_ALREADY_EXISTS',
            'CHASSI_ALREADY_EXISTS',
            'RENAVAM_ALREADY_EXISTS',
          ].includes(error.error.code)
        ) {
          this.dialogRef.close(false);
        }
      },
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
