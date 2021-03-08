import React, { useState, useEffect } from "react";
import { Input } from "antd";

const ProfileStatusAntd = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <>
      {!editMode && (
        <div>
          <h4 onDoubleClick={activateEditMode}>
            {props.status || "У пользователя нет статуса"}
          </h4>
        </div>
      )}
      {editMode && (
        <div>
          <Input
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
            onChange={onStatusChange}
          />
        </div>
      )}
    </>
  );
};

export default ProfileStatusAntd;
