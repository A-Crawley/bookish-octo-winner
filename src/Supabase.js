import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function SignUp(username, password){
    let { data, error } = await supabase.auth.signUp({
    email: username,
    password: password
    });

    if (error){
        console.error(error)
        throw error
    }

    return data;
}

export async function SignIn(username, password){
    let { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password
    });

    if (error){
        console.error(error)
        throw error;
    }

    return data;
}

export function LogOut(){
    supabase.auth.signOut();
}



  