import { toast } from "sonner";
import encryptStorage from "../../helpers/storageEncrypter";
import { logout } from "./userActions";

export const tokenCleanUpError = () => {
    return async (dispatch, getState) => {
        
        
            
            toast.error('Sesión vencida')
            dispatch(logout());
            location.reload();
    }
}