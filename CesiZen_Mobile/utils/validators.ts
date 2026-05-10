export function isEmailValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}


export function isPasswordValid(value:string):boolean{

    return value.length>=6;
}


export function isAccountValid(value : string):boolean{
    
    return value==="ACTIF"
}