import { useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) alert(error.message);
    else alert(isLogin ? 'Logged in!' : 'Check your email to confirm sign up!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer' }}>
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </p>
    </form>
  );
}
