import { FallbackProps, useErrorBoundary } from 'react-error-boundary';

export default function ErrorFallback({ error }: FallbackProps) {
    const { resetBoundary } = useErrorBoundary();
    return (
        <section className="mx-auto max-w-xl w-full h-full min-h-screen flex items-center justify-center bg-pink-50">
            <div className="space-y-2 flex flex-col items-center justify-center">
                <p>이용에 불편을 드려 죄송합니다.</p>
                <p>F5 키를 누르시거나, 아래 버튼을 클릭해주시길 바랍니다.</p>
                <p className="text-red-500">{error.message}</p>
                <button
                    className="bg-pink-500 hover:bg-pink-600 text-white  px-4 border border-transparent rounded-md shadow-sm font-medium"
                    onClick={resetBoundary}
                >
                    다시 시도하기
                </button>
            </div>
        </section>
    );
}
