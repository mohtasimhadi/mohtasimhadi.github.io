import { Coffee } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex flex-col mt-10 items-center justify-center bg-white text-gray-900 px-4 text-center">
            <Coffee className="w-24 h-24 text-yellow-900 animate-bounce mb-6" />
            <h1 className="text-9xl font-extrabold mb-4">404</h1>
            <p className="text-2xl font-semibold mb-2">
                Oops! Looks like this page took a coffee break ☕️... and forgot to come back!
            </p>
            <p className="max-w-md mx-auto text-gray-700 mb-6">
                Maybe it got distracted by some fresh blog posts.<br />Try heading back home to find some better reads!
            </p>
            <a
                href="/"
                className="inline-block border text-yellow-900 border-yellow-900 font-bold px-6 py-3 rounded-lg hover:underline transition"
            >
                Take me home
            </a>
        </main>
    );
}
