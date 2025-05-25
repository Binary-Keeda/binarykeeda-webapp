import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { Button, Chip, CircularProgress } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PsychologyIcon from "@mui/icons-material/Psychology";
import HubIcon from "@mui/icons-material/Hub";

const ICONS = [<PsychologyIcon />, <HubIcon />, <SchoolIcon />];

const CARDS = [
  {
    head: "Aptitude",
    description:
      "Sharpen your logic, math, and verbal reasoning to boost placement readiness.",
    points: ["Quantitative", "Verbal Ability", "Logical Reasoning"],
    link: "/user/practice/Aptitude",
    image: "/icons/hero.png",
  },
  {
    head: "Miscellaneous",
    description:
      "Explore puzzles, GK, and tricky challenges to test your intellect.",
    points: ["Puzzles", "General Knowledge", "Fun Challenges"],
    link: "/user/practice/Miscellaneous",
    image: "/icons/Home.png",
  },
  {
    head: "Core Subjects",
    description:
      "Master CS fundamentals like DSA, DBMS, OS, CN, and System Design.",
    points: ["DSA", "OS", "DBMS", "CN", "System Design"],
    link: "/user/practice/Core",
    image: "/icons/roadmap.png",
  },
];

function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[300px]">
          <CircularProgress />
          <span className="ml-3 text-gray-600 dark:text-gray-300">
            Loading practice modules...
          </span>
        </div>
      }
    >
      <section className="grid p-5 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CARDS.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col bg-white dark:bg-gray-800 rounded-[22px] shadow-lg hover:shadow-2xl shadow-gray-300 dark:shadow-black/40 transition-all duration-300 hover:scale-[1.02] overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <img
              className="h-[200px] object-contain w-full"
              src={card.image}
              alt={card.head}
            />

            {/* Short dark horizontal line */}
            <div className="flex justify-center my-2 mt-4">
              <hr className="w-[90%] border-t-[1.5px] border-gray-300 dark:border-gray-400" />
            </div>

            <div className="px-5 pb-5 flex flex-col justify-between flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600 dark:text-blue-400">
                  {ICONS[idx]}
                </span>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {card.head}
                </h2>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {card.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {card.points.map((pt, i) => (
                  <Chip
                    key={i}
                    label={pt}
                    size="small"
                    sx={{
                      fontSize: "0.7rem",
                      backgroundColor: "#fff7ed", // light orange
                      color: "#f97316",
                      fontWeight: 500,
                    }}
                  />
                ))}
              </div>

              <Link to={card.link}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ fontWeight: "bold", borderRadius: "8px" }}
                >
                  Start Solving
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </Suspense>
  );
}

export default PracticePage;
