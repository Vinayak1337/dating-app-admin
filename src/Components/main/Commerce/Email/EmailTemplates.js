import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { API } from "../../../../data";
import { isAutheticated } from "../../../auth/authhelper";

function EmailTemplates() {
  const { token } = isAutheticated();
  const [emails, setEmails] = useState([]);

  const getEmailTemplates = useCallback(async () => {
    let res = await axios.get(`${API}/api/emailTemplate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setEmails(res.data);
  }, [token]);

  useEffect(() => {
    getEmailTemplates();
  }, [getEmailTemplates]);

  async function handleButton(status = true, id) {
    let res = await axios.patch(
      `${API}/api/emailTemplate/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) window.location.reload();
  }

  return (
    <div className="main-content">
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
                <h4 class="mb-0">Email Templates</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="/dashboard">Dating App</a>
                    </li>
                    <li class="breadcrumb-item">Email Templates</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div class="table-responsive table-shoot">
                    <table class="table table-centered table-nowrap mb-0">
                      <thead class="thead-light">
                        <tr>
                          <th>Title</th>
                          <th>Update On</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {emails.map((el) => {
                          return (
                            <tr key={el._id}>
                              <td>{el.title}</td>
                              <td>
                                {moment(el.updatedAt).format(
                                  "Do MMMM YYYY, hh:mm a"
                                )}
                              </td>
                              <td>
                                <span
                                  class={`
                                  badge badge-pill ${
                                    el.status ? "badge-success" : "badge-danger"
                                  }
                                  font-size-12
                                  `}
                                >
                                  {el.status ? "Live" : "Suspended"}
                                </span>
                              </td>
                              <td>
                                <a href={`/email-templates/edit/${el._id}`}>
                                  <button
                                    type="button"
                                    class="btn btn-primary btn-sm waves-effect waves-light btn-table ml-2"
                                  >
                                    Edit
                                  </button>
                                </a>

                                <button
                                  onClick={() =>
                                    handleButton(!el.status, el._id)
                                  }
                                  type="button"
                                  class={`
                                    btn ${
                                      el.status ? "btn-danger" : "btn-success"
                                    } btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                `}
                                  id="sa-params"
                                >
                                  {el.status ? "Suspend" : "Activate"}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
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
  );
}

export default EmailTemplates;
