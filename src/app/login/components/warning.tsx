import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
  } from "@/components/ui/alert-dialog"
  
  interface WarningDialogProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;  // New prop for handling cancel
  }
  
  export function WarningDialog({ open, onConfirm, onCancel }: WarningDialogProps) {
    return (
      <AlertDialog open={open}>
        <AlertDialogContent className="bg-slate-800 border border-gray-500">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-100">Data Notice</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Please be advised that all data presented in this demonstration is simulated and does not represent actual information.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="space-x-2">
            <AlertDialogCancel 
              onClick={onCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={onConfirm}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              I Understand
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }