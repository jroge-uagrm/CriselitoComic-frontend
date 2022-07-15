export class Utils {
    public static set(key: string, value: any) {
      
        sessionStorage.setItem(key, value);
        
    }

    public static get(key: string) {
         let item=sessionStorage.getItem(key) ;

         return item;
         
         
    }
  
    public static delete(key: string) {
        sessionStorage.removeItem(key);
    }

    public static deleteAll() {
        sessionStorage.clear();
    }

    
}