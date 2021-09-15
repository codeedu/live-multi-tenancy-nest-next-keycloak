import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
//Reactive X
@Injectable()
export class AuthService {
  constructor(private http: HttpService) {}

  async login(username: string, password: string) {
    const { data } = await firstValueFrom(
      this.http.post(
        'http://host.docker.internal:8080/auth/realms/fullcycle/protocol/openid-connect/token',
        new URLSearchParams({
          client_id: 'nest',
          client_secret: '57441e32-b353-40a5-81e3-75cda25e6b5e',
          grant_type: 'password',
          username,
          password,
        }),
      ),
    );
    return data;
  }
}
//auth0 - jsonwebtoken

// client_id=nest
// &client_secret=625baf8d-2be8-4850-95cc-ec19c0be2752
// &grant_type=password
// &username=user1@user.com
// &password=123456
