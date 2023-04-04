import {getRole, isAuthenticated} from "./Authentication";

export function isAdmin(){
    return getRole() == 'Admin';
}

export function isFamily(){
    return getRole() == 'Family';
}

export function isFacility(){
    return getRole() == 'Faculty'
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
    if(getRole() == 'Family'|| getRole() == 'Admin'){
        return true
    }
    else if (getRole() == 'Faculty'){
        window.location.href = '/facultyLanding';
    }
    else{
        window.location.href = '/';
    }
    return false
}

export function redirectFacility(){
    if(getRole() == 'Faculty'|| getRole() == 'Admin'){
        return true
    }
    else if (getRole() == 'Family'){
        window.location.href = '/familyLanding';
    }
    else{
        window.location.href = '/';
    }
    return false
}

export function redirectAdmin(){
    if(getRole() == 'Admin'){
        return true
    }
    else if (getRole() == 'Family'){
        window.location.href = '/familyLanding';
    }
    else if (getRole() == 'Faculty'){
        window.location.href = '/facultyLanding';
    }
    else{
        window.location.href = '/';
    }
    return false
}