import React, { useEffect, useState } from "react";
import Task from "./../../Common/Task";
import { Paper } from "@material-ui/core";
import { useStore } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

function TasksList({ indexId, sortBy }) {
  const store = useStore();
  const [dataList, setDataList] = useState([]);
  const [Loading, setLoading] = useState(false);

  const getFilteredData = () => {
    if (indexId === 0) {
      return dataList !== undefined
        ? dataList.filter((item) => item.isCompleted === false)
        : [];
    } else {
      return dataList !== undefined
        ? dataList.filter((item) => item.isCompleted === true)
        : [];
    }
  };

  useEffect(() => {
    setDataList(store.getState().inbox.List);
    return () => unsubscribe();
  }, []);

  const unsubscribe = store.subscribe(() => {
    console.log("suscirbe call");
    let loadingIndicator = store.getState().inbox.isLoading;
    setLoading(loadingIndicator);
    let newData = store.getState().inbox.List;
    setDataList(newData);
  });

  const sortDataBYDateAsc = (data, order) => {
    console.log("data before", data);
    let res = data.sort((a, b) =>
      order === true
        ? new Date(b.iat).getTime() - new Date(a.iat).getTime()
        : new Date(a.iat).getTime() - new Date(b.iat).getTime()
    );
    return res;
  };

  const FilteredData = sortDataBYDateAsc(getFilteredData(), sortBy);

  return (
    <>
      {Loading && <CircularProgress />}
      {!Loading && (
        <Paper style={{ maxHeight: 450, overflow: "auto" }}>
          <div>
            {FilteredData.map((item) => (
              <Task data={item} key={item.id} />
            ))}
          </div>
        </Paper>
      )}
    </>
  );
}

export default TasksList;
