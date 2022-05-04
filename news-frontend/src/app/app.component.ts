import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'news-frontend';
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<any>;

  constructor(public dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllNotes();
  }

  openDialog() {
    const dialogRef = this.dialog
      .open(DialogComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllNotes();
        }
      });
  }
  getAllNotes() {
    this.api.getAllNotes().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.obs = this.dataSource.connect();
        console.log(this.dataSource.data);
      },
      error: () => {
        alert('Error while Get the Note');
      },
    });
  }

  editOpenDialog(data: any) {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
        data: data,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllNotes();
        }
      });
  }

  deleteNoteAlertDialog(id: number) {
    const dialogRef = this.dialog
      .open(AlertDialogComponent, {
        width: '40%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'YES') {
          this.deleteNote(id);
          this.getAllNotes();
        }
      });
  }

  deleteNote(id: number) {
    this.api.deleteNote(id).subscribe({
      next: (res) => {
        alert('Note delete successfully');
        this.getAllNotes();
      },
      error: () => {
        alert('Error while Delete the Note');
      },
    });
  }

  // dialogRef.afterClosed().subscribe(result => {
  //   console.log(`Dialog result: ${result}`);
  // });
}
