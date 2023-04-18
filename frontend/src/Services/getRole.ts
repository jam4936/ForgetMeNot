import {getRole, isAuthenticated} from "./Authentication";

export function isAdmin(){
    return getRole() == 'admin';
}

export function isFamily(){
    return getRole() == 'family';
}

export function isFacility(){
    return getRole() == 'faculty'
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
    if(getRole() == 'family'|| getRole() == 'admin'){
        return true
    }
    else if (getRole() == 'faculty'){
        window.location.href = '/facultyLanding';
    }
    else{
        window.location.href = '/';
    }
    return false
}

export function redirectFacility(){
    if(getRole() == 'faculty'|| getRole() == 'admin'){
        return true
    }
    else if (getRole() == 'family'){
        window.location.href = '/familyLanding';
    }
    else{
        window.location.href = '/';
    }
    return false
}

export function redirectAdmin(){
    if(getRole() == 'admin'){
        return true
    }
    else if (getRole() == 'family'){
        window.location.href = '/familyLanding';
    }
    else if (getRole() == 'faculty'){
        window.location.href = '/facultyLanding';
    }
    else{
        window.location.href = '/';
    }
    return false
}