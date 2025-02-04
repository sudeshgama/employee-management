import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss'
})
export class DeleteEmployeeComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteEmployeeComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  onConfirm(): void {
    this.dialogRef.close(true); // Emit `true` when the user confirms
  }

  onCancel(): void {
    this.dialogRef.close(false); // Emit `false` when the user cancels
  }
}
