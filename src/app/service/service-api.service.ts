import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReqShowForm, ResShowForm } from '../interface-api/interface-from';
import { ReqLogin, ResLogin } from '../interface-api/interface-Login';
import { ReqLogout, ResLogout } from '../interface-api/interface-Loout';
import { ReqRefreshToken, ResRefreshToken } from '../interface-api/interface-refreshToken';
import { ReqReport, ResReport } from '../interface-api/interface-report';
import { ReqDataQuestion, ResDataQuestion, ResShowQuestion } from '../interface-api/interface-showquestion';
import { ReqCreateUser, ReqUpdateUser, ResCreateUser, ResDeleteUser, ResUpdateUser, ResUser } from '../interface-api/interface-user';
import { ResShowChart } from '../interface-api/interfae-Chart';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {

  apiUrl = environment.httpApi;

  constructor(private httpApiClient: HttpClient) { }



  // ----------------------------------------------questions--------------------------------------------


  public showQuestion(id: number): Observable<ResShowQuestion> {
    return this.httpApiClient.get<ResShowQuestion>(`${this.apiUrl}/api/main/getForm/${id}`);
  }

  public getCheckQuestion(body: ReqDataQuestion): Observable<ResDataQuestion> {
    return this.httpApiClient.post<ResDataQuestion>(`${this.apiUrl}/api/answer/check`, body);
  }

  // ----------------------------------------------login and logout--------------------------------------------


  public getLogin(body: ReqLogin): Observable<ResLogin> {
    return this.httpApiClient.post<ResLogin>(`${this.apiUrl}/api/user/login`, body);
  }

  public getLogOut(body: ReqLogout): Observable<ResLogout> {
    return this.httpApiClient.post<ResLogout>(`${this.apiUrl}/api/user/logout`, body);
  }



  // ----------------------------------------------report--------------------------------------------

  public getReport(body: ReqReport): Observable<ResReport> {
    return this.httpApiClient.post<ResReport>(`${this.apiUrl}/api/report/gets`, body);
  }

  // ----------------------------------------------user and Update-----------------------------------------------

  public showUser(): Observable<ResUser> {
    return this.httpApiClient.get<ResUser>(`${this.apiUrl}/api/user/gets`);
  }

  public UpdateUser(body: ReqUpdateUser): Observable<ResUpdateUser> {
    return this.httpApiClient.post<ResUpdateUser>(`${this.apiUrl}/api/user/update`, body);
  }

  public CreateUser(body: ReqCreateUser): Observable<ResCreateUser> {
    return this.httpApiClient.post<ResCreateUser>(`${this.apiUrl}/api/user/create`, body);
  }

  public deleteUser(id: number): Observable<ResDeleteUser> {
    return this.httpApiClient.delete<ResDeleteUser>(`${this.apiUrl}/api/user/delete/${id}`);
  }


  // ----------------------------------------------RefreshToken-----------------------------------------------

  public RefreshToken(body: ReqRefreshToken): Observable<ResRefreshToken> {
    return this.httpApiClient.post<ResRefreshToken>(`${this.apiUrl}/api/user/token`, body);
  }


  // ----------------------------------------------From------------------------------------------------------

  public GetMainForm(body: ReqShowForm): Observable<ResShowForm> {
    return this.httpApiClient.post<ResShowForm>(`${this.apiUrl}/api/main/gets`, body);
  }

  // -------------------------------------------------------Chart---------------------------------------------

  public showChart(): Observable<ResShowChart> {
    return this.httpApiClient.get<ResShowChart>(`${this.apiUrl}/api/report/show`);
  }

}
