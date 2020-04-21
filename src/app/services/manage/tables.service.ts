import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  private url = `${environment.apiBaseUrl}/admins`;
  constructor(private http: HttpClient) { }
  

  public getHeadersAdmin() {
    return [
      'firstName',
      'LastName',
      'Email',
      'Gender',
      'Position',
      'Qualification',
      'PhoneNumber',
      'Status',
    ];
  }
  public getHeadersUsers() {
    return [
      'firstName',
      'LastName',
      'Email',
      'Status',
    ];
  }

 

  /*public getBorderedTable() {
    return [
      [
        '23',
        'Gone with the Wind',
        'Margaret Mitchell',
        '1936',
        'hello',
        'hello',
        'unread',
      ],
      [
        '24',
        'The Count of Monte Cristo',
        'Alexandre Dumas',
        '1845',
        'hello',
        'hello',
        'unread',
      ],
      [
        '25',
        'Lolita',
        'Vladimir Nabokov',
        '1955',
        'hello',
        'hello',
        'read',
      ],
      [
        '26',
        'The Hobbit',
        'J.R.R. Tolkien',
        '1937',
        'hello',
        'hello',
        'unread',
      ],
    ];
  }*/

  public getBorderedTable() {
    return [
      [
        'test',
        'test',
        'test@gmail.com',
        'Male',
        'test',
        'Junior',
        '12345678',
        'unread',
      ],
    ];
  }


  listAdmin()
  {
    return this.http.get(this.url+'/listAdmins',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  listUsers()
  {
    return this.http.get(this.url+'/listUsers',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  updateState(body:any)
  {
    return this.http.put(this.url+'/updateState',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  private sorting(array, order, value) {
    const compareFunction = (a, b) => {
      if (a[value] > b[value]) {
        return 1 * order;
      }
      if (a[value] < b[value]) {
        return -1 * order;
      }
      return 0;
    };
    return array.sort(compareFunction);
  }
}
