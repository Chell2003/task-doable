import { Navbar } from "@/components/Navbar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600">
          Get in touch with our team for any questions or support needs.
        </p>
      </main>
    </div>
  );
};

export default Contact;