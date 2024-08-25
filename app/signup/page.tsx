"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Here you could add the username to the user's profile if needed
      // await updateProfile(userCredential.user, { displayName: username });
      console.log("User signed up:", userCredential.user);
      router.push("/home"); // Redirect to home page or dashboard
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed up with Google:", result.user);
      router.push("/home"); // Redirect to home page or dashboard
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Sign up to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </div>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Separator className="my-4" />
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleSignUp}
          >
            <svg role="img" viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              />
            </svg>
            Sign up with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
