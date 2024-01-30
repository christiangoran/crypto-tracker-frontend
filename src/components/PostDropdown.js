import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/PostDropdown.module.css";

//----------------------------------------------------------------

// The forwardRef is for passing ref through a component
//to one of its children.
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  //The three dots icon
  <i
    className="fas fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));
//----------------------------------------------------------------

//The handleEdit and handleDelete functions in the parent component
//are called.
export const PostDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left´">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu className={`text-center ${styles.DropdownBg}`}>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
