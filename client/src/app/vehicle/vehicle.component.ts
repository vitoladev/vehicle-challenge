import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Component, Inject } from '@angular/core';
import { Vehicle } from './vehicle.interface';
import { VehicleService } from './vehicle.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { CreateVehicleComponent } from './create-vehicle/create-vehicle.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css',
})
export class VehicleComponent {
  displayedColumns = [
    'id',
    'placa',
    'chassi',
    'renavam',
    'modelo',
    'marca',
    'ano',
    'actions',
  ];
  dataSource: Vehicle[] = [];

  constructor(
    private vehicleService: VehicleService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateVehicleComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
      if (result) {
        this.loadData();
      }
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.vehicleService.findAll().subscribe((data) => {
      this.dataSource = data;
    });
  }

  createVehicle(element: Vehicle): void {
    this.vehicleService.create(element).subscribe(() => {
      this.loadData();
    });
  }

  editElement(element: Vehicle): void {
    // Implement logic for edit action
    console.log('Edit:', element);
  }

  deleteElement(id: number): void {
    this.vehicleService.delete(id).subscribe(() => {
      this.loadData();
    });
  }
}
