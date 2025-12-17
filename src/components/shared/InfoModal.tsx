import Modal from "./Modal";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  children?: React.ReactNode;
}

export default function InfoModal({
  isOpen,
  onClose,
  title,
  message,
  children,
}: InfoModalProps) {
  return (
    <Modal title={title || "Sucesso"} isOpen={isOpen} onClose={onClose}>
      {message && <p className="text-green-700">{message}</p>}

      {children ? (
        children
      ) : (
        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Ok
          </button>
        </div>
      )}
    </Modal>
  );
}