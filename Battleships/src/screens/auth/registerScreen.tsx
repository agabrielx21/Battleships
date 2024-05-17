import Register from "../../components/Register"
import {useAuth} from "../../hooks/authContext"
import {useNavigation} from "@react-navigation/native";
import {AuthRouteNames} from "../../router/routeNames";

const RegisterScreen = () => {
    const navigation = useNavigation<any>()
    const handleGoToLogin = () => {
        navigation.navigate(AuthRouteNames.LOGIN)
    }
    const auth = useAuth()
    return <Register onSubmit={auth.register} goToLogin={handleGoToLogin}/>
}

export default RegisterScreen