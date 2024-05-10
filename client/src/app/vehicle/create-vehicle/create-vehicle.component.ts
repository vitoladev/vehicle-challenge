import { Component } from '@angular/core';
import {
  MatDialog,
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

@Component({
  selector: 'app-create-vehicle',
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
  templateUrl: './create-vehicle.component.html',
  styleUrl: './create-vehicle.component.css',
})
export class CreateVehicleComponent {
  constructor(
    private dialogRef: MatDialogRef<CreateVehicleComponent>,
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar
  ) {}
  vehicleForm = this.formBuilder.group({
    placa: [
      '',
      [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
    ],
    chassi: [
      '',
      [Validators.required, Validators.minLength(17), Validators.maxLength(17)],
    ],
    renavam: [10000000000, Validators.required],
    modelo: ['', Validators.required],
    marca: ['', Validators.required],
    ano: [
      new Date().getFullYear(),
      [
        Validators.required,
        Validators.min(1886),
        Validators.max(new Date().getFullYear()),
      ],
    ],
  });

  onSubmit() {
    const data = this.vehicleForm.value;

    this.vehicleService.create(data).subscribe({
      next: (response) => {
        this.dialogRef.close(true);
        this.snackBar.open(
          `Veiculo ${response.placa} cadastrado com sucesso`,
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
