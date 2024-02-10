import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

let baseUrl = "http://62.72.13.124/api/";

export function useLogin(endpoint = "") {
  const [successRes, setSuccessRes] = useState({});
  const [errorsRes, setErrorsRes] = useState({});

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  function req(args = {}) {
    setLoading(true);
    setSuccessRes({});
    setErrorsRes({});
    setSuccess(false);
    setFailed(false);

    const url = `${baseUrl}${endpoint}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: args,
      url,
    };

    axios(options)
      .then((res) => {
        // console.log("res :", res);
        setSuccessRes(res);
        setFailed(false);
        setSuccess(true);
        setLoading(false);
      })
      .catch((e) => {
        setErrorsRes(e.response);
        setSuccessRes({});
        setFailed(true);
        setSuccess(false);
        setLoading(false);
        // console.log("error :", e);
      });
  }

  const feedback = {
    success_res: successRes.data,
    error_res: errorsRes,
    loading: loading,
    success: success,
    failed: failed,
  };
  return [req, feedback];
}

export function useGet() {
  const user = useSelector((s) => s.user);
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${user.token}`,
  };

  const [successRes, setSuccessRes] = useState({});
  const [errorsRes, setErrorsRes] = useState({});

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  function req(args = {}, endpoint = "") {
    setLoading(true);
    setSuccessRes({});
    setErrorsRes({});
    setSuccess(false);
    setFailed(false);

    const url = `${baseUrl}${endpoint}`;

    const options = {
      method: "GET",
      headers: headers,
      params: args,
      url,
    };
    axios(options)
      .then((res) => {
        setSuccessRes(res);
        setFailed(false);
        setSuccess(true);
        setLoading(false);
      })
      .catch((e) => {
        setErrorsRes(e.response);
        setSuccessRes({});
        setFailed(true);
        setSuccess(false);
        setLoading(false);
        // console.log("error :", e);
      });
  }

  const feedback = {
    success_res: successRes.data,
    error_res: errorsRes,
    loading: loading,
    success: success,
    failed: failed,
  };
  return [req, feedback];
}

export function usePost(endpoint = "") {
  const user = useSelector((s) => s.user);
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${user.token}`,
  };

  const [successRes, setSuccessRes] = useState({});
  const [errorsRes, setErrorsRes] = useState({});

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  function req(args = {}) {
    setLoading(true);
    setSuccessRes({});
    setErrorsRes({});
    setSuccess(false);
    setFailed(false);

    const url = `${baseUrl}${endpoint}`;
    const options = {
      method: "POST",
      headers: headers,
      data: args,
      url,
    };

    axios(options)
      .then((res) => {
        // console.log("res :", res);
        setSuccessRes(res);
        setFailed(false);
        setSuccess(true);
        setLoading(false);
      })
      .catch((e) => {
        setErrorsRes(e.response);
        setSuccessRes({});
        setFailed(true);
        setSuccess(false);
        setLoading(false);
        // console.log("error :", e);
      });
  }

  const feedback = {
    success_res: successRes.data,
    error_res: errorsRes,
    loading: loading,
    success: success,
    failed: failed,
  };
  return [req, feedback];
}

export function useDelete(endpoint = "") {
  const user = useSelector((s) => s.user);
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${user.token}`,
  };

  const [successRes, setSuccessRes] = useState({});
  const [errorsRes, setErrorsRes] = useState({});

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  function req(args = {}) {
    setLoading(true);
    setSuccessRes({});
    setErrorsRes({});
    setSuccess(false);
    setFailed(false);

    const url = `${baseUrl}${endpoint}`;
    const options = {
      method: "DELETE",
      headers: headers,
      url,
    };

    axios(options)
      .then((res) => {
        setSuccessRes(res);
        setFailed(false);
        setSuccess(true);
        setLoading(false);
      })
      .catch((e) => {
        setErrorsRes(e.response);
        setSuccessRes({});
        setFailed(true);
        setSuccess(false);
        setLoading(false);
      });
  }

  const feedback = {
    success_res: successRes.data,
    error_res: errorsRes,
    loading: loading,
    success: success,
    failed: failed,
  };
  return [req, feedback];
}

export function useEdit(endpoint = "") {
  const user = useSelector((s) => s.user);
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${user.token}`,
  };

  const [successRes, setSuccessRes] = useState({});
  const [errorsRes, setErrorsRes] = useState({});

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  function req(args = {}) {
    setLoading(true);
    setSuccessRes({});
    setErrorsRes({});
    setSuccess(false);
    setFailed(false);

    const url = `${baseUrl}${endpoint}`;
    const options = {
      method: "PUT",
      headers: headers,
      data: args,
      url,
    };

    axios(options)
      .then((res) => {
        setSuccessRes(res);
        setFailed(false);
        setSuccess(true);
        setLoading(false);
      })
      .catch((e) => {
        setErrorsRes(e.response);
        setSuccessRes({});
        setFailed(true);
        setSuccess(false);
        setLoading(false);
      });
  }

  const feedback = {
    success_res: successRes.data,
    error_res: errorsRes,
    loading: loading,
    success: success,
    failed: failed,
  };
  return [req, feedback];
}
