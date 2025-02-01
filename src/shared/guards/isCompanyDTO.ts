import { CompanyDTO } from '../types/dto';

export const isCompanyDTO = (
  obj: Record<string, unknown>,
): obj is CompanyDTO => {
  return (
    'name' in obj &&
    typeof obj.name === 'string' &&
    'address' in obj &&
    typeof obj.address === 'string' &&
    'id' in obj &&
    typeof obj.id === 'string'
  );
};
