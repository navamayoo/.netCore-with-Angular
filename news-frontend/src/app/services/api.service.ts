import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postNote(data: any) {
    return this.http.post<any>('http://localhost:1818/api/Note/', data);
  }
  getAllNotes() {
    return this.http.get<any>('http://localhost:1818/api/Note/');
  }

  putNote(data:any, id:number){
    return this.http.put<any>('http://localhost:1818/api/Note/'+id, data);
  }

  deleteNote(id:number){
    return this.http.delete<any>('http://localhost:1818/api/Note/'+id);
  }

}
