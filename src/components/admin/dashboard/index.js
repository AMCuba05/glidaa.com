import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Amplify, { API, graphqlOperation, Storage } from "aws-amplify";
import {
  listClientQuerys,
  listEmailJobs,
  listEmailTemplates,
} from "../../../graphql/queries";
import { updateEmailJob, createEmailJob, deleteEmailJob } from "../../../graphql/mutations";

import {
  onUpdateEmailTemplate,
  onUpdateClientQuery,
  onCreateClientQuery,
  onCreateEmailTemplate,
  onUpdateEmailJob,
} from "../../../graphql/subscriptions";
import { useHistory } from "react-router-dom";

import Toast from "react-bootstrap/Toast";
import awsExports from "../../../aws-exports";
Amplify.configure({
  ...awsExports,
  Analytics: {
    disabled: true,
  },
});

export default function Index() {
  const history = useHistory();

  const [loading, setLoading] = useState("Loading user detail ......");
  const [name, setName] = useState();
  const [emailJobs, setJobs] = useState([]);
  const [emailTemplates, setEmailTempaltes] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState({});
  const [limit, setLimit] = useState({});
  const [lstQueries, setQueries] = useState([]);

  const [selectedTempalte, setSelectedTempalte] = useState({});

  const [showProgress, setshowProgress] = useState(false);
  const [showToaster, setshowToaster] = useState(false);
  const showToast = () => setshowToaster(true);
  const hideToast = () => setshowToaster(false);

  const setStillLoading = () => {
    setLoading("Loading user detail ......");
  };
  const setLoadingComplete = () => {
    setLoading(null);
  };

  const attachQueryListeners = (lstQueries) => {
    API.graphql(graphqlOperation(onUpdateClientQuery)).subscribe({
      next: (data) => {
        let query = data.value.data.onUpdateClientQuery;
        let allQueries = lstQueries.filter((x) => x.id != query.id);
        allQueries.push(query);
        setQueries(allQueries);
        setSelectedQuery(query);
      },
    });

    API.graphql(graphqlOperation(onCreateClientQuery)).subscribe({
      next: (data) => {
        let query = data.value.data.onCreateClientQuery;
        let allQueries = lstQueries;
        allQueries.push(query);
        setQueries(allQueries);
        setSelectedQuery(query);
      },
    });
  };

  const attachEmailTemplateListeners = (emailTemplates) => {
    API.graphql(graphqlOperation(onUpdateEmailTemplate)).subscribe({
      next: (data) => {
        let template = data.value.data.onUpdateEmailTemplate;
        let newEmailTemalates = emailTemplates.filter(
          (x) => x.id != template.id
        );
        newEmailTemalates.push(template);
        setEmailTempaltes(newEmailTemalates);
        setSelectedTempalte(template);
      },
    });

    API.graphql(graphqlOperation(onCreateEmailTemplate)).subscribe({
      next: (data) => {
        let template = data.value.data.onCreateEmailTemplate;
        let newEmailTemalates = emailTemplates;
        newEmailTemalates.push(template);
        setEmailTempaltes(newEmailTemalates);
        setSelectedTempalte(template);
      },
    });
  };

  const attachEmailJobsListeners = () => {
    API.graphql(graphqlOperation(onUpdateEmailJob)).subscribe({
      next: (data) => {
        loadJobs(false);
      },
    });
  };
  const loadQueries = async () => {
    try {
      let res = await API.graphql(graphqlOperation(listClientQuerys));
      setQueries(res.data.listClientQuerys?.items);
      attachQueryListeners(res.data.listClientQuerys?.items);
    } catch {}
  };

  const loadTempaltes = async () => {
    try {
      let res = await API.graphql(graphqlOperation(listEmailTemplates));
      setEmailTempaltes(res.data.listEmailTemplates?.items);

      attachEmailTemplateListeners(res.data.listEmailTemplates?.items);
    } catch {}
  };

  const loadJobs = async (addlistener = true) => {
    if (addlistener) {
      setStillLoading();
    }
    try {
      let res = await API.graphql(graphqlOperation(listEmailJobs));
      setJobs(res.data.listEmailJobs?.items);
      if (addlistener) {
        attachEmailJobsListeners(res.data.listEmailJobs?.items);
      }
      setLoadingComplete();
    } catch {
      setLoadingComplete();
    }
  };

  useEffect(() => {
    const req = async () => {
      loadJobs();
      loadQueries();
      loadTempaltes();
    };

    req();
  }, []);

  const handleQueryChange = async (item) => {
    setSelectedQuery(item);
  };

  const handleTemplateChange = async (item) => {
    setSelectedTempalte(item);
  };

  const formSend = async (params = null) => {
    let url = `https://i6smufsvj6.execute-api.us-east-1.amazonaws.com/live/visit?getAllClient=${true}`;

    if (params) {
      var newStr = params.replace(/{/g, "~");
      let anotherString = newStr.replace(/}/g, "(");
      url += `&params=${anotherString}`;
    }
    try {
      let res = await fetch(url);

      let data = await res.json();
      let userData;
      if (data.body) {
        let dataBody = JSON.parse(data.body);

        return dataBody;
      }
    } catch {
      return null;
    }
  };

  const handleSaveClick = async () => {};

  const changeStatus = async (item, status) =>{
    hideToast();

    let payload = {
      id: item.id,     
      status: status
    };

    let res = await API.graphql(
      graphqlOperation(updateEmailJob, { input: payload })
    );
    let job = res.data.updateEmailJob;

    let newJobs = [...emailJobs];
    newJobs.find(x=>x.id).status = status;
    setJobs(newJobs);
    showToast();
  }

  const deleteJob = async (item) =>{
    hideToast();

    let payload = {
      id: item.id
    };

    let res = await API.graphql(
      graphqlOperation(deleteEmailJob, { input: payload })
    );
    let job = res.data.deleteEmailJob;

    let newJobs = [...emailJobs];
    newJobs = newJobs.filter(x=>x.id != job.id);
    setJobs(newJobs);
    showToast();
  }

  const createHandler = async (event) => {
    event.preventDefault();
    if (name && selectedQuery.id && selectedTempalte.id && limit) {
      hideToast();
      console.log(name, selectedQuery.id, selectedTempalte.id, limit);

      let clients = await formSend(selectedQuery.query);
      let emails = clients.map((x) => {
        return { email: x.email, isProcessed: false };
      });

      let payload = {
        name: name,
        queryId: selectedQuery.id,
        templateId: selectedTempalte.id,
        limit: limit,
        emails: JSON.stringify(emails),
        status: "active",
      };

      let res = await API.graphql(
        graphqlOperation(createEmailJob, { input: payload })
      );
      let job = res.data.createEmailJob;

      let newJobs = [...emailJobs];
      newJobs.unshift(job);
      setJobs(newJobs);
      showToast();
    }
  };

  const handleNewTab = (url) => {
    const win = window.open(url, "_blank");
    win.focus();
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <br></br>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Jobs</h4>
            <hr></hr>
          </Col>
        </Row>
        <Row>
          <Col xs lg="7">
            <Row>
              <Col lg="12">
                <h6>
                  Total: <Badge variant="primary">{emailJobs?.length}</Badge>,
                  Running:{" "}
                  <Badge variant="success">
                    {
                      emailJobs?.filter(
                        (x) => x.status == "active" || x.status == "processing"
                      ).length
                    }
                  </Badge>
                  , Pause:{" "}
                  <Badge variant="warning">
                    {emailJobs?.filter((x) => x.status == "pause").length}
                  </Badge>
                </h6>
              </Col>
              {/* <Col lg="3">
                <h6>
                  <Button variant="primary" size="sm" block>
                    Create{" "}
                  </Button>
                </h6>
              </Col> */}
            </Row>
            <div className="job-container">
              {loading && <h6>Loading ....</h6>}
              {!loading && emailJobs?.length < 1 && <h6>No job found!</h6>}
              {emailJobs && (
                <ListGroup>
                  {emailJobs?.map((x) => {
                    return (
                      <ListGroup.Item key={x.id}>
                        <Card
                          bg={"success"}
                          key={x.id}
                          text={"white"}
                          className="mb-2"
                        >
                          <Card.Header>
                            {x.name}{" "}
                            <Badge variant="primary">
                              Limit: {x.limit} / hour
                            </Badge>
                            &nbsp;
                            <Badge variant="warning">Status {x.status}</Badge>
                          </Card.Header>
                          <Card.Body>
                            <Card.Title>
                              <ProgressBar
                                variant="warning"
                                animated={x.status!='pause'}
                                now={
                                  JSON.parse(x.emails)?.filter(
                                    (x) => x.isProcessed
                                  ).length
                                }
                                max={JSON.parse(x.emails)?.length}
                              />
                              Progress:{" "}
                              {
                                JSON.parse(x.emails)?.filter(
                                  (x) => x.isProcessed
                                ).length
                              }
                              /{JSON.parse(x.emails)?.length}
                            </Card.Title>
                            <Card.Text>
                              {x.status == "active" ||
                              x.status == "processing" ? (
                                <Button
                                  onClick={()=> changeStatus(x, "pause")}
                                  variant="warning"
                                  size="sm"
                                >
                                  Pause
                                </Button>
                              ) : (
                                <Button
                                  onClick={()=> changeStatus(x, "active")}
                                  variant="warning"
                                  size="sm"
                                >
                                  Play
                                </Button>
                              )}
                              &nbsp;&nbsp;{" "}
                              <Button  onClick={()=> deleteJob(x)} size="sm" variant="danger">
                                Stop
                              </Button>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </div>
          </Col>
          <Col xs="12" lg="5">
            <h6>New job</h6>
            <Form onSubmit={createHandler}>
              <Card>
                <Card.Body className="">
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </Form.Group>

                  <Row>
                    <Col xs={12} md="auto">
                      <Dropdown value={selectedTempalte.id}>
                        <Dropdown.Toggle
                          variant="secondary"
                          id="dropdown-basic"
                        >
                          {selectedTempalte?.name
                            ? selectedTempalte?.name
                            : "Select template"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {emailTemplates &&
                            emailTemplates.map((item) => {
                              return (
                                <Dropdown.Item
                                  onClick={() => handleTemplateChange(item)}
                                  value={item.id}
                                  key={item.id}
                                >
                                  {item.name}
                                </Dropdown.Item>
                              );
                            })}
                        </Dropdown.Menu>
                        &nbsp;{" "}
                        <Button
                          onClick={() => handleNewTab("/email")}
                          variant="link"
                        >
                          <Badge variant="primary">+</Badge>
                        </Button>
                      </Dropdown>
                    </Col>
                    <Col xs={12} md="auto">
                      <Dropdown value={selectedQuery.id}>
                        <Dropdown.Toggle
                          variant="secondary"
                          id="dropdown-basic"
                        >
                          {selectedQuery?.name
                            ? selectedQuery?.name
                            : "Select query"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {lstQueries &&
                            lstQueries.map((item) => {
                              return (
                                <Dropdown.Item
                                  onClick={() => handleQueryChange(item)}
                                  value={item.id}
                                  key={item.id}
                                >
                                  {item.name}
                                </Dropdown.Item>
                              );
                            })}
                        </Dropdown.Menu>
                        &nbsp;{" "}
                        <Button
                          variant="link"
                          onClick={() => handleNewTab("/list")}
                        >
                          <Badge variant="primary">+</Badge>
                        </Button>
                      </Dropdown>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col xs={6} md="auto">
                      <Form.Group controlId="limit">
                        <Form.Label>Limit/hour</Form.Label>
                        <Form.Control
                          type="number"
                          onChange={(event) => {
                            setLimit(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <br></br>

              <Row>
                <Col xs={8} lg="8"></Col>
                <Col xs={4} lg="4">
                  <Button variant="primary" type="submit" size="sm" block>
                    Create
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <br></br>
                </Col>
              </Row>
              <Row>
                <Col>
                  {showProgress && (
                    <ProgressBar animated striped variant="success" now={100} />
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <br></br>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <Toast className="toast-style" show={showToaster} onClose={hideToast}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Success</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>Job saved successfully!</Toast.Body>
      </Toast>
    </div>
  );
}
