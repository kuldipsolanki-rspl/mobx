import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import Pagination from "../../common/Pagination";
import { IssueTrackerData } from "../InterfaceTypes";
import { Link } from "react-router-dom";
import SecureLS from "secure-ls";
import { useStore } from "../../../hooks/useStore";
import { observer } from "mobx-react-lite";

function ReportedIssues() {
  const {
    rootStore: { issueTrackerStore },
  } = useStore();

  useEffect(() => {
    issueTrackerStore.fetchReportedIssues();
    console.log(issueTrackerStore.reportedIssuesList);
  }, []);

  // const { reportedIssues } = useSelector((state: any) => state?.reportedIssues);

  const [showList, setShowList] = useState([]);
  const handleShowList = (list: any) => setShowList(list);
  const ls: any = new SecureLS();
  const fullName = ls?.get("username")?.data;

  return (
    <Fragment>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-overivew"
          role="tabpanel"
          aria-labelledby="pills-overivew-tab"
        >
          <div className="tab-content-body">
            <div className="table-responsive table_custom">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Issue</th>
                    <th>Reporter</th>
                    <th>Status</th>
                    <th>Assignee</th>
                    <th>Created Date</th>
                    <th>Last Modified Date</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                {issueTrackerStore.reportedIssuesList?.length !== 0 &&
                issueTrackerStore.reportedIssuesList !== undefined ? (
                  <tbody>
                    {showList?.map((data: any) => {
                      return (
                        <tr>
                          <td>
                            RCP1 - {data?.id} <br /> {data?.title}
                          </td>
                          <td>{fullName}</td>
                          <td>{data?.status}</td>
                          <td>{data?.assignedName}</td>
                          <td>
                            {moment(data?.createdAt)
                              .utc()
                              .format("DD/MM/YYYY hh:mm A")}
                          </td>
                          <td>
                            {moment(data?.updatedAt)
                              .utc()
                              .format("DD/MM/YYYY hh:mm A")}
                          </td>
                          <td className="text-center">
                            <Link to={`/Issue_Tracker/Reported/${data?.id}`}>
                              {data?.status == "CLOSED" ||
                              data?.status == "CANCELLED" ? (
                                <i className="ra ra-eye_open"></i>
                              ) : (
                                <i className="ra ra-edit"></i>
                              )}
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  <h5>No Data Found</h5>
                )}
              </table>
            </div>
            {issueTrackerStore.reportedIssuesList?.length !== 0 &&
            issueTrackerStore.reportedIssuesList?.length !== undefined ? (
              <Pagination
                data={issueTrackerStore.reportedIssuesList}
                itemPerPage={5}
                handleUpdate={handleShowList}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default observer(ReportedIssues);
