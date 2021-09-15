import { SetMetadata } from '@nestjs/common';

export const Role = (role: string) => {
  return SetMetadata('role', role);
};
