export function isLoggedIn(){
    if(!!!window.sessionStorage.getItem('role')){
        window.location.href = '/';
    }
}

export function isFamily(){
    if(window.sessionStorage.getItem('role') == 'family'){
        return false
    }
    else{
        window.location.href = '/';
    }
}

export function isFacility(){
    if(window.sessionStorage.getItem('role') == 'facility'){
        return false
    }
    else{
        window.location.href = '/';
    }
}