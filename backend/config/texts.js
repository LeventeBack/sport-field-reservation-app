export const baseError = 'Something went wrong. Please try again later.';

const defaultTexts = {
  required(name) {
    return `${name} is required`;
  },
  invalidFormat(name) {
    return `Invalid ${name} format`;
  },
  invalidValue(name) {
    return `Invalid ${name} value`;
  },
  length(name, min, max = null) {
    if (!max) {
      return `${name} must be at least ${min} characters`;
    }
    return `${name} must be between ${min} and ${max} characters`;
  },
  createSuccess(name) {
    return `${name} created successfully.`;
  },
  editSuccess(name) {
    return `${name} updated successfully.`;
  },
  deleteSuccess(name) {
    return `${name} deleted successfully.`;
  },
  alreadyExists(item, property) {
    return `${item} with this ${property} already exists`;
  },
  notFound(item) {
    return `${item} not found`;
  },
};

export const authTexts = {
  emailTaken: 'User with this email already exists',

  invalidEmail: 'Unable to find user with this email',
  invalidPassword: 'Invalid password',

  loginSuccess: 'You have logged in successfully.',
  registerSuccess: 'You have registered successfully.',

  invalidToken: 'Invalid authentication token',
  alreadyAuthenticated: 'You are already authenticated.',

  unauthorized: "You don't have permission to view or modify this resource.",

  usernameLength: ({ min, max }) => defaultTexts.length('Username', min, max),
  passwordLength: ({ min }) => defaultTexts.length('Password', min),

  emailFormat: defaultTexts.invalidFormat('Email'),
  passwordRequired: defaultTexts.required('Password'),

  userNotFound: defaultTexts.notFound('User'),

  blockedUser: 'Your account has been blocked',
  pendingUser: 'Your account is pending approval',
};

export const fieldTypeTexts = {
  createSuccess: defaultTexts.createSuccess('Field type'),
  updateSuccess: defaultTexts.editSuccess('Field type'),
  deleteSuccess: defaultTexts.deleteSuccess('Field type'),

  nameLength: ({ min, max }) => defaultTexts.length('Field type name', min, max),
  slugLength: ({ min, max }) => defaultTexts.length('Field type slug', min, max),
  slugTaken: defaultTexts.alreadyExists('Field type', 'slug'),

  notFound: defaultTexts.notFound('Field type'),
};

export const reservationTexts = {
  createSuccess: defaultTexts.createSuccess('Reservation'),
  updateSuccess: defaultTexts.editSuccess('Reservation'),
  deleteSuccess: defaultTexts.deleteSuccess('Reservation'),

  notFound: defaultTexts.notFound('Reservation'),
  alreadyReserved: 'Date and time is already reserved.',
  invalidDate: defaultTexts.invalidFormat('Date'),
  invalidStartTime: defaultTexts.invalidValue('Start time'),
  invalidEndTime: defaultTexts.invalidValue('End time'),
  startBeforeEnd: 'Start time must be less than end time',
  invalidTimeRange: "The selected time range does not match the sport field's open hours",
};

export const sportFieldTexts = {
  createSuccess: defaultTexts.createSuccess('Sport field'),
  updateSuccess: defaultTexts.editSuccess('Sport field'),
  deleteSuccess: defaultTexts.deleteSuccess('Sport field'),

  titleLength: ({ min, max }) => defaultTexts.length('Title', min, max),
  descriptionLength: ({ min, max }) => defaultTexts.length('Description', min, max),
  price: ({ min, max }) => `Price must be between ${min} and ${max}`,

  invalidOpenTime: defaultTexts.invalidValue('Open time'),
  invalidCloseTime: defaultTexts.invalidValue('Close time'),

  closeTimeBeforeOpen: 'Open time must be less than close time',

  notFound: defaultTexts.notFound('Sport field'),
};

export const imageTexts = {
  uploadSuccess: 'Image uploaded successfully',
  updateSuccess: defaultTexts.editSuccess('Image'),
  deleteSuccess: defaultTexts.deleteSuccess('Image'),
  notFound: defaultTexts.notFound('Image'),
  isBannerType: "Unable to update image's banner status",
};

export const userTexts = {
  notFound: defaultTexts.notFound('User'),
  updateSuccess: defaultTexts.editSuccess('User'),
  deleteSuccess: defaultTexts.deleteSuccess('User'),
};
