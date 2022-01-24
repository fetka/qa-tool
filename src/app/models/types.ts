export type PropertyType = 'title' | 'description' | 'step' | 'outcome';

export type LogLevel = 'debug' | 'error' | 'info' | 'trace' | 'warning';

export type FileType =
  | 'application/json'
  | 'image/png'
  | 'image/jpeg'
  | 'video/mp4';

export type ErrorType = {
  error?:
    | 'The filename should be unique!'
    | 'File should be closed'
    | 'File should be opened first'
    | undefined;
};
