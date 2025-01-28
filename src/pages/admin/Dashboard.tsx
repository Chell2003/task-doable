import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { TaskCard } from "@/components/TaskCard";
import { TaskFilters } from "@/components/TaskFilters";
import { Plus, Users, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the task type
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
      title: "Review Project Proposals",
      description: "Review and approve incoming project proposals",
      priority: "high" as const,
      status: "pending" as const,
      dueDate: "2024-03-20",
      category: "management"
    },
    {
      id: "2",
      title: "Team Performance Review",
      description: "Conduct quarterly performance reviews",
      priority: "medium" as const,
      status: "in-progress" as const,
      dueDate: "2024-03-25",
      category: "hr"
    }
  ];
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const handleCreateTask = () => {
    toast({
      title: "Coming Soon",
      description: "Task creation functionality will be implemented soon.",
    });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
    return matchesSearch && matchesPriority && matchesCategory;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const pendingTasks = tasks.filter(task => task.status === "pending").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button onClick={handleCreateTask}>
              <Plus className="mr-2" />
              Create Task
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-gray-600">Total Tasks</p>
                  <p className="text-2xl font-bold">{totalTasks}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-8 w-8 text-success" />
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold">{completedTasks}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Clock className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold">{pendingTasks}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <TaskFilters
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />

          {/* Task List */}
          {isLoading ? (
            <div className="text-center py-8">Loading tasks...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  {...task}
                />
              ))}
              {filteredTasks.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No tasks found matching your criteria
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;