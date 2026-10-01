import React, { useState, useEffect } from "react";
import { User, Camera, Lock, Save, Loader2, Mail } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/authApi";

// Base URL configuration
const IMG_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ProfileSetting = () => {
  const { data: userData, isLoading: profileLoading } =
    useGetMeQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // Initial data set
  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({ ...prev, name: userData.name }));

      // Jodi image URL "http" diye shuru na hoy, tobe age IMG_URL add hobe
      if (userData.image) {
        const fullImageUrl = userData.image.startsWith("http")
          ? userData.image
          : `${IMG_URL}${userData.image}`;
        setPreview(fullImageUrl);
      }
    }
  }, [userData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // Noutun image select korle direct preview set hobe (URL.createObjectURL)
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const data = new FormData();
    data.append("name", formData.name);
    if (formData.password) data.append("password", formData.password);
    if (image) data.append("image", image);

    try {
      await updateProfile(data).unwrap();
      toast.success("Profile updated successfully!");
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (profileLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-(--market-leaf)" />
      </div>
    );
  }

  return (
    <div className="notranslate p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-10">
        <div className="rounded-lg bg-(--market-leaf) p-3 text-white shadow-sm">
          <User size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">
            Profile Settings
          </h1>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
            Manage your personal identity
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left: Avatar Upload */}
        <div className="lg:col-span-1">
          <div className="flex flex-col items-center border border-slate-200 bg-white p-6 shadow-sm">
            <div className="relative group">
              <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-slate-100 bg-slate-50 shadow-inner">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-300">
                    <User size={48} />
                  </div>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 cursor-pointer rounded-full bg-(--market-leaf) p-3 text-white shadow-md transition-transform hover:scale-110">
                <Camera size={18} />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <p className="mt-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
              Click the camera icon to update photo
            </p>
          </div>
        </div>

        {/* Right: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <section className="space-y-5 border border-slate-200 bg-white p-6 shadow-sm">
            {/* Email - Disabled */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-2 block tracking-widest">
                Email Address (Permanent)
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
                <input
                  type="email"
                  disabled
                  value={userData?.email}
                  className="w-full cursor-not-allowed rounded-md border border-slate-200 bg-slate-50 py-3.5 pl-14 pr-6 font-bold text-slate-400"
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-2 block tracking-widest">
                Display Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-5 py-3.5 font-bold text-slate-900 focus:border-(--market-leaf) focus:outline-none focus:ring-2 focus:ring-red-100"
              />
            </div>

            <hr className="border-gray-50 my-4" />

            {/* Password Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-2 block tracking-widest">
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                    size={16}
                  />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full rounded-md border border-slate-200 bg-slate-50 py-3.5 pl-14 pr-6 font-bold focus:border-(--market-leaf) focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-2 block tracking-widest">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-5 py-3.5 font-bold focus:border-(--market-leaf) focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={isUpdating}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-(--market-leaf) py-4 text-sm font-black uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-(--market-leaf-deep)"
          >
            {isUpdating ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Save size={18} /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSetting;
