
import { LogLevel } from "@azure/msal-browser";

export const baseUrl = 'https://digitaltabler.pg.com:8888';

export const baseUrlCIS = 'https://tsp-appserverpe.na.pg.com';

export const embedAuthUrl = 'https://tsp-appserver.na.pg.com/PowerBI/API/getToken.php';

export const msalConfig = {
    auth: {
        clientId: "1a0cf141-bca9-40ec-8959-23477a526d9f",
        authority: "https://login.microsoftonline.com/3596192b-fdf5-4e2c-a6fa-acb706c963d8",
        redirectUri: "http://localhost:3000/"
    },
    cache: {
        cacheLocation: "sessionStorage", 
        storeAuthStateInCookie: false, 
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        // console.error(message);		
                        return;		
                    case LogLevel.Info:		
                        // console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                        // console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        // console.warn(message);		
                        return;		
                    default:
                        
                }	
            }	
        }	
    }
};

export const msalConfig2 = msalConfig;

export const loginRequest = {
    scopes: ["User.Read"]
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
