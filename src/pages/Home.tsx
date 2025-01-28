import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Doable 
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Streamline your project management with our comprehensive solution
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Project Management</h3>
                <p className="text-gray-600">
                  Efficiently manage your projects with our intuitive tools
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
                <p className="text-gray-600">
                  Work together seamlessly with your team members
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Task Tracking</h3>
                <p className="text-gray-600">
                  Keep track of tasks and monitor progress in real-time
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Home;