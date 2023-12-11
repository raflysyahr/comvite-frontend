const LocalStorageData = {
    get:(key)=>{
        return localStorage.getItem(key)
    },
    update:(key,fallback)=>{
        const x = fallback(localStorage.getItem(key));
        localStorage.setItem(key,x)
    },
    exists:(key)=>{
        return localStorage.getItem(key) ? true : false
    }
}




const LocalStorage = new Proxy(LocalStorageData,{
    get(target,receiver){
        return target[receiver]
    }
})

export default LocalStorage