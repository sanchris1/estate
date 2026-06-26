"use client";

import { useStore } from "zustand";
import Modal from "./Modal";
import { useCreatePropertyStateModal } from "@/store/useCreatePropertyModal";
import { useState } from "react";
import Button from "../ui/Button";
import { propertyTypes } from "@/app/constants/PropertyTypes";
import PropertyTypeCard from "../property/PropertyTypeCard";
import Input from "../ui/Input";
import Counter from "../property/Counter";
import ImageUpload from "../property/ImageUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  DETAILS: 2,
  FEATURE: 3,
  IMAGE: 4,
  PRICING: 5,
};

const CreatePropertyModal = () => {
  const { isOpen, close } = useStore(
    useCreatePropertyStateModal,
    (state) => state,
  );

  const router = useRouter();

  const [step, setSteps] = useState(STEPS.TYPE);
  const [loading, setLoading] = useState(false);

  const stepTitle = () => {
    switch (step) {
      case STEPS.TYPE:
        return "Select property type";
      case STEPS.LOCATION:
        return "Where is property located";
      case STEPS.DETAILS:
        return "Share basics about your place";
      case STEPS.FEATURE:
        return "Property description";
      case STEPS.IMAGE:
        return "Property image";
      case STEPS.PRICING:
        return "Add the property value";

      default:
        return "";
    }
  };

  const [propertyType, setPropertyType] = useState("");

  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [parkingSpaces, setParkingSpaces] = useState(1);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<null | string>(null);

  const [price, setPrice] = useState("");
  const [listingType, setListingType] = useState<"rent" | "sale">("sale");

  const handleChange = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  //create listing
  async function createListing() {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("propertyType", propertyType);
      formData.append("listingType", listingType);
      formData.append("bathrooms", bathrooms.toString());
      formData.append("bedrooms", bedrooms.toString());
      formData.append("parkingSpaces", parkingSpaces.toString());
      formData.append("location", location);
      formData.append("area", area);
      formData.append("address", address);
      if (image) {
        formData.append("image", image);
      }

      await axios.post("/api/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Property created successfully");
      router.push("/properties");

      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || "Something went wrong");
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => {
    setAddress("");
    setArea("");
    setBathrooms(1);
    setBedrooms(1);
    setDescription("");
    setImage(null);
    setListingType("rent");
    setLocation("");
    setParkingSpaces(1);
    setPreview(null);
    setPrice("");
    setPropertyType("");
    close();
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Enlist your property">
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span className="">{step + 1} of 6</span>
        <span className="font-medium text-gray-700">{stepTitle()} </span>
      </div>

      <div className="min-h-55 rounded-xl text-gray-400 p-6 border border-dashed border-gray-300">
        {step === STEPS.TYPE && (
          <div className="grid grid-cols-2 w-full max-h-[50vh] overflow-y-scroll no-scrollbar">
            {propertyTypes.map((item) => (
              <PropertyTypeCard
                onClick={() => setPropertyType(item.slug)}
                key={item.slug}
                label={item.label}
                icon={item.icon}
                selected={propertyType === item.slug}
              />
            ))}
          </div>
        )}

        {step === STEPS.LOCATION && (
          <div className="space-y-6">
            <Input
              value={location}
              label="location"
              name="location"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
            />
            <Input
              value={address}
              label="address"
              name="address"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
            />
          </div>
        )}

        {step === STEPS.DETAILS && (
          <div className="space-y-4">
            <Counter
              title="Bedrooms"
              subTitle="How many bedrooms"
              value={bedrooms}
              onChange={setBedrooms}
            />
            <Counter
              title="Bathrooms"
              subTitle="How many bathrooms"
              value={bathrooms}
              onChange={setBathrooms}
            />
            <Counter
              title="Parking spaces"
              subTitle="How many parking spaces"
              value={parkingSpaces}
              onChange={setParkingSpaces}
              min={1}
              max={20}
            />
            <Input
              name="area"
              label="Property area (sqft)"
              type="number"
              value={area}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArea(e.target.value)
              }
            />
          </div>
        )}

        {step === STEPS.FEATURE && (
          <div className="space-y-6">
            <Input
              name="title"
              label="Property Title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <Input
              as="textarea"
              name="description"
              label="Property Description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
            />
          </div>
        )}

        {step === STEPS.IMAGE && (
          <ImageUpload preview={preview} onChange={handleChange} />
        )}

        {step === STEPS.PRICING && (
          <div className="space-y-6">
            <select
              className="h-13 w-full rounded-2xl border border-black/10 px-4 "
              value={listingType}
              onChange={(e) =>
                setListingType(e.target.value as "sale" | "rent")
              }
            >
              <option value="rent">For rent</option>
              <option value="sale">For sale</option>
            </select>

            <Input
              name="price"
              label={listingType === "sale" ? "Sale price" : "Monthly rent"}
              value={price}
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(e.target.value)
              }
            />
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        {step > STEPS.TYPE && (
          <Button
            variant="outline"
            fullWidth
            onclick={() => setSteps((prev) => prev - 1)}
          >
            Back
          </Button>
        )}

        <Button
          fullWidth
          loading={loading}
          onclick={() =>
            step < STEPS.PRICING
              ? setSteps((prev) => prev + 1)
              : createListing()
          }
        >
          {step === STEPS.PRICING ? "Create Listing" : "Next"}
        </Button>
      </div>
    </Modal>
  );
};

export default CreatePropertyModal;
