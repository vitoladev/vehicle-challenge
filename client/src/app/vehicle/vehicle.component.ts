import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { UpdateVehicleComponent } from './update-vehicle/update-vehicle.component';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css',
})
export class VehicleComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Vehicle>([]);
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
  total = 0;
  pageIndex = 0;
  pageSize = 10;

  constructor(
    private vehicleService: VehicleService,
    public dialog: MatDialog
  ) {}

  openCreateVehicleDialog(): void {
    const dialogRef = this.dialog.open(CreateVehicleComponent);

    dialogRef.afterClosed().subscribe((result) => {
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
    this.vehicleService
      .findAll({ page: this.pageIndex + 1, pageSize: this.pageSize })
      .subscribe((result) => {
        this.dataSource.data = result.data;
        this.total = result.totalRecords;
        this.dataSource.paginator = this.paginator;
      });
  }

  pageChangeEvent({ pageIndex, pageSize }: PageEvent) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadData();
  }

  createVehicle(vehicle: Vehicle): void {
    this.vehicleService.create(vehicle).subscribe(() => {
      this.loadData();
    });
  }

  editElement(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(UpdateVehicleComponent, {
      data: vehicle,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  deleteElement(id: number): void {
    this.vehicleService.delete(id).subscribe(() => {
      this.loadData();
    });
  }
}
