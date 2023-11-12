import { FallbackProps } from 'react-error-boundary';

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <section className="mx-auto max-w-xl w-full h-full min-h-screen bg-pink-50">
            <div>
                <p>이용에 불편을 드려 죄송합니다.</p>
                <p className="text-red-500">{error.message}</p>
                <button
                    className="w-8 bg-pink-500 hover:bg-pink-600 text-white  px-4 border border-transparent rounded-md shadow-sm font-medium"
                    onClick={resetErrorBoundary}
                >
                    다시 시도하기
                </button>
            </div>
        </section>
    );
}
