import { TenantGuard } from './tenant.guard';
import { Global, Module } from '@nestjs/common';
import { TenantService } from './tenant/tenant.service';

@Global()
@Module({
  providers: [TenantService, TenantGuard],
  exports: [TenantService],
})
export class TenantModule {}
