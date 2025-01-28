import { Navbar } from "@/components/Navbar";

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-gray-600">
          Discover the range of project management services we offer to help your team succeed.
        </p>
      </main>
    </div>
  );
};

export default Services;