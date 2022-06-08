import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { API } from "../../../../data";
import { isAutheticated } from "../../../auth/authhelper";

function Page() {
  const [page, setPage] = useState([]);
  const { token } = isAutheticated();

  const getServices = useCallback(async () => {
    let pages = await axios.get(`${API}/api/page/view_page`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(pages);
    setPage(pages.data.Page);
  }, [token]);

  useEffect(() => {
    getServices();
  }, [getServices]);

  function convertDate(inputFormat) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), monthNames[d.getMonth()], d.getFullYear()].join(
      " "
    );
  }

  async function handleDelete(id) {
    let res = await axios.delete(`${API}/api/page/delete_page/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res) {
      window.location.reload();
    }
  }

  return (
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
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
                <h4 class="mb-0">Configuration - Pages</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="/dashboard">Dating App</a>
                    </li>
                    <li class="breadcrumb-item">Configuration - Pages</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div class="row ml-0 mr-0 mb-10">
                    <div class="col-sm-12 col-md-6" />
                    <div class="col-sm-12 col-md-6">
                      <div class="dropdown d-block">
                        <a href="/page/add">
                          <button
                            type="button"
                            class="
                                btn btn-primary
                                add-btn
                                waves-effect waves-light
                                float-right
                              "
                          >
                            <i class="fa fa-plus" aria-hidden="true" /> Add New
                            Page
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive table-shoot">
                    <table class="table table-centered table-nowrap mb-0">
                      <thead class="thead-light">
                        <tr>
                          <th>Title</th>
                          <th>Added On</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {page.map((el) => {
                          return (
                            <tr>
                              <td>{el.title}</td>
                              <td>{convertDate(el.createdAt)}</td>
                              <td>
                                {" "}
                                <a href={`/page/edit/${el._id}`}>
                                  <button
                                    type="button"
                                    class="
                                    btn btn-primary btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  "
                                  >
                                    Edit
                                  </button>
                                </a>
                                <button
                                  type="button"
                                  class="
                                    btn btn-danger btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  "
                                  id="sa-params"
                                  onClick={() => handleDelete(el._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div class="row mt-20">
                    <div class="col-sm-12 col-md-6 mb-20">
                      <div
                        class="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing 1 to 10 of 57 entries
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-6">
                      <div
                        class="
                            dataTables_paginate
                            paging_simple_numbers
                            float-right
                          "
                      >
                        <ul class="pagination">
                          <li
                            class="
                                paginate_button
                                page-item
                                previous
                                disabled
                              "
                          >
                            <a
                              href="/"
                              aria-controls="datatable"
                              data-dt-idx="0"
                              tabindex="0"
                              className="page-link"
                            >
                              Previous
                            </a>
                          </li>

                          <li class="paginate_button page-item active">
                            <a
                              href="/"
                              aria-controls="datatable"
                              data-dt-idx="1"
                              tabindex="0"
                              className="page-link"
                            >
                              1
                            </a>
                          </li>

                          <li class="paginate_button page-item">
                            <a
                              href="/"
                              aria-controls="datatable"
                              data-dt-idx="2"
                              tabindex="0"
                              className="page-link"
                            >
                              2
                            </a>
                          </li>

                          <li class="paginate_button page-item">
                            <a
                              href="/"
                              aria-controls="datatable"
                              data-dt-idx="3"
                              tabindex="0"
                              className="page-link"
                            >
                              3
                            </a>
                          </li>

                          <li class="paginate_button page-item next">
                            <a href="/" tabindex="0" className="page-link">
                              Next
                            </a>
                          </li>
                        </ul>
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

export default Page;
