import { useModalStore } from "@/app/store/modal-store";
import { useProjectStore } from "@/app/store/projectsPage/projectStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";

export function ConfirmationModal() {
  const { isConfirmDeleteModalOpen, closeConfirmDeleteModal } = useModalStore();
  const router = useRouter();
  const params = useParams();
  const { deleteProject, getProjectById } = useProjectStore();
  const project = params.id ? getProjectById(params.id as string) : null;

  const handleDelete = () => {
    if (project) {
      deleteProject(project.id);
      closeConfirmDeleteModal();
      router.push("/projects");
    }
  };

  return (
    <Dialog
      open={isConfirmDeleteModalOpen}
      onOpenChange={closeConfirmDeleteModal}
    >
      <DialogContent className="sm:max-w-md bg-[#1B1212] text-white border-none">
        <DialogHeader className="text-left">
          <DialogTitle className="font-[Ember] text-[20px] md:text-[24px]">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="font-roboto-light text-[14px] md:text-[18px]">
            You are about to permanently delete this project. This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row w-full justify-end">
          <Button
            className="bg-transparent border-white border-1 rounded-[12px] hover:bg-white hover:text-black"
            onClick={closeConfirmDeleteModal}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#E73648] rounded-[12px] hover:bg-[#EC5B69]"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
