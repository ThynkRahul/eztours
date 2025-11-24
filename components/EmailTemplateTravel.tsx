export function EmailTemplateTravel(data: {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  city: string;
  dateOfTravel: string;
  adults: number;
  children: number;
  infants: number;
  message: string;
  packageName: string; // 👈 added
}) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", color: "#333", padding: "20px" }}>
      <h2 style={{ color: "#025C7A" }}>New Travel Enquiry</h2>

      {/* Package Name */}
      <p><strong>Package:</strong> {data.packageName}</p>

      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Phone:</strong> {data.countryCode} {data.phone}</p>
      <p><strong>City:</strong> {data.city}</p>
      <p><strong>Date of Travel:</strong> {data.dateOfTravel}</p>
      <p><strong>Travelers:</strong> Adults: {data.adults}, Children: {data.children}, Infants: {data.infants}</p>
      <p><strong>Message:</strong> {data.message || "N/A"}</p>

      <hr />
      <p style={{ fontSize: "12px", color: "#777" }}>
        This email was generated from your website travel enquiry form.
      </p>
    </div>
  );
}
