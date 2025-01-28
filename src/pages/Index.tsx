import { motion } from "framer-motion";
import { Plus, ShieldCheck } from "lucide-react";
import { TaskList } from "@/components/TaskList";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { isAdmin, setIsAdmin } = useAdmin();
  const { toast } = useToast();

  const handleNewTask = () => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can add new tasks",
        variant: "destructive",
      });
      return;
    }
    // Add new task logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Tasks</h1>
              <p className="mt-2 text-sm text-gray-500">
                Manage and track your team's tasks efficiently
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <Button
                variant="outline"
                onClick={() => setIsAdmin(!isAdmin)}
                className="flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                {isAdmin ? "Admin Mode" : "User Mode"}
              </Button>
              <button
                onClick={handleNewTask}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
                  isAdmin
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isAdmin}
              >
                <Plus className="w-5 h-5 mr-2" />
                New Task
              </button>
            </div>
          </div>
        </motion.div>

        <TaskList />
      </div>
    </div>
  );
};

export default Index;