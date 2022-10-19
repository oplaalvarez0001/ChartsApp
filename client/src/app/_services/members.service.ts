import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { map, Observable, of, pipe, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;



  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  getUserParams() {
    return this.userParams;
  }
  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
     this.userParams = new UserParams(this.user);
     return this.userParams;
  }

  getMembers(userParams: UserParams) {

    var response = this.memberCache.get(Object.values(userParams).join('-'))
    if (response) {
      return of(response)
    }

    // return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions); -- Old version

    //Second old version
    // if (this.members.length > 0) return of(this.members); //-- "of" return an observable instead of a plain array
    // return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
    //   map(members => {
    //     this.members = members;
    //     return this.members;
    //   })
    // );

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender.toString());


    return this.getPaginatedResult<Member[]>(this.baseUrl + 'users', params)
      .pipe(map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      }));
  }



  getMember(username: string) {
    //return this.http.get<Member[]>(this.baseUrl + 'users/' + username, httpOptions); -- Old version

    // const member = this.members.find(x => x.username === username);
    // if (member !== undefined) return of(member);

    //reduce function flattens all arrays into one array adds 
    console.log(this.memberCache);
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.username === username);
    console.log(member);


    if (member) {
      return of(member);
    }


    console.log(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }


  private getPaginatedResult<T>(url, params) {

    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', page.toString());
    params = params.append('pageSize', itemsPerPage.toString());

    return params;
  }

}
