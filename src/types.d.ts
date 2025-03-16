declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'remote/RemoteApp';
declare module 'remote/RemoteButton';
