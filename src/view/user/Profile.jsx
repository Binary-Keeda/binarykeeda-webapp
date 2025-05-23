import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const avatars = [
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_20.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_17.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_1.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_19.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_20.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_7.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_6.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_17.png",
];

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    yearOfGraduation: "",
    university: "",
    program: "",
    semester: "",
    specialisation: "",
  });

  const [avatarSelectedUrl, setAvatarSelectedUrl] = useState("");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        yearOfGraduation: user.yearOfGraduation || "",
        university: user.university || "",
        program: user.program || "",
        semester: user.semester || "",
        specialisation: user.specialisation || "",
      });
      setAvatarSelectedUrl(user.avatar || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarSelect = (url) => {
    setAvatarSelectedUrl(url);
    setShowAvatarModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) return setMessage("User not authenticated");

    try {
      setLoading(true);
      const backendURL =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

      const payload = {
        ...formData,
        _id: user._id,
        avatar: avatarSelectedUrl,
      };

      await axios.post(`${backendURL}/auth/complete-profile`, payload, {
        withCredentials: true,
      });

      navigate("/user", { replace: true });
      window.location.reload();
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Update failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full animate-fade-in shadow-xl">
            <h3 className="text-xl font-bold text-center mb-4 text-[#db5602]">
              Choose Your Avatar
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {avatars.map((url) => (
                <img
                  key={url}
                  src={url}
                  alt="avatar"
                  onClick={() => handleAvatarSelect(url)}
                  className={`w-16 h-16 rounded-full cursor-pointer transition-all ${
                    avatarSelectedUrl === url
                      ? "ring-4 ring-[#db5602] scale-110"
                      : "hover:ring-2 hover:ring-[#db5602]/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setShowAvatarModal(false)}
              className="mt-6 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-[#db5602] font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Profile Form with Internal Gradient */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-[#db5602] to-[#e67a34] p-4 text-white text-center">
          <h2 className="text-xl font-bold">Edit Your Profile</h2>
        </div>

        <div className="p-5 space-y-4 bg-gradient-to-br from-[#fff8f5] to-[#fdeee6]">
          {message && (
            <div
              className={`p-2 rounded-md text-sm text-center ${
                message.includes("success") || message.includes("updated")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center">
              <div
                onClick={() => setShowAvatarModal(true)}
                className="relative w-16 h-16 rounded-full bg-gray-200 overflow-hidden cursor-pointer mb-2 border-2 border-white shadow-md hover:border-[#db5602] transition"
              >
                {avatarSelectedUrl ? (
                  <img
                    src={avatarSelectedUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-[#db5602]/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowAvatarModal(true)}
                className="text-xs text-[#db5602] hover:text-[#b34600] transition font-medium"
              >
                Change avatar
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "university", label: "University", required: true },
                { name: "program", label: "Program", required: true },
                {
                  name: "specialisation",
                  label: "Specialisation",
                  required: true,
                },
                { name: "semester", label: "Semester", required: false },
                {
                  name: "yearOfGraduation",
                  label: "Graduation Year",
                  required: true,
                },
              ].map((field) => (
                <div key={field.name} className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.label}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db5602] focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[#db5602] hover:bg-[#b34600] text-white font-medium rounded-md transition flex items-center justify-center shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
