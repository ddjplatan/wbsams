import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  FloatingLabel,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const NewsModal = (props) => {
  const { data, onHide } = props;
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const userType = userInfo.user.userType;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [reload, setReload] = useState(false);

  const [newsData, setNewsData] = useState({
    _id: "",
    title: "",
    details: "",
    img: null,
  });

  const postNews = async () => {
    try {
      const formData = new FormData();

      Object.keys(newsData).forEach((key) => {
        if (key !== "img") {
          formData.append(key, newsData[key]);
        }
        if (key === "img") {
          formData.append("img", newsData.img);
        }
      });

      const url = "http://localhost:3001/api/news";
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(url, formData, { headers }).then((response) => {
        setNewsData({
          _id: "",
    title: "",
    details: "",
    img: null,
        });
        onHide();
        toast.success("Successfully added news.");
        location.reload();
      });
    } catch (error) {
      console.log(error.message)
      toast.error(error?.data?.message || error.error);
    }
  };

  const updateNews = async (id) => {
    console.log('updateNews client')
    try {
      const url = `http://localhost:3001/api/news/${id}`;
      const response = await axios.put(url, newsData, { headers });
      if (response.status === 200) {
        onHide();
        toast.success("Successfully updated news")
        location.reload();
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteNews = async (id) => {
    try {
      const url = `http://localhost:3001/api/news/${id}`;
      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        onHide();
        toast.success("Successfully deleted news")
        location.reload();
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteNewss = async (id) => {
    try {
      const url = `http://localhost:3001/api/news/`;
      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    if (data) {
      setNewsData({
        _id: data._id,
        title: data.title,
        details: data.details,
      });
    } else {
      setNewsData({
        _id: "",
        title: "",
        details: "",
        img: null
      });
    }
  }, [data]);

  const newsHandleChange = (e) => {
    setNewsData({
      ...newsData,
      [e.target.name]: e.target.value,
    });
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
      setNewsData((prevNewsData) => ({
        ...prevNewsData,
        img: file,
      }));
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          {!data && "Add "}News
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body className="px-5">
          <Row>
            <Col>
              <div className="d-flex justify-content-center align-items-center mb-4">
                {selectedFile ? (
                  <Image
                    src={selectedFile}
                    alt="Preview"
                    rounded
                    height={350}
                    width={350}
                  />
                ) : data ? (
                  <Image
                    src={
                      data.img
                        ? `http://localhost:3001/${data.img}`
                        : "http://localhost:3001/defaults/default-questionmark.jpg"
                    }
                    alt="Preview"
                    rounded
                    height={350}
                    width={350}
                  />
                ) : (
                  <Image
                    src="http://localhost:3001/defaults/default-questionmark.jpg"
                    rounded
                    height={350}
                    width={350}
                  />
                )}
              </div>

              <FloatingLabel className="mb-2" controlId="img" label="Image">
                <Form.Control
                  type="file"
                  name="img"
                  placeholder={selectedFile}
                  value={""}
                  onChange={handleFileChange}
                  disabled={userType === "user"}
                />
              </FloatingLabel>
              <FloatingLabel className="mb-2" controlId="title" label="Title">
                <Form.Control
                  type="text"
                  name="title"
                  value={newsData.title}
                  onChange={newsHandleChange}
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="details"
                label="Details"
              >
                <Form.Control
                  as="textarea"
                  type="text"
                  name="details"
                  value={newsData.details}
                  onChange={newsHandleChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {userType !== "user" && (
            <Col className="d-flex justify-content-end">
              {data ? (
                <>
                  <Button
                    onClick={() => {
                      updateNews(newsData._id);
                    }}
                    className="ms-2"
                    variant="warning"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      deleteNews(newsData._id);
                    }}
                    className="ms-2"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={postNews} variant="success">
                    Submit
                  </Button>
                </>
              )}
            </Col>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewsModal;
