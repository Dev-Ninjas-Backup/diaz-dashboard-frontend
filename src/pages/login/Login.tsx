/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useForgotPasswordMutation,
  useLoginMutation,
  useResetPasswordMutation,
} from '@/redux/features/auth/authApi';
import { setCredentials } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/typeHook';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [resetPassword] = useResetPasswordMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res: any = await login({ email, password }).unwrap();

      dispatch(
        setCredentials({
          token: res.data.token,
          user: res.data.user,
        }),
      );

      navigate('/');
      toast('Welcome Back!');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Login failed');
    }
  };

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: 'Forgot Password',
      input: 'email',
      inputLabel: 'Enter your email address',
      inputPlaceholder: 'you@example.com',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      confirmButtonColor: '#2563eb',
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter your email!';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address!';
        }
        return null;
      },
    });

    if (email) {
      // Show loading animation
      Swal.fire({
        title: 'Sending OTP...',
        html: 'Please wait while we send the OTP to your email.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        await forgotPassword({ email }).unwrap();
        toast.success('OTP sent to your email!');

        // Show OTP and new password input modal
        const { value: formValues } = await Swal.fire({
          title: 'Reset Password',
          html: `
            <div style="text-align: left; margin-top: 20px;">
              <label style="display: block; font-weight: 500; margin-bottom: 8px; color: #374151;">
                OTP Code
              </label>
              <input
                id="swal-otp"
                type="text"
                placeholder="Enter OTP"
                style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; margin-bottom: 16px; font-size: 14px;"
                autocomplete="off"
              />
              <label style="display: block; font-weight: 500; margin-bottom: 8px; color: #374151;">
                New Password
              </label>
              <div style="position: relative;">
                <input
                  id="swal-password"
                  type="password"
                  placeholder="Enter your new password"
                  style="width: 100%; padding: 10px 40px 10px 10px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;"
                  autocomplete="new-password"
                />
                <button
                  type="button"
                  id="toggle-password"
                  style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #6b7280; padding: 0; display: flex; align-items: center; justify-content: center;"
                >
                  <svg id="eye-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: 'Reset Password',
          confirmButtonColor: '#2563eb',
          focusConfirm: false,
          didOpen: () => {
            const toggleBtn = document.getElementById('toggle-password');
            const passwordInput = document.getElementById(
              'swal-password',
            ) as HTMLInputElement;
            const eyeIcon = document.getElementById('eye-icon');

            toggleBtn?.addEventListener('click', () => {
              if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                if (eyeIcon) {
                  eyeIcon.innerHTML =
                    '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
                }
              } else {
                passwordInput.type = 'password';
                if (eyeIcon) {
                  eyeIcon.innerHTML =
                    '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
                }
              }
            });
          },
          preConfirm: () => {
            const otp = (
              document.getElementById('swal-otp') as HTMLInputElement
            )?.value;
            const newPassword = (
              document.getElementById('swal-password') as HTMLInputElement
            )?.value;

            if (!otp) {
              Swal.showValidationMessage('Please enter the OTP!');
              return false;
            }
            if (!/^\d+$/.test(otp)) {
              Swal.showValidationMessage('OTP must be a number!');
              return false;
            }
            if (!newPassword) {
              Swal.showValidationMessage('Please enter a new password!');
              return false;
            }
            if (newPassword.length < 6) {
              Swal.showValidationMessage(
                'Password must be at least 6 characters!',
              );
              return false;
            }

            return { otp, newPassword };
          },
        });

        if (formValues) {
          try {
            const res: any = await resetPassword({
              email,
              otp: formValues.otp,
              newPassword: formValues.newPassword,
            }).unwrap();

            toast.success(res?.message || 'Password reset successfully!');

            // Clear the form fields after successful reset
            setEmail('');
            setPassword('');

            await Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Your password has been reset. Please login with your new password.',
              confirmButtonColor: '#2563eb',
            });
          } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to reset password!');
          }
        }
      } catch (err: any) {
        Swal.close();
        toast.error(err?.data?.message || 'Failed to send OTP!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-2">
            Please sign in to continue to your dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 "
              />
              Remember me
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
