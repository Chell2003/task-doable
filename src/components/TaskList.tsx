import { motion } from "framer-motion";
import { TaskCard } from "./TaskCard";
import { useState } from "react";
import { TaskFilters } from "./TaskFilters";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const tasks = [
  {
    id: "1",
    title: "Design System Implementation",
    description: "Create and implement a consistent design system across all product interfaces",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-03-15",
    category: "design"
  },
  {
    id: "2",
    title: "User Research Analysis",
    description: "Analyze recent user research data and create actionable insights",
    priority: "medium",
    status: "pending",
    dueDate: "2024-03-20",
    category: "research"
  },
  {
    id: "3",
    title: "Documentation Update",
    description: "Update technical documentation for recent feature releases",
    priority: "low",
    status: "completed",
    dueDate: "2024-03-10",
    category: "development"
  }
] as const;

export const TaskList = () => {
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredTasks = tasks.filter(task => {
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <TaskFilters
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </motion.div>
    </div>
  );
};