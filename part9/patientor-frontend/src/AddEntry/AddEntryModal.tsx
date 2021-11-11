import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { EntryFormValues } from "./index";
import AddEntryForm from "./index";

interface FormProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: FormProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false}>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;