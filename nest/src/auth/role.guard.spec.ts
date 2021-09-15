import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  it('should be defined', () => {
    expect(new RoleGuard()).toBeDefined();
  });
});
