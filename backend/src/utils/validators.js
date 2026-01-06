import { validate as isUUID } from 'uuid';

export const requireString = (value, field) => {
  if (!value || typeof value !== 'string' || !value.trim()) {
    throw {
      code: 'VALIDATION_ERROR',
      message: `${field} must be a non-empty string`,
    };
  }
};

export const requireUUID = (value, field) => {
  if (!isUUID(value)) {
    throw {
      code: 'VALIDATION_ERROR',
      message: `${field} must be a valid UUID`,
    };
  }
};

export const requirePositiveNumber = (value, field) => {
  if (typeof value !== 'number' || value <= 0) {
    throw {
      code: 'VALIDATION_ERROR',
      message: `${field} must be a positive number`,
    };
  }
};

export const requireEnum = (value, allowed, field) => {
  if (!allowed.includes(value)) {
    throw {
      code: 'VALIDATION_ERROR',
      message: `${field} must be one of: ${allowed.join(', ')}`,
    };
  }
};
