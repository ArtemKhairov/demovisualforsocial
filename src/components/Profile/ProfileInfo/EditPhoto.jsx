import React from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EditPhoto = (props) => {
  const propsForUpload = {
    beforeUpload: (file) => {
      if (file.type === "image/jpeg") {
        console.log(file);
        return file.type === "image/jpeg" ? true : Upload.LIST_IGNORE;
      } else if (file.type === "image/png") {
        console.log(file);
        return file.type === "image.png" ? true : Upload.LIST_IGNORE;
      }
      message.error(`${file.name} is not a jpeg or png file`);
    },
  };

  const onProfilePhotoSelected = (e) => {
    props.savePhoto(e.file);
    // console.log(e.file)
  };

  return (
    <>
      <Upload
        {...propsForUpload}
        customRequest={onProfilePhotoSelected}
        // action={(e) => console.log(e)}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
};

export default EditPhoto;
