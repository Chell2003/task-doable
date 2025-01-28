import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/contexts/AdminContext";

// Define the task type to match TaskCardProps
type Task = {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "completed" | "in-progress" | "pending";
  dueDate: string;
  category?: string;
};

// Mock data - replace with actual API calls
const fetchTasks = async (): Promise<Task[]> => {
  return [
    {
      id: "1",
      title: "Design System Update",
      description: "Update the design system components",
      priority: "high" as const,
      status: "in-progress" as const,
      dueDate: "2024-03-20",
      category: "design"
    },
    {
      id: "2",
      title: "API Integration",
      description: "Integrate payment gateway API",
      priority: "medium" as const,
      status: "pending" as const,
      dueDate: "2024-03-25",
      category: "development"
    }
  ];
};

const EmployeeDashboard = () => {
  const { toast } = useToast();
  const { isAdmin } = useAdmin();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const stats = {
    total: tasks?.length || 0,
    pending: tasks?.filter(task => task.status === 'pending').length || 0,
    completed: tasks?.filter(task => task.status === 'completed').length || 0
  };

  const handleCreateTask = () => {
    if (!isAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only admins can create new tasks.",
        variant: "destructive",
      });
      return;
    }
    // Add task creation logic here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
          <Button onClick={handleCreateTask}>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Tasks</h3>
            <p className="text-3xl font-bold text-primary">{stats.total}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </Card>
        </div>

        {/* Tasks Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">My Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks?.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default EmployeeDashboard;