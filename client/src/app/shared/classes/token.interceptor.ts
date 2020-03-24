
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
   constructor(private auth: AuthService, private router: Router){

   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     if(this.auth.isAuthenticated()){
       req = req.clone({ //переопределям текущий req
         setHeaders: {
           Authorization: this.auth.getToken() //добавляем authorization header для любого запроса
         }
       })
     }
     return next.handle(req).pipe( //продолжаем выполнение данного запроса
       catchError(
         (error: HttpErrorResponse)=>this.handleAuthError(error)
       )
     )
   }

   private handleAuthError(error: HttpErrorResponse): Observable<any>{
     if(error.status === 401){ //неавторизован
       this.router.navigate(['/login'], {
         queryParams: {
           sessionFailed: true
         }
       })
     }
     return throwError(error)
   }
}
