import type { NextPage } from 'next';
import Button from '../../components/button';
import Input from '../../components/input';
import Layout from '../../components/layout';
import TextArea from '../../components/textarea';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useMutation from '@/libs/client/useMutation';
import { Tweet } from '@prisma/client';
import { useEffect } from 'react';

interface UploadTweetForm {
    text: string;
}

interface TweetMutation {
    ok: boolean;
    tweet: Tweet;
}

const Upload: NextPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UploadTweetForm>({ mode: 'onChange' });
    const [uploadTweet, { loading, data }] = useMutation<TweetMutation>('/api/tweets');
    const onValid = (data: UploadTweetForm) => {
        if (loading) return;
        uploadTweet(data);
    };
    useEffect(() => {
        if (data?.ok) {
            router.replace(`/tweet/${data.tweet.id}`);
        }
    }, [data, router]);
    return (
        <Layout canGoBack title="Upload Tweet">
            <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
                <TextArea
                    register={register('text', { required: '두 글자 이상 입력해주세요.' })}
                    name="text"
                    label="text"
                    placeholder="무얼 기록하고 싶나요? ^o^"
                />
                <span>{errors?.text?.message}</span>
                <Button text="tweet :)" />
            </form>
        </Layout>
    );
};

export default Upload;
