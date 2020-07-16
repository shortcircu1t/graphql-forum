export const ONE_DAY_MS: number = 1000 * 60 * 60 * 24;
export const IS_PRODUCTION: boolean = process.env.NODE_ENV === "production";
export const SESSION_NAME: string = "sid";
export const SESSION_SECRET_STRING: string =
  process.env.SESSION_SECRET_STRING || "ulyalya";
export const USERNAME_LENGTH: number = 20;
export const COMMENTS_PAGE_SIZE: number = 5;
export const POSTS_PAGE_SIZE: number = 5;
export const CATEGORIES: string[] = ["sports", "gaming", "arts", "books"];
export const ONE_DAY_SECS: number = 60 * 1000;
export const PROD_ENDPOINT: string = "https://graphql-forum.herokuapp.com";
export const DEV_ENDPOINT: string = "http://localhost:4000";
