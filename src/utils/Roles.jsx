import { FaUserAlt, FaUserAstronaut, FaUserShield } from 'react-icons/fa';
import { BsTranslate } from 'react-icons/bs';

export default function Roles(role){
    switch (role) {
        case 'DEV':
            return (
                <>
                    <FaUserAstronaut/>
                    developer
                </>
            )
            break;
        case 'ADMIN':
            return (
                <>
                    <FaUserShield/>
                    administrator
                </>
            )
            break;
        case 'TRANSLATOR':
            return (
                <>
                    <BsTranslate/>
                    translator
                </>
            )
            break;
            
        default:
            return (
                <>
                    <FaUserAlt/>
                    user
                </>
            )
            break;
    }
}