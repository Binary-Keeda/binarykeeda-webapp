import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../lib/config";

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

const Specialisations = [
  "Data Science",
  "Full Stack Development",
  "Artificial Intelligence & Machine Learning (AI/ML)",
  "Cyber Security",
  "Cloud Computing",
  "Software Engineering",
  "Blockchain Technology",
  "Internet of Things (IoT)",
  "Game Development",
  "Augmented Reality (AR) & Virtual Reality (VR)",
  "Computer Vision",
  "Natural Language Processing (NLP)",
  "DevOps",
  "Mobile App Development",
  "Embedded Systems",
  "Human-Computer Interaction",
  "Robotics",
  "Quantum Computing",
  "Big Data Analytics",
  "Information Systems",
  "Bioinformatics",
  "High Performance Computing",
  "Edge Computing",
  "Computer Graphics & Animation",
  "Other",
];
const years = [
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
  "2033",
  "2034",
  "2035",
  "2036",
  "2037",
];
const sem = ["1", "2", "3", "4", "5", "6"];

const programs = [
  // Engineering
  "B.Tech in Computer Science Engineering",
  "B.Tech in Mechanical Engineering",
  "B.Tech in Electrical Engineering",
  "B.Tech in Civil Engineering",
  "B.Tech in Electronics and Communication Engineering",

  // Information Technology
  "Bachelor of Computer Applications (BCA)",
  "B.Sc in Information Technology",

  // Business and Management
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Commerce (B.Com)",
  "Bachelor of Economics (B.Econ)",

  // Arts and Humanities
  "Bachelor of Arts (BA) in English Literature",
  "BA in History",
  "BA in Sociology",
  "BA in Political Science",

  // Science
  "Bachelor of Science (B.Sc) in Physics",
  "B.Sc in Chemistry",
  "B.Sc in Mathematics",
  "B.Sc in Biotechnology",
  "B.Sc in Environmental Science",

  // Medical and Allied Sciences
  "Bachelor of Pharmacy (B.Pharm)",
  "Bachelor of Physiotherapy (BPT)",
  "Bachelor of Science in Nursing (B.Sc Nursing)",
  "MBBS (Bachelor of Medicine and Surgery)",
  "Bachelor of Dental Surgery (BDS)",

  // Fine Arts and Design
  "Bachelor of Fine Arts (BFA)",
  "Bachelor of Design (B.Des) in Fashion Design",
  "B.Des in Interior Design",

  // Law
  "Bachelor of Laws (LLB)",

  // Engineering
  "M.Tech in Computer Science Engineering",
  "M.Tech in Mechanical Engineering",
  "M.Tech in Electrical Engineering",
  "M.Tech in Civil Engineering",
  "M.Tech in Electronics and Communication Engineering",

  // Information Technology
  "Masters of Computer Applications (MCA)",
  "M.Sc in Information Technology",

  // Business and Management
  "Master of Business Administration (MBA)",
  "Master of Commerce (M.Com)",
  "Master of Economics (M.Econ)",

  // Arts and Humanities
  "Master of Arts (MA) in English Literature",
  "MA in History",
  "MA in Sociology",
  "MA in Political Science",

  // Science
  "Master of Science (M.Sc) in Physics",
  "M.Sc in Chemistry",
  "M.Sc in Mathematics",
  "M.Sc in Biotechnology",
  "M.Sc in Environmental Science",

  // Medical and Allied Sciences
  "Master of Pharmacy (M.Pharm)",
  "Master of Physiotherapy (MPT)",
  "Master of Science in Nursing (M.Sc Nursing)",

  // Fine Arts and Design
  "Master of Fine Arts (MFA)",
  "Master of Design (M.Des) in Fashion Design",
  "M.Des in Interior Design",

  // Law
  "Master of Laws (LLM)",
];

const Profile = () => {
  const dropdownRefs = useRef({});

  // Function to check if dropdown should open upwards
  const shouldOpenUpwards = (field) => {
    const inputElement = dropdownRefs.current[`${field}-input`];
    if (!inputElement) return false;

    const inputRect = inputElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - inputRect.bottom;
    const dropdownHeight = 200; // Same as max-h-[200px]

    return spaceBelow < dropdownHeight;
  };
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
  const [universitySuggestions, setUniversitySuggestions] = useState([]);
  const [showUniversitySuggestions, setShowUniversitySuggestions] =
    useState(false);
  const [showDropdowns, setShowDropdowns] = useState({
    program: false,
    specialisation: false,
    yearOfGraduation: false,
    semester: false,
  });
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
    // Only allow changes for university field (other fields are select-only)
    if (e.target.name === "university") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      fetchUniversities(e.target.value);
      setShowUniversitySuggestions(e.target.value.length > 0);
    }
  };

  // const fetchUniversities = async (query) => {
  //   if (!query) return;
  //   try {
  //     // const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
  //     // const response = await axios.get(`${backendURL}/university/data/${query}`);
  //     const response = await axios.get(`${BASE_URL}/university/data/${query}`);
  //     setUniversitySuggestions(response.data);
  //   } catch (error) {
  //     console.error("Error fetching universities:", error);
  //   }
  // };
  const fetchUniversities = async (query) => {
    if (!query) return;
    try {
      const response = await axios.get(`${BASE_URL}/university/data/${query}`);
      // Extract just the names from the university objects
      const universityNames = response.data.map((uni) => uni.name);
      setUniversitySuggestions(universityNames);
    } catch (error) {
      console.error("Error fetching universities:", error);
    }
  };

  const handleUniversitySelect = (university) => {
    setFormData({ ...formData, university });
    setShowUniversitySuggestions(false);
  };

  const handleSelectOption = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setShowDropdowns({ ...showDropdowns, [field]: false });
  };

  const toggleDropdown = (field) => {
    // Close all other dropdowns when opening one
    const newState = Object.keys(showDropdowns).reduce((acc, key) => {
      acc[key] = key === field ? !showDropdowns[key] : false;
      return acc;
    }, {});
    setShowDropdowns(newState);
    setShowUniversitySuggestions(false); // Ensure university suggestions are closed
  };

  const handleClickOutside = (e) => {
    // Close dropdowns when clicking outside
    if (!e.target.closest(".dropdown-container")) {
      setShowDropdowns({
        program: false,
        specialisation: false,
        yearOfGraduation: false,
        semester: false,
      });
      setShowUniversitySuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAvatarSelect = (url) => {
    setAvatarSelectedUrl(url);
    setShowAvatarModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) return setMessage("User not authenticated");

    try {
      setLoading(true);
      // const backendURL =
      //   import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

      const payload = {
        ...formData,
        _id: user._id,
        avatar: avatarSelectedUrl,
      };

      await axios.post(`${BASE_URL}/auth/complete-profile`, payload, {
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
              {/* University Field with Suggestions */}
              <div className="space-y-1 relative dropdown-container">
                <label className="text-sm font-medium text-gray-700">
                  University
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    required
                    placeholder="Search for your university"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db5602] focus:border-transparent"
                  />
                  {showUniversitySuggestions &&
                    universitySuggestions.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60  max-h-[200px] overflow-auto">
                        {universitySuggestions.map((uni, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleUniversitySelect(uni)}
                          >
                            {uni}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>

              {/* Program Field with Dropdown */}
              <div className="space-y-1 relative dropdown-container">
                <label className="text-sm font-medium text-gray-700">
                  Program
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db5602] focus:border-transparent bg-white cursor-pointer flex items-center truncate"
                    onClick={() => toggleDropdown("program")}
                  >
                    <span className="truncate flex-1">
                      {formData.program || "Select your program"}
                    </span>
                    <svg
                      className="h-5 w-5 text-gray-400 ml-2 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                  {showDropdowns.program && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[200px] overflow-y-auto">
                      {programs.map((program, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectOption("program", program)}
                        >
                          {program}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Specialisation Field with Dropdown */}
              <div className="space-y-1 relative dropdown-container">
                <label className="text-sm font-medium text-gray-700">
                  Specialisation
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db5602] focus:border-transparent bg-white cursor-pointer flex items-center truncate"
                    onClick={() => toggleDropdown("specialisation")}
                  >
                    <span className="truncate flex-1">
                      {formData.specialisation || "Select your specialisation"}
                    </span>
                    <svg
                      className="h-5 w-5 text-gray-400 ml-2 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                  {showDropdowns.specialisation && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 max-h-[130px] overflow-auto">
                      {Specialisations.map((spec, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleSelectOption("specialisation", spec)
                          }
                        >
                          {spec}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Semester Field with Dropdown */}
              <div className="space-y-1 relative dropdown-container">
                <label className="text-sm font-medium text-gray-700">
                  Semester
                </label>
                <div className="relative">
                  <div
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db5602] focus:border-transparent bg-white cursor-pointer flex justify-between items-center"
                    onClick={() => toggleDropdown("semester")}
                  >
                    {formData.semester || "Select your semester"}
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                  {showDropdowns.semester && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 max-h-[130px] overflow-auto">
                      {sem.map((semester, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleSelectOption("semester", semester)
                          }
                        >
                          {semester}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Year of Graduation Field with Dropdown */}
              <div className="space-y-1 relative dropdown-container">
                <label className="text-sm font-medium text-gray-700">
                  Graduation Year
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db5602] focus:border-transparent bg-white cursor-pointer flex justify-between items-center truncate overflow-x-auto whitespace-nowrap"
                    onClick={() => toggleDropdown("yearOfGraduation")}
                    ref={(el) =>
                      (dropdownRefs.current["yearOfGraduation-input"] = el)
                    }
                  >
                    {formData.yearOfGraduation || "Select graduation year"}
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                  {showDropdowns.yearOfGraduation && (
                    <div
                      className={`absolute z-10 ${
                        shouldOpenUpwards("yearOfGraduation")
                          ? "bottom-full mb-1"
                          : "mt-1"
                      } w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[130px] overflow-y-auto`}
                      ref={(el) =>
                        (dropdownRefs.current["yearOfGraduation-dropdown"] = el)
                      }
                    >
                      {years.map((year, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleSelectOption("yearOfGraduation", year)
                          }
                        >
                          {year}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
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
