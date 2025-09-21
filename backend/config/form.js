const length = (min, max = null) => ({ min, max });

export const USERNAME = length(3, 30);

export const PASSWORD = length(6, 50);

export const FIELD_TYPE_NAME = length(3, 30);

export const FIELD_TYPE_SLUG = length(3, 30);

export const SPORT_FIELD_TITLE = length(3, 50);

export const SPORT_FIELD_DESCRIPTION = length(10, 2000);

export const SPORT_FIELD_PRICE = length(0, 9999);
