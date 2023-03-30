export function isLoggedIn(){
    if(!!!window.sessionStorage.getItem('role')){
        window.location.href = '/';
    }
}

export function isFamily(){
    if(window.sessionStorage.getItem('role') == 'family'|| window.sessionStorage.getItem('role') == 'admin'){
        return false
    }
    else{
        window.location.href = '/';
    }
}

export function isFacility(){
    if(window.sessionStorage.getItem('role') == 'facility' || window.sessionStorage.getItem('role') == 'admin'){
        return false
    }
    else{
        window.location.href = '/';
    }
}