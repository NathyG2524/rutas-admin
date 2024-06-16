// types/clsx.d.ts

declare module 'clsx' {
    type ClassValue = string | number | null | undefined | boolean | { [key: string]: boolean } | ClassValue[];
  
    function clsx(...classes: ClassValue[]): string;
  
    export default clsx;
  }
  