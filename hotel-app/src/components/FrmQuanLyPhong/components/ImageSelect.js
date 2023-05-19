import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Button, Card, Carousel, CloseButton, Table } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import styled from "styled-components";
import { storage } from "../../../utils/firebase-config";
import { firebase } from "../../../utils/firebase-config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";

function ImageSelect({
  phongMoi,
  setShowImageSelect,
  onHandleChangeHinhAnhPhongFromTempPhong,
  setPhongMoi,
}) {
  const [hinhAnhMoi, setHinhAnhMoi] = useState([]);
  const [hinhAnhSelectedMoi, setHinhAnhSelectedMoi] = useState([]);
  const [filesUpload, setFilesUpload] = useState([]);
  const [previewHinhAnhSelectedMoi, setPreviewHinhAnhSelectedMoi] = useState(
    []
  );
  const inputFile = useRef(null);
  useEffect(() => {
    if (phongMoi && phongMoi.hinhAnhPhong && phongMoi.hinhAnhPhong.length > 0) {
      let temp = [...phongMoi.hinhAnhPhong];
      setHinhAnhMoi([...temp]);
    }
  }, [phongMoi]);
  const onButtonClick = () => {
    inputFile.current.click();
  };
  const handleFileUpload = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        let fileURL = URL.createObjectURL(files[i]);
        if (checkImageUploadExist(fileURL)) {
          setPreviewHinhAnhSelectedMoi((prev) => [...prev, fileURL]);
          setFilesUpload((prev) => [...prev, files[i]]);
        }
        // console.log(pr);
        // setHinhAnhSelectedMoi((prev) => [...prev, files[i]]);
        // const imageRef = ref(storage, `image/${files[i].name + v4()}`);
        // uploadBytes(imageRef, files[i]).then((res) => {
        //   console.log(res);
        // });
      }
    }
  };
  const checkImageUploadExist = (img) => {
    for (let i = 0; i < previewHinhAnhSelectedMoi.length; i++) {
      if (previewHinhAnhSelectedMoi[i] == img) {
        return false;
      }
    }
    return true;
  };
  const onHandleDeleteSelectHinh = (img) => {
    for (let i = 0; i < previewHinhAnhSelectedMoi.length; i++) {
      if (previewHinhAnhSelectedMoi[i] == img) {
        previewHinhAnhSelectedMoi.splice(i, 1);
        setPreviewHinhAnhSelectedMoi([...previewHinhAnhSelectedMoi]);
        setFilesUpload([]);
        setHinhAnhSelectedMoi([]);
        return;
      }
    }
  };
  const onHandleDeleteSelectedHinh = (img) => {
    for (let i = 0; i < hinhAnhMoi.length; i++) {
      if (hinhAnhMoi[i] == img) {
        hinhAnhMoi.splice(i, 1);
        setPhongMoi((prev) => {
          return { ...prev, hinhAnhPhong: [...hinhAnhMoi] };
        });
        return;
      }
    }
  };
  const onHandleSaveImage = async () => {
    if (filesUpload && filesUpload.length > 0) {
      onHandleUploadFilesToFirebase();
      setHinhAnhSelectedMoi([]);
      setPreviewHinhAnhSelectedMoi([]);
      setFilesUpload([]);
    }
    // let temp = [...hinhAnhMoi, ...hinhAnhSelectedMoi];
    // tempPhong.hinhAnhPhong = [...temp];
    // setHinhAnhMoi
    // console.log("in function", [...hinhAnhMoi, ...hinhAnhSelectedMoi]);

    // setHinhAnhSelectedMoi([]);
    // setFilesUpload([]);
    // setPreviewHinhAnhSelectedMoi([]);
  };
  // console.log("out function", [...hinhAnhMoi, ...hinhAnhSelectedMoi]);

  const onHandleUploadFilesToFirebase = () => {
    for (let i = 0; i < filesUpload.length; i++) {
      const storageRef = ref(storage, `files/${filesUpload[i].name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, filesUpload[i]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            onHandleChangeHinhAnhPhongFromTempPhong(downloadURL);
          });
        }
      );
    }
  };
  // console.log(hinhAnhSelectedMoi);
  return (
    <StyledContainer>
      <div className="container-styled">
        <div className="header">
          <h2 className="header-title">Chọn hình {phongMoi.tenPhong}</h2>
          <CloseButton onClick={() => setShowImageSelect(undefined)} />
        </div>
        <div className="content-container">
          <div className="images">
            <Carousel slide={true}>
              {hinhAnhMoi &&
                hinhAnhMoi.length > 0 &&
                hinhAnhMoi.map((img, index) => {
                  return (
                    <Carousel.Item>
                      <img
                        key={index}
                        className="d-block"
                        src={img}
                        alt={`Hình ${index}`}
                      />
                    </Carousel.Item>
                  );
                })}
              {previewHinhAnhSelectedMoi &&
                previewHinhAnhSelectedMoi.length > 0 &&
                previewHinhAnhSelectedMoi.map((img, index) => {
                  return (
                    <Carousel.Item>
                      <img
                        key={index}
                        className="d-block"
                        src={img}
                        alt={`Hình ${index}`}
                      />
                    </Carousel.Item>
                  );
                })}
            </Carousel>
          </div>
          <div className="image-added">
            {!hinhAnhMoi || hinhAnhMoi.length === 0 ? (
              <div className="list-image-selected">
                <Card>
                  <Card.Header>Thêm hình</Card.Header>
                  <Card.Body>
                    <div className="list-image">
                      {previewHinhAnhSelectedMoi &&
                        previewHinhAnhSelectedMoi.length > 0 &&
                        previewHinhAnhSelectedMoi.map((img, index) => {
                          return (
                            <div className="image-item" key={index}>
                              <AiFillCloseCircle
                                style={{
                                  color: "red",
                                  fontSize: "2rem",
                                  cursor: "pointer",
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                }}
                                onClick={() => onHandleDeleteSelectHinh(img)}
                              />
                              <img
                                key={index}
                                className="d-block"
                                src={img}
                                alt={`Hình ${index}`}
                              />
                            </div>
                          );
                        })}
                      <div className="add-image-btn">
                        <input
                          type="file"
                          id="file"
                          accept="image/png, image/jpeg"
                          ref={inputFile}
                          multiple={true}
                          onChange={handleFileUpload}
                          style={{ display: "none" }}
                        />
                        <button onClick={onButtonClick}>
                          <GrAdd />
                        </button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ) : (
              <div className="list-image-selected">
                <Card>
                  <Card.Header>
                    Danh sách hình ({hinhAnhMoi ? hinhAnhMoi.length : 0})
                  </Card.Header>
                  <Card.Body>
                    <div className="list-image">
                      {hinhAnhMoi &&
                        hinhAnhMoi.length > 0 &&
                        hinhAnhMoi.map((img, index) => {
                          return (
                            <div className="image-item" key={index}>
                              <AiFillCloseCircle
                                style={{
                                  color: "red",
                                  fontSize: "2rem",
                                  cursor: "pointer",
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                }}
                                onClick={() => onHandleDeleteSelectedHinh(img)}
                              />
                              <img
                                key={index}
                                className="d-block"
                                src={img}
                                alt={`Hình ${index}`}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>Thêm hình</Card.Header>
                  <Card.Body>
                    <div className="list-image">
                      {previewHinhAnhSelectedMoi.map((img, index) => {
                        return (
                          <div className="image-item" key={index}>
                            <AiFillCloseCircle
                              style={{
                                color: "red",
                                fontSize: "2rem",
                                cursor: "pointer",
                                position: "absolute",
                                top: 0,
                                right: 0,
                              }}
                              onClick={() => onHandleDeleteSelectHinh(img)}
                            />
                            <img
                              key={index}
                              className="d-block"
                              src={img}
                              alt={`Hình ${index}`}
                            />
                          </div>
                        );
                      })}
                      <div className="add-image-btn">
                        <input
                          type="file"
                          id="file"
                          accept="image/png, image/jpeg"
                          ref={inputFile}
                          multiple={true}
                          onChange={handleFileUpload}
                          style={{ display: "none" }}
                        />
                        <button onClick={onButtonClick}>
                          <GrAdd />
                        </button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )}
          </div>
        </div>
        <div className="btn-container">
          {filesUpload && filesUpload.length > 0 ? (
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                onHandleSaveImage();
              }}
            >
              Thêm
            </Button>
          ) : (
            <Button variant="secondary" type="submit" disabled={true}>
              Thêm
            </Button>
          )}
        </div>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
  position: absolute;
  top: 0;
  left: 0;
  /* z-index: 1; */
  display: flex;
  align-items: center;
  justify-content: center;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .container-styled {
    width: 50%;
    padding: 0.5rem;
    height: 90%;
    display: flex;
    flex-direction: column;
    text-align: start;
    background-color: #fff;
    position: relative;
    .header {
      display: flex;
      height: 10%;
      justify-content: space-between;
      .header-title {
      }
    }
    .content-container {
      width: 100%;
      height: 83%;
      overflow: scroll;
      display: flex;
      flex-direction: column;
      &::-webkit-scrollbar {
        width: 1px;
        &-thumb {
          background-image: linear-gradient(#373b44, #1095c1);
          width: 1px;
          border-radius: 1rem;
        }
      }
      .images {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        img {
          width: 100px;
          height: 300px;
          max-height: 100%;
          min-width: 100%;
          object-fit: contain;
          vertical-align: bottom;
        }
      }
      .image-added {
        margin-top: 0.5rem;
        .list-image-selected {
          .list-image {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            .image-item {
              position: relative;
              img {
                width: 200px;
                height: 100px;
                max-height: 100%;
                min-width: 100%;
                object-fit: contain;
                vertical-align: bottom;
              }
            }
            .add-image-btn {
              display: flex;
              width: 200px;
              height: 100px;
              align-items: center;
              justify-content: center;
              border-style: dashed;
              button {
                background-color: transparent;
                outline: none;
                border: none;
                svg {
                  font-size: 2.5rem;
                }
              }
            }
          }
        }
      }
      tbody {
        .row-selected {
          td {
            background-color: #9fbce7d1 !important;
          }
        }
      }
    }
    .btn-container {
      display: flex;
      justify-content: flex-end;
      height: 7%;
    }
  }
  .text-red {
    font-weight: bold;
    color: red !important;
  }
  .text-green {
    font-weight: bold;
    color: green !important;
  }
`;

export default ImageSelect;
