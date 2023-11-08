import useMutation from '@/libs/client/useMutation';
import { ResponseType } from '@/libs/server/withHandler';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/button';
import Link from 'next/link';
interface IForm {
    email: string;
}

export default () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IForm>();
    const router = useRouter();
    const [login, { loading, data }] = useMutation<ResponseType>('/api/users/login');

    const onValid = (validForm: IForm) => {
        reset();
        if (loading) return;
        login(validForm);
    };
    useEffect(() => {
        if (data) {
            if (data.ok) {
                alert(data?.text);
                router.replace('/');
            } else {
                alert(data?.text);
            }
        }
    }, [data]);
    return (
        <div className="mx-auto max-w-xl w-full h-screen bg-pink-50 flex items-center justify-center">
            <div className="flex flex-col  bg-pink-400 w-72 px-4 py-5 rounded-xl shadow-md">
                <h1 className="font-semibold text-lg text-center mb-2 text-pink-50">Login</h1>
                <form onSubmit={handleSubmit(onValid)} className="space-y-3">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-white" htmlFor="email">
                            Email:{' '}
                        </label>
                        <input
                            className="appearance-none w-full px-3 py-2 border border-gray-100 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                            type="email"
                            {...register('email', { required: 'Write your email please.' })}
                        />
                        <span className="mb-1 text-xs font-medium text-white">{errors?.email?.message}</span>
                    </div>
                    <Button text="Log in" />
                </form>
                <div className="text-gray-100 text-xs mt-4">
                    계정이 없으신가요?
                    <Link
                        className="cursor-pointer ml-1 underline text-red-50 hover:text-white hover:font-semibold"
                        href="/create-account"
                    >
                        가입하기
                    </Link>
                </div>
            </div>
        </div>
    );
};
