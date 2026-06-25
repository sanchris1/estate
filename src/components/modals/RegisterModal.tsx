"use client";

import { useAuthModal } from "@/store/useAuthModalStore";
import Modal from "./Modal";
import { useStore } from "zustand";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";

interface RegisterModalValues {
  name: string;
  email: string;
  password: string;
}

type RegisterErrors = Partial<Record<keyof RegisterModalValues, string>>;

const RegisterModal = () => {
  const { closeRegister, isRegisterOpen, openLogin } = useStore(
    useAuthModal,
    (state) => state,
  );

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const [values, setValues] = useState<RegisterModalValues>(initialValues);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validate = () => {
    const newErrors: RegisterErrors = {};

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    // validate the name
    if (!values.name.trim()) {
      newErrors.name = "Name is required...";
    } else if (values.name.length < 2) {
      newErrors.name = "Please enter proper name";
    }

    // validate the email
    if (!values.email.trim()) {
      newErrors.email = "Email is required...";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Please enter the correct email";
    }

    // validate the password
    if (!values.password.trim()) {
      newErrors.password = "Password is required...";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,64}$/.test(
        values.password,
      )
    ) {
      newErrors.password =
        "Invalid password. Please use at least 8 characters, including uppercase and lowercase letters, a number, and a special character.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  return (
    <Modal title="Register" onClose={closeRegister} isOpen={isRegisterOpen}>
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
        <p className="text-sm text-gray-500">Login into your account</p>
      </div>

      <form action="" className="space-y-8">
        <Input
          id="login-name"
          name="name"
          label="name"
          value={values.name}
          onchange={handleChange}
          error={errors.name}
          disabled={loading}
        />
        <Input
          id="login-email"
          name="email"
          label="email"
          value={values.email}
          onchange={handleChange}
          error={errors.email}
          disabled={loading}
        />
        <Input
          id="login-password"
          name="password"
          label="password"
          value={values.password}
          onchange={handleChange}
          error={errors.password}
          disabled={loading}
        />
        <Button loading={loading} fullWidth type="submit">
          Submit
        </Button>
      </form>
      {/* divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-500">or</span>
        </div>
      </div>
      {/* google */}
      <Button
        fullWidth
        icon={<FcGoogle size={22} />}
        variant="outline"
        disabled={loading}
      >
        Continue with google
      </Button>

      <p className="text-gray-400 text-center text-sm my-6">
        Have an account ?{" "}
        <span
          className="text-primary font-semibold cursor-pointer hover:underline"
          onClick={openLogin}
        >
          Login
        </span>
      </p>
    </Modal>
  );
};

export default RegisterModal;
