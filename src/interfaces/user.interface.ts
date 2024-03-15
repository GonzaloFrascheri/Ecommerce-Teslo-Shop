
export interface User{
    id: string;
    name: string;
    email: string;
    emailVerified?: string;
    password: string;
    role: string;
    image?: string | null;
}