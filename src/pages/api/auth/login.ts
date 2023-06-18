import useAxios from "@/src/lib/useAxios";
import { userState } from "@/store/globalState";
import { useCallback } from 'react';
import { useRecoilState } from "recoil";

function useLogin() {
    const { post } = useAxios();
    const [, setUser] = useRecoilState(userState);

    const login = useCallback(async (email: string, password: string) => {
            const response = await post('auth/email/login', { email, password });
            const userData = response.data;
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', userData.token);
            setUser(userData);
            window.location.href = '/';
            return response.data;
    }, [post,setUser]);

    return login;
}

export default useLogin;
