import {isAuthenticated} from "./Authentication";

export function isAdmin(){
    if (isAuthenticated()){
        if(window.sessionStorage.getItem('role') == 'admin'){
            return true
        }
    }
    return false
}

export function isFamily(){
    if (isAuthenticated()){
        if(window.sessionStorage.getItem('role') == 'family'){
            return true
        }
    }
    return false
}

export function isFacility(){
    if (isAuthenticated()){
        if(window.sessionStorage.getItem('role') == 'facility'){
            return true
        }
    }
    return false
}

export function redirectLoggedIn(){
    if(!isAuthenticated()){
        window.location.href = '/';
    }else{
        return true
    }
    return false
}

export function redirectFamily(){
    if (isAuthenticated()){
        if(window.sessionStorage.getItem('role') == 'family'|| window.sessionStorage.getItem('role') == 'admin'){
            return true
        }
        else{
            if(window.sessionStorage.getItem('role') == 'facility'){
                window.location.href = '/facilityLanding';
            }
            else {
                window.location.href = '/';
            }
        }
    }
    else {
        window.location.href = '/';
    }
    return false

}

export function redirectFacility(){
    if (isAuthenticated()){
        if(window.sessionStorage.getItem('role') == 'facility'|| window.sessionStorage.getItem('role') == 'admin'){
            return true
        }
        else{
            if(window.sessionStorage.getItem('role') == 'family'){
                window.location.href = '/familyLanding';
            }
            else {
                window.location.href = '/';
            }
        }
    }
    else {
        window.location.href = '/';
    }
    return false
}

export function redirectAdmin(){
    if (isAuthenticated()){
        if(window.sessionStorage.getItem('role') == 'admin'){
            return true
        }
        else{
            if(window.sessionStorage.getItem('role') == 'facility'){
                window.location.href = '/facilityLanding';
            }else if(window.sessionStorage.getItem('role') == 'family'){
                window.location.href = '/familyLanding';
            }
            else {
                window.location.href = '/';
            }
        }
    }
    else {
        window.location.href = '/';
    }
    return false
}