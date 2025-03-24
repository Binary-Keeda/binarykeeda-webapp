import { Link } from 'react-router-dom';
import roadmaps from './data/roadmaps.json';
import UserDashboard from './Userdashboard';
 function RoadmapGrid() {
  return (
    <div className="p-5">
      {roadmaps.length === 0 ? (
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-gray-500 text-lg">No roadmaps available at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {roadmaps.map((i, index) => (
            <Link
              key={index}
              className="relative rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              to={i.material}
            >
              <img
                className="w-full h-[200px] object-cover"
                src={i.image}
                alt={i.title || "Roadmap"}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
                <p className="text-white font-semibold text-lg">{i.title}</p>
                <p className="text-gray-300 text-sm">{i.time}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


export default UserDashboard(RoadmapGrid);
