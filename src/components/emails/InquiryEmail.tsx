import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "react-email";

interface PropertyInquiryEmailProps {
  ownerEmail: string;
  ownerName: string;
  propertyTitle: string;
  price: string | number;
  senderEmail: string;
  senderName: string;
  senderMessage: string;
  senderPhone?: string;
}

export default function PropertyInquiryEmail({
  ownerName,
  propertyTitle,
  price,
  senderEmail,
  senderName,
  senderMessage,
  senderPhone,
}: PropertyInquiryEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>
        New inquiry from {senderName} about {propertyTitle}
      </Preview>

      <Body
        style={{
          backgroundColor: "#f5f5f5",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "40px 20px",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "32px",
          }}
        >
          <Heading
            style={{
              fontSize: "28px",
              color: "#111827",
              marginBottom: "8px",
            }}
          >
            New Property Inquiry
          </Heading>

          <Text
            style={{
              color: "#6b7280",
            }}
          >
            Hello {ownerName},
          </Text>

          <Text>Someone is interested in one of your listed properties.</Text>

          <Hr />

          <Section>
            <Heading
              as="h2"
              style={{
                fontSize: "18px",
                marginBottom: "16px",
              }}
            >
              Property Details
            </Heading>

            <Text>
              <strong>Property:</strong> {propertyTitle}
            </Text>

            <Text>
              <strong>Price:</strong> {price}
            </Text>
          </Section>

          <Hr />

          <Section>
            <Heading
              as="h2"
              style={{
                fontSize: "18px",
                marginBottom: "16px",
              }}
            >
              Sender Information
            </Heading>

            <Text>
              <strong>Name:</strong> {senderName}
            </Text>

            <Text>
              <strong>Email:</strong> {senderEmail}
            </Text>

            {senderPhone && (
              <Text>
                <strong>Phone:</strong> {senderPhone}
              </Text>
            )}
          </Section>

          <Hr />

          <Section>
            <Heading
              as="h2"
              style={{
                fontSize: "18px",
                marginBottom: "16px",
              }}
            >
              Message
            </Heading>

            <Text
              style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "16px",
                lineHeight: "1.6",
              }}
            >
              {senderMessage}
            </Text>
          </Section>

          <Section
            style={{
              marginTop: "32px",
              textAlign: "center",
            }}
          >
            <Button
              href={`mailto:${senderEmail}`}
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "14px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Reply to {senderName}
            </Button>
          </Section>

          <Hr />

          <Text
            style={{
              fontSize: "13px",
              color: "#9ca3af",
              textAlign: "center",
            }}
          >
            This inquiry was sent through your real estate platform.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
