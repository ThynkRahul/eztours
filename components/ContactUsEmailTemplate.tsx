import * as React from "react";

interface EmailTemplateProps {
  name: string;
  city: string;
  email: string;
  countryCode?: string;
  phone?: string;
  destination: string;
  dateOfTravel: string;
  people: string;
  tourType: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  city,
  email,
  countryCode,
  phone,
  destination,
  dateOfTravel,
  people,
  tourType,
  message,
}) => {
  const formattedPhone =
    countryCode && phone
      ? `${countryCode}-${phone}`
      : phone || "N/A";

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        backgroundColor: "#f9f9f9",
        padding: "30px",
        color: "#333",
      }}
    >
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          borderCollapse: "collapse",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {/* ======= HEADER ======= */}
        <thead>
          <tr>
            <td
              style={{
                backgroundColor: "#025C7A",
                textAlign: "center",
                padding: "20px 10px",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            >
              <img
                src="https://www.eazetours.com/images/logo.png"
                alt="EazeTours Logo"
                width="140"
                height="auto"
                style={{ display: "block", margin: "0 auto 8px auto" }}
              />
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "20px",
                  fontWeight: "bold",
                  margin: "8px 0 0 0",
                }}
              >
                New Enquiry Received
              </h2>
            </td>
          </tr>
        </thead>

        {/* ======= BODY ======= */}
        <tbody>
          <tr>
            <td style={{ padding: "24px" }}>
              <table width="100%" cellPadding="6" cellSpacing="0">
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "bold", width: "40%" }}>Name:</td>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>City:</td>
                    <td>{city}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Email:</td>
                    <td>{email}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Phone:</td>
                    <td>{formattedPhone}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Destination:</td>
                    <td>{destination}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Date of Travel:</td>
                    <td>{dateOfTravel}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>No. of People:</td>
                    <td>{people}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Tour Type:</td>
                    <td>{tourType}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold", verticalAlign: "top" }}>Message:</td>
                    <td>{message || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* ======= FOOTER ======= */}
          <tr>
            <td
              style={{
                backgroundColor: "#f1f1f1",
                textAlign: "center",
                fontSize: "12px",
                color: "#666",
                padding: "12px 0",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
              }}
            >
              This enquiry was submitted via the <strong>EazeTours</strong> website contact form.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
