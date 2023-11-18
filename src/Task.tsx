import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

interface TaskProps {
  task: string;
  category: string;
  completed: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
}

const Task: React.FC<TaskProps> = ({
  task,
  category,
  completed,
  onDelete,
  onToggleComplete,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <li
      className="flex justify-between items-center mb-2 border p-3 rounded hover:border-sky-400"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <input
          type="checkbox"
          onChange={onToggleComplete}
          checked={completed}
          className="mr-2"
        />
        <span className={completed ? "line-through text-gray-400" : ""}>
          {task}
        </span>{" "}
      </div>
      {isHovered && (
        <div className="flex ">
          {/* <span className="ml-2 cat text-gray-500 bg-blue-400 rounded px-2 text-sm">{category}</span> */}

          <button
            onClick={onDelete}
            className=" text-red-500 self-end rounded-full"
          >
            <MdDelete size={25} />
          </button>
        </div>
      )}
    </li>
  );
};

export default Task;
