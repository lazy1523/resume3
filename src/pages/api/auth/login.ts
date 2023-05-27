import useAxios from "@/src/lib/useAxios";
import { userState } from "@/store/globalState";
import { useCallback } from 'react';
import { useRecoilState } from "recoil";

function useLogin() {
    const { post } = useAxios();
    const [, setUser] = useRecoilState(userState);

    const login = useCallback(async (email: string, password: string) => {
        try {
            const response = await post('auth/email/login', { email, password });
            // 在这里处理登录成功的操作，例如设置全局的登录状态，存储token等
            const userData = response.data;
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', userData.token);
            setUser(userData);
            window.location.href = '/';

            // console.log(response.data); // 打印返回数据
            return response.data;
        } catch (error) {
            console.error(error); // 登录失败，你可以在这里处理失败的情况，例如弹出提示信息等
        }
    }, [post]);

    return login;
}

export default useLogin;
