import React from "react";

const TestComponent = () => {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
      }}
    >
      <table
        width="100%"
        style={{ backgroundColor: "#f9f9f9", padding: "20px" }}
      >
        <tbody>
          <tr>
            <td>
              <table
                width="600"
                align="center"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: "#4caf50",
                        color: "#ffffff",
                        padding: "15px",
                        textAlign: "center",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      New Message Received
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "20px",
                        color: "#333333",
                        fontSize: "16px",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        Hello,
                      </p>
                      <p style={{ margin: "10px 0" }}>
                        You have received a new message. Here are the details:
                      </p>
                      <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #eeeeee",
                                fontWeight: "bold",
                                backgroundColor: "#f9f9f9",
                              }}
                            >
                              Name:
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #eeeeee",
                              }}
                            >
                              {"name"}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #eeeeee",
                                fontWeight: "bold",
                                backgroundColor: "#f9f9f9",
                              }}
                            >
                              Phone:
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #eeeeee",
                              }}
                            >
                              {"phone"}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #eeeeee",
                                fontWeight: "bold",
                                backgroundColor: "#f9f9f9",
                              }}
                            >
                              Message:
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #eeeeee",
                              }}
                            >
                              {"some message"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p
                        style={{
                          margin: "20px 0 0",
                          fontSize: "14px",
                          color: "#666666",
                        }}
                      >
                        If you have any questions, feel free to contact us.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: "#4caf50",
                        color: "#ffffff",
                        textAlign: "center",
                        padding: "10px",
                        fontSize: "14px",
                      }}
                    >
                      &copy; 2024 Your Company. All rights reserved.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TestComponent;
