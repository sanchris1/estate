"use client";

import Image from "next/image";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { LuSend } from "react-icons/lu";
import toast from "react-hot-toast";
import axios from "axios";
interface InputValues {
  email: string;
  name: string;
  phone: string;
  message: string;
}

interface EmailFormProps {
  name: string;
  image: string;
  email: string;
  propertyTitle: string;
  price: number;
}

const EmailForm = ({
  name,
  image,
  email,
  propertyTitle,
  price,
}: EmailFormProps) => {
  const initialValues = {
    email: "",
    name: "",
    phone: "",
    message: "",
  };

  const [values, setValues] = useState<InputValues>(initialValues);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendEmail = async () => {
    if (
      [values.email, values.name, values.phone, values.message].some(
        (item) => !item,
      )
    ) {
      toast.error("All fields are needed");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/send-email", {
        ownerEmail: email,
        ownerName: name,
        propertyTitle,
        price,
        senderEmail: values.email,
        senderName: values.name,
        senderMessage: values.message,
        senderPhone: values.phone,
      });

      toast.success("Email sent successfully");
      setValues(initialValues);
    } catch (error) {
      console.log(error);
      toast.error("Error sharing the email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className="sticky top-28 rounded-4xl  border border-black/5 bg-card p-8 shadow-sm"
        onSubmit={sendEmail}
      >
        <div className="flex items-center gap-4 ">
          <Image
            src={image}
            alt="avatar image"
            width={50}
            height={50}
            className="object-cover rounded-full"
          />

          <div className="">
            <h3 className="text-xl font-bold text-text">{name}</h3>
            <p className="text-text/60">Property Agent</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Input
            onchange={handleChange}
            id="contact-name"
            label="Your name"
            name="name"
            value={values.name}
          />
          <Input
            onchange={handleChange}
            id="contact-email"
            label="Your email"
            name="email"
            value={values.email}
          />
          <Input
            onchange={handleChange}
            id="contact-phone"
            label="Your phone"
            name="phone"
            value={values.phone}
          />
          <Input
            onchange={handleChange}
            id="contact-message"
            label="Your message"
            name="message"
            value={values.message}
            as="textarea"
          />
        </div>
        <Button
          loading={loading}
          type="submit"
          fullWidth
          icon={<LuSend />}
          className="my-2"
        >
          Send email{" "}
        </Button>
      </form>
    </div>
  );
};

export default EmailForm;
