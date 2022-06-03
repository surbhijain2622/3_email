import React from "react";
import axios from "../utils/axios";
import { requests } from "../utils/requests";
import "date-fns";
import { Link } from "react-router-dom";
import Session from "../../service/session";
import FrequencySelector from "./FrequencySelector";
import {
  showLoader,
  hideLoader,
} from "../../store/modules/application/app.action";

export default class ChainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      chainname: "",
      subject: "",
      emailgroupid: {
        _id: "",
        groupName: "",
      },
      frequency: {
        period: "Weekly",
        month: 0,
        day: 0,
        dayOfMonth: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      messageid: {
        _id: "",
        text: "",
        attachments: [],
      },
      emailGroups: [],
      status: false,
      currDate: new Date(),
      attachedNewFiles: [],
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.submitChainData = this.submitChainData.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(showLoader());
    async function fetchChainData(chainId) {
      const request = await axios.get(
        requests["fetchChainById"] + "/" + chainId
      );
      return request;
    }

    async function fetchEmailGroups() {
      // this.props.dispatch(showLoader());
      const request = await axios.get(requests["fetchEmailGroups"]);
      return request;
    }

    fetchEmailGroups()
      .then((res) => {
        const data = res.data;
        this.setState({ emailGroups: data }, () => {
          console.log(this.state.emailGroups);
          if (!this.state.emailgroupid && this.state.emailGroups) {
            this.setState({
              emailgroupid: this.state.emailGroups[0],
            });
          }
        });
        this.props.dispatch(hideLoader());
      })
      .catch((e) => {
        console.log(e);
        this.setState({ emailGroups: [] }, () => {
          console.log(this.state.emailGroups);
        });
        this.props.dispatch(hideLoader());
      });

    console.log(this.props.chainId);
    if (this.props.chainId) {
      fetchChainData(this.props.chainId)
        .then((res) => {
          const data = res.data.chaindata;
          this.setState(data, () => {
            console.log(this.state);
            var date = new Date();
            date.setHours(data.frequency.hours, data.frequency.minutes);
            if (data.frequency.period != "Recurring") {
              this.setState({
                currDate: date,
              });
            }
          });
          this.props.dispatch(hideLoader());
        })
        .catch((e) => {
          console.log(e);
          this.setState({}, () => {
            console.log(this.state);
          });
          this.props.dispatch(hideLoader());
        });
    }
  }

  submitChainData(futureStatus) {
    this.props.dispatch(showLoader());
    var fd = new FormData();
    const chainData = this.state;
    for (var i = 0; i < chainData.attachedNewFiles.length; i++) {
      fd.append("files", chainData.attachedNewFiles[i]);
    }
    var payload = {
      _id: chainData._id,
      chainname: chainData.chainname,
      subject: chainData.subject,
      userid: Session.getObject("userinfo")["_id"],
      emailgroupid: chainData.emailgroupid._id,
      messageid: {
        _id: chainData.messageid._id,
        text: chainData.messageid.text,
        attachments: chainData.messageid.attachments,
      },
      frequency: chainData.frequency,
      status: false,
    };

    console.log(JSON.stringify(payload));
    if (futureStatus) payload.status = true;
    fd.append("body", JSON.stringify(payload));

    // console.log(payload, fd);

    var requrl;
    var reqmethod;
    // CALL PUT REQUEST IS ID EXISTS
    if (chainData._id) {
      requrl = requests["updateChain"] + "/" + chainData._id;
      reqmethod = "put";
    } else {
      requrl = requests["createNewChain"];
      reqmethod = "post";
    }
    console.log(requrl);

    async function submitChainData() {
      const request = await axios({
        method: reqmethod,
        url: requrl,
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return request;
    }

    submitChainData()
      .then((res) => {
        const data = res.data.chaindata;
        this.setState(data, () => {
          console.log(this.state);
          window.location.href = "/chains/manage";
        });
        this.props.dispatch(hideLoader());
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong");
        this.setState({}, () => {
          console.log(this.state);
        });
        this.props.dispatch(hideLoader());
      });
  }

  handleChainNameChange(event) {
    this.setState({
      chainname: event.target.value,
    });
  }

  handleSubjectChange(event) {
    this.setState({
      subject: event.target.value,
    });
  }

  handleMessageTextChange(event) {
    this.setState({
      messageid: { ...this.state.messageid, text: event.target.value },
    });
    var textarea = event.target;
    textarea.scrollTop = textarea.scrollHeight;
  }

  setFrequency(newFrequency) {
    this.setState({ frequency: newFrequency });
  }

  handleGroupChange(event) {
    this.setState(
      {
        emailgroupid: { ...this.state.emailgroupid, _id: event.target.value },
      },
      () => {
        console.log(this.state);
      }
    );
  }

  handleFileChange(event) {
    const files = event.target.files;
    if (files.length > 3) {
      alert("Cannot upload more than 3 files");
      return;
    }
    this.setState(
      {
        attachedNewFiles: files,
      },
      () => {
        console.log(this.state);
      }
    );
  }

  truncate(str) {
    return str.length > 15 ? str.substring(0, 20) + "..." : str;
  }

  render() {
    return (
      <div className="inner">
        <h1>{this.props.title} Chain</h1>
        <div className="form-container">
          <form id="chain-form">
            <div className="form-group">
              <label>Chain Name</label>
              <input
                type="text"
                className="text-input"
                value={this.state.chainname}
                onChange={this.handleChainNameChange.bind(this)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Group</label>
              <select
                className="freq-drop email-group-drop"
                value={this.state.emailgroupid._id}
                onChange={this.handleGroupChange.bind(this)}
              >
                {this.state.emailGroups.map((emailGroup, index) => (
                  <option key={index} value={emailGroup._id}>
                    {emailGroup.groupName}
                  </option>
                ))}
              </select>
              <div className="add-icon">
                <Link to="/email/add" title="Add new email Group">
                  <i className="material-icons" style={{ fontSize: "1.5rem" }}>
                    add_circle
                  </i>
                </Link>
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                className="text-input"
                value={this.state.subject}
                onChange={this.handleSubjectChange.bind(this)}
                required
              />
            </div>
            <div className="form-group">
              <label>Frequency</label>
              <FrequencySelector
                frequency={this.state.frequency}
                setFrequency={this.setFrequency.bind(this)}
              />
            </div>
            <div className="form-group">
              <label>Email Body</label>
              <div className="textarea-cont">
                <textarea
                  rows="15"
                  cols="75"
                  className="textarea-input"
                  value={this.state.messageid.text}
                  onChange={this.handleMessageTextChange.bind(this)}
                ></textarea>
                <div className="attachments">
                  {this.state.attachedNewFiles.length == 0 &&
                    this.state.messageid.attachments.map(
                      (attachment, index) => {
                        return (
                          <div className="attach-file" key={index}>
                            <h5>{this.truncate(attachment.originalname)}</h5>
                          </div>
                        );
                      }
                    )}
                  {this.state.attachedNewFiles.length > 0 &&
                    Array.from(this.state.attachedNewFiles).map(
                      (attachment, index) => {
                        console.log(attachment.name);
                        return (
                          <div className="attach-file">
                            <h5>{this.truncate(attachment.name)}</h5>
                            {/* <a className="remove-file" onClick={this.removeFile.bind(this, index)}>
                                                    <span className="material-icons">close</span>
                                                </a> */}
                          </div>
                        );
                      }
                    )}
                </div>
                <div className="attach-pin">
                  <input
                    type="file"
                    name="attachment"
                    id="attachment"
                    onChange={this.handleFileChange}
                    multiple
                  />
                  <label for="attachment">
                    <span className="material-icons">attach_file</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="submit-sec">
              <div className="submit-cont">
                <a
                  className="save-btn"
                  onClick={() => this.submitChainData(false)}
                >
                  Save
                </a>
              </div>
              <div className="submit-run-cont">
                <a
                  className="save-btn"
                  onClick={() => this.submitChainData(true)}
                >
                  Save & Run
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// {
//     "_id": "60d6f1a753c1325a2c01e523",
//     "chainname": "Test Chain 1",
//     "userid": "60d6c141db2fbb2c4c3e0256",
//     "emailgroupid": {
//         "to": [
//             "user1@gmail,com"
//         ],
//         "cc": [
//             "user3@gmail,com",
//             "user4@gmail.com"
//         ],
//         "bcc": [
//             "user5@gmail,com"
//         ],
//         "_id": "60d6cadfd0bbb7331fa23564",
//         "owner": "60d6c141db2fbb2c4c3e0256",
//         "groupName": "Test Group Beta",
//         "__v": 0
//     },
//     "messageid": {
//         "attachments": [],
//         "_id": "60d6f1a753c1325a2c01e522",
//         "text": "Hello",
//         "__v": 0
//     },
//     "frequency": "Weekly",
//     "status": false,
//     "__v": 0
// }

// [
//     {
//       fieldname: 'files',
//       originalname: 'Dekisugi.jpg',
//       encoding: '7bit',
//       mimetype: 'image/jpeg',
//       destination: 'uploads/',
//       filename: '4eaaa5ae4aa4f211713f34f35117630f',
//       path: 'uploads/4eaaa5ae4aa4f211713f34f35117630f',
//       size: 32796
//     }
//   ]

// '{
//     "_id": "60d6f1a753c1325a2c01e523",
//     "chainname": "Test Chain 1",
//     "userid": "60d6a55233a1d24e8c984df5",
//     "emailgroupid": "60d6cadfd0bbb7331fa23564",
//     "messageid": {
//         "_id":"60d6f1a753c1325a2c01e522",
//         "text":"Helooooooooo"
//     }
//     "frequency": {
//         "period": "Weekly",
//         "day": "Monday",
//         "date": "01/01",
//         "time": "23:59",
//         "dateofMonth": "1",
//         "repeat": ""
//     },
//     "status": false,
// }'
