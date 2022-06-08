import React, { useCallback, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { isAutheticated } from "../../../auth/authhelper";
import axios from "axios";
import { API } from "../../../../data";
import { useHistory, useParams } from "react-router-dom";

function EditEmailTemplate() {
  const [template, setTemplate] = useState({
    title: "",
    content: "",
    subject: "",
    status: true,
  });

  const changeState = (newState) =>
    setTemplate((prevTemplate) => ({ ...prevTemplate, ...newState }));

  const { token } = isAutheticated();
  const { id } = useParams();
  const history = useHistory();

  const getTemplate = useCallback(async () => {
    let page = await axios.get(`${API}/api/emailTemplate/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTemplate(page.data);
  }, [id, token]);

  useEffect(() => {
    getTemplate();
  }, [getTemplate]);

  const { subject, content, status, title } = template;

  async function handleSubmit() {
    let res = await axios.patch(
      `${API}/api/emailTemplate/${id}`,
      {
        subject,
        content,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) history.push("/email-templates");
  }

  return (
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          {/* Page Title */}
          <div class="row">
            <div class="col-12">
              <div
                class="
                      page-title-box
                      d-flex
                      align-items-center
                      justify-content-between
                    "
              >
                <h4 class="mb-0">{title}</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="/dashboard">Dating App</a>
                    </li>
                    <li class="breadcrumb-item active">Email Template</li>
                    <li class="breadcrumb-item active">{title}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Save options */}
          <div class="row">
            <div class="col-12">
              <div class="form-group text-right">
                <button
                  type="button"
                  class="
                          btn btn-success btn-login
                          waves-effect waves-light
                          mr-3
                        "
                  onClick={handleSubmit}
                >
                  Save
                </button>

                <a href="/email-templates">
                  <button
                    type="button"
                    class="
                          btn btn-success btn-cancel
                          waves-effect waves-light
                          mr-3
                        "
                  >
                    Cancel
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Row 1 */}
          <div class="row">
            {/* Column Left */}
            <div class="col-lg-8">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <form>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                class="label-100"
                              >
                                Email Subject
                              </label>
                              <input
                                value={subject}
                                onChange={(e) =>
                                  changeState({ subject: e.target.value })
                                }
                                type="text"
                                class="form-control input-field"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                class="label-100"
                              >
                                Contents of the Email
                              </label>
                              <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onChange={(_event, editor) => {
                                  const data = editor.getData();
                                  changeState({ content: data });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Column right */}
            <div class="col-lg-4">
              {/* column 1 */}
              <div class="card">
                <div class="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Status*
                              </label>
                              <select
                                name="status"
                                value={status ? "Active" : "Inactive"}
                                onChange={(e) =>
                                  changeState({
                                    status: e.target.value === "success",
                                  })
                                }
                                className="form-control  input-field"
                              >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* column 2 */}

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <p>Reference</p>
                      <div className="table-responsive table-shoot">
                        <table className="table table-centered table-nowrap mb-0">
                          <thead class="thead-light">
                            <tr>
                              <th>Field Name</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>#first-name</td>
                              <td>First Name</td>
                            </tr>
                            <tr>
                              <td>#last-name</td>
                              <td>Last Name</td>
                            </tr>
                            <tr>
                              <td>#application-name</td>
                              <td>Name of the Channel</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmailTemplate;
