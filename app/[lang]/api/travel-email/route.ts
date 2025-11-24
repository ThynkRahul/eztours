import { EmailTemplateTravel } from "../../../../components/EmailTemplateTravel";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);
const enquiry_email = process.env.ENQUIRY_EMAIL || "utsavan@gmail.com"; // changed to your desired email

function getFromAddress() {
  const customDomain = "site@eazetours.com";
  const fallback = "onboarding@resend.dev";
  const USE_CUSTOM_DOMAIN = false;
  return USE_CUSTOM_DOMAIN ? `Website <${customDomain}>` : `EazeTours <${fallback}>`;
}

export async function POST(request: Request) {
  try {
    // Include packageName here
    const request_data: {
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
      packageName: string; // added
    } = await request.json();

    const { data, error } = await resend.emails.send({
      from: getFromAddress(),
      to: ["info@eazetours.com", enquiry_email],
      cc: ["thynk.ravi@gmail.com"],
      bcc: ["thynk.rahul@gmail.com"],
      subject: `New Travel Enquiry for ${request_data.packageName} from ${request_data.name}`,
      react: EmailTemplateTravel(request_data), // make sure your template uses packageName
    });

    if (error) {
      console.error("Resend Error:", error);
      return new Response(
        JSON.stringify({ success: false, message: error.message || "Unknown error" }),
        { status: 500 }
      );
    }

    console.log("Resend Response:", data);
    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (err: any) {
    console.error("Unexpected Error:", err);
    return new Response(
      JSON.stringify({ success: false, message: err.message || "Unknown error" }),
      { status: 500 }
    );
  }
}
