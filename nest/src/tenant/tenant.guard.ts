import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantService } from './tenant/tenant.service';

@Injectable()
export class TenantGuard implements CanActivate {

  constructor(private tenantService: TenantService){

  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const subdomain = request.user.subdomain;
    this.tenantService.subdomain = subdomain;
    return true;
  }
}
