import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private notificationService = inject(NotificationService);

  ngOnInit() {
    this.notificationService.listen('product_added').subscribe(data => {
      this.showNotification(data.message);
    });

    this.notificationService.listen('product_updated').subscribe(data => {

      this.showNotification(data.message);
    });

    this.notificationService.listen('product_deleted').subscribe(data => {
      this.showNotification(data.message);
    });

    this.notificationService.listen('low_stock').subscribe(data => {
      this.showNotification(data.message);
    });
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
  
}
