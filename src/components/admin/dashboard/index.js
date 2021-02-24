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
import { updateEmailJob, createEmailJob } from "../../../graphql/mutations";

import {
  onUpdateEmailTemplate,
  onUpdateClientQuery,
  onCreateClientQuery,
  onCreateEmailTemplate,
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
  const [selectedLimit, setSelectedLimit] = useState({});
  const [lstQueries, setQueries] = useState([]);
  const [jobLimits, setJobLimits] = useState([
    { limit: 60, price: 30 },
    { limit: 120, price: 60 },
    ,
    { limit: 180, price: 100 },
  ]);

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

  const loadJobs = async () => {
    setStillLoading();
    try {
      let res = await API.graphql(graphqlOperation(listEmailJobs));
      setJobs(res.data.listEmailJobs?.items);
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

  const formSend = async () => {};

  formSend();

  const handleQueryChange = async (item) => {
    setSelectedQuery(item);
  };

  const handleTemplateChange = async (item) => {
    setSelectedTempalte(item);
  };

  const handleLimitChange = async (item) => {
    setSelectedLimit(item);
  };

  const handleSaveClick = async () => {};

  const createHandler = async (event) => {
    event.preventDefault();
    if (
      name &&
      selectedQuery.id &&
      selectedTempalte.id &&
      selectedLimit.limit
    ) {
      console.log(
        name,
        selectedQuery.id,
        selectedTempalte.id,
        selectedLimit.limit
      );

      let payload = {
        name: name,
        queryId: selectedQuery.id,
        templateId: selectedTempalte.id,
        limit: JSON.stringify({
          limit: selectedLimit.limit,
          price: selectedLimit.price,
        }),
        emails: null,
      };

      let res = await API.graphql(
        graphqlOperation(createEmailJob, { input: payload })
      );
      let job = res.data.createEmailJob;

      let newJobs = [...emailJobs];
      newJobs.push(job);
      setJobs(newJobs);
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
          <Col xs lg="5">
            <Row>
              <Col lg="9">
                <h6>
                  Total: <Badge variant="primary">{emailJobs?.length}</Badge>,
                  Running: <Badge variant="success">0</Badge>, Pause:{" "}
                  <Badge variant="warning">0</Badge>
                </h6>
              </Col>
              <Col lg="3">
                <h6>
                  <Button variant="primary" size="sm" block>
                    Create{" "}
                  </Button>
                </h6>
              </Col>
            </Row>
            <div className="job-container">
              {loading && <h6>Loading ....</h6>}
              {(!loading && emailJobs?.length<1) && <h6>No job found!</h6>}
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
                          <Card.Header>{x.name}</Card.Header>
                          <Card.Body>
                            <Card.Title>
                            <ProgressBar variant="warning" animated now={20} label={20} />
                              Progress: 100/500
                            
                            </Card.Title>
                            <Card.Text>
                            <Button variant="warning" size="sm">Pause</Button>&nbsp;&nbsp; <Button size="sm" variant="danger">Stop</Button>
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
          <Col xs="12" lg="7">
            <br></br>
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
                    <Col xs={4} md="auto">
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
                    <Col xs={4} md="auto">
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
                    <Col xs={4}>
                      <Dropdown value={selectedLimit.limit}>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                          {selectedLimit?.limit
                            ? selectedLimit?.limit + " / hour"
                            : "Limit per hour"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {jobLimits &&
                            jobLimits.map((item) => {
                              return (
                                <Dropdown.Item
                                  onClick={() => handleLimitChange(item)}
                                  value={item.limit}
                                  key={item.limit}
                                >
                                  Limit: {item.limit}, Price: {item.price}
                                </Dropdown.Item>
                              );
                            })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <br></br>

              <Row>
                <Col xs={8} lg="8"></Col>
                <Col xs={4} lg="4">
                  <Button variant="primary" type="submit" size="sm" block>
                    Save
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
        <Toast.Body>Template saved successfully!</Toast.Body>
      </Toast>
    </div>
  );
}
