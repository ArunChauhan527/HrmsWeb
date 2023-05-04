import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { error } from "console";
import { Observable, catchError, throwError } from "rxjs";
import { AuthenticationService } from "../service/authentication.service";
import { RefreshToken } from "../component/login/RefreshTokenModel";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private auth: AuthenticationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const modifiedReq = req.clone({
        headers : req.headers.append('Authorization','Bearer '+localStorage.getItem('token'))
       });
        return next.handle(modifiedReq).pipe(catchError(error=>{
            if(error instanceof HttpErrorResponse && req.url.includes('')&&error.status ==401)
            {
                
                const refresh : RefreshToken = new RefreshToken(''+localStorage.getItem('refreshToken'));
                this.auth.refreshToken(refresh).subscribe(res=>{
                     localStorage.removeItem('token');
                     localStorage.removeItem('refreshToken');
                     localStorage.setItem('token', res.token);
                     localStorage.setItem('refreshToken', res.refreshToken);
                     console.log('api has been done'+res.token);
                     return next.handle(this.addTokenHeader(req, res.token));
                }, error=> {return throwError(()=>error);});

            }
            return throwError(()=>error);
        }));
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({ headers: request.headers.set('Authorization', 'Bearer'+token) });
      }
 }
    

