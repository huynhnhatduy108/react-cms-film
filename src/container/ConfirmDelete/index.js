import React from "react";
import { Popconfirm, Button } from "antd";

export default function ConfirmDeleteButton({ onConfirm, text = "Delete" }) {
  return (
    <Popconfirm
      placement="top"
      title="Are you sure to delete?"
      onConfirm={onConfirm}
      okText="Yes"
      cancelText="No"
      onCancel={e => e.stopPropagation()}
    >
      <Button
        onClick={(e) => {
          e.persist();
          e.stopPropagation();
        }}
        danger
        type="primary"
        size="small"
      >
        {text}
      </Button>
    </Popconfirm>
  );
}
