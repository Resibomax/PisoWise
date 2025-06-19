import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface CreateProjectProps {
    onClick: () => void
  }

{/*Create New Project Card Component*/}
export default function CreateProject({ onClick }: CreateProjectProps) {
    return (
        <Card className="bg-[#1B1212]/45 hover:bg-[#1B1212]/30 h-[186px] flexitems-center justify-center text-white font-[Ember] cursor-pointer" onClick={onClick}>
            <CardContent className="flex flex-col items-center ">
                <Plus className="w-8 h-8 mb-2" />
                Create New Project
            </CardContent>
        </Card>
    );
}