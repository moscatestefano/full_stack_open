import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { EntryFormValues } from "../AddEntry/index";
import AddEntryForm from "./index";

interface FormProps {
  modalOpen: boolean;
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onCancel, onSubmit, error }: FormProps) => (
  <Modal open={modalOpen} onCancel={onCancel} centered={false}>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onCancel} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;