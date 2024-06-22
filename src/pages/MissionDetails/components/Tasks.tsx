import Disclosure from "@/components/Disclosure";
import { Button } from "@headlessui/react";

interface ITasksProps {
  tasks: TTaskModel[];
}

function Tasks({ tasks }: ITasksProps) {
  return (
    <div>
      <div className="flex flex-col gap-y-4">
        {tasks.map((task, index) => {
          return <Disclosure key={index} title={task.name} description={task.description} />;
        })}
      </div>
      <div className="flex justify-center">
        <Button className="py-1 px-4 h-[44px] w-full rounded-lg bg-primary-color text-white font-bold text-sm mt-6">Login</Button>
      </div>
      <div className="w-full h-[1px] bg-gray-300 mt-6" />
    </div>
  );
}

export default Tasks;
