import { motion } from "framer-motion";
import { Check, Clock, Pencil, Tag, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "completed" | "in-progress" | "pending";
  dueDate: string;
  category?: string;
}

export const TaskCard = ({ 
  id, 
  title: initialTitle, 
  description: initialDescription, 
  priority, 
  status: initialStatus, 
  dueDate: initialDueDate,
  category: initialCategory = "general"
}: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [status, setStatus] = useState(initialStatus);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [category, setCategory] = useState(initialCategory);

  const priorityColors = {
    high: "bg-red-50 text-red-700",
    medium: "bg-yellow-50 text-yellow-700",
    low: "bg-green-50 text-green-700",
  };

  const statusIcons = {
    completed: <Check className="w-4 h-4 text-success-DEFAULT" />,
    "in-progress": <Clock className="w-4 h-4 text-yellow-600" />,
    pending: <Clock className="w-4 h-4 text-gray-400" />,
  };

  const categories = [
    "general",
    "development",
    "design",
    "marketing",
    "planning",
    "research"
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Task updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDelete = () => {
    toast({
      title: "Task deleted",
      description: "The task has been removed successfully.",
      variant: "destructive",
    });
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as "completed" | "in-progress" | "pending");
    toast({
      title: "Status updated",
      description: `Task marked as ${newStatus.replace("-", " ")}`
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="font-medium"
                placeholder="Task title"
              />
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="text-sm text-gray-500"
                placeholder="Task description"
              />
              <Input
                type="date"
                value={dueDate}
                onChange={handleDateChange}
                className="text-sm"
              />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}>Save</Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isEditing && (
            <>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleDelete}
                className="h-8 w-8 text-red-500 hover:text-red-600"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </>
          )}
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[priority]}`}>
            {priority}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="h-8 w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Tag className="w-4 h-4" />
            <span className="text-sm capitalize">{category}</span>
          </div>
        </div>
        <time className="text-sm text-gray-500">{dueDate}</time>
      </div>
    </motion.div>
  );
};