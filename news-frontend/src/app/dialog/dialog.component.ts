import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  noteForm!: FormGroup;
  btnAction: string = 'Save';
  formTitle: string = 'Add Note';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      noteId:[''],
      noteTitle: ['', Validators.required],
      noteDescription: ['', Validators.required],
    });
    console.log('editData', this.editData);
    if (this.editData) {
      this.formTitle = 'Update Note';
      this.btnAction = 'Update';
      this.noteForm.controls['noteId'].setValue(this.editData.noteId);
      this.noteForm.controls['noteTitle'].setValue(this.editData.noteTitle);
      this.noteForm.controls['noteDescription'].setValue(
        this.editData.noteDescription
      );
    }
  }

  addNote() {
   // console.log('Form Data', this.noteForm.value);
    if (this.noteForm.valid) {
        if(!this.editData){
          this.api.postNote(this.noteForm.value).subscribe({
            next: (res) => {
              alert('Note added Successfully');
              this.noteForm.reset();
              this.dialogRef.close("save");
            },
            error: () => {
              alert('Error while adding the Note');
            },
          });
        }else{
            this.updateNote();
        }

    }
  }
updateNote(){
  this.api.putNote(this.noteForm.value, this.editData.noteId).subscribe({
    next:(res)=>{
      alert('Note Update Successfully');
      this.noteForm.reset();
              this.dialogRef.close("update");
    },
    error: () => {
      alert('Error while Update the Note');
    },

  })

}

}
