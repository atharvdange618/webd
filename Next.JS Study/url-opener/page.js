import UrlOpener from "./client";
import Breadcrumb from "../Utils/Breadcrumb";
import Heading from "../Utils/Heading";
import Paragraph from "../Utils/Paragraph";
import BulletPointItem from "../Utils/BulletPointItem";

export default function page() {
  const features = [
    {
      title: "Multi-URL Support",
      description: "Open multiple URLs at once, each in its own tab.",
    },
    {
      title: "No Installation Required",
      description:
        "Works right in your browser with no downloads or plugins needed.",
    },
    {
      title: "Mobile Friendly",
      description:
        "Works on smartphones and tablets (browser tab opening behavior may vary by device).",
    },
    {
      title: "Free to Use",
      description: "100% free with no limitations or hidden charges.",
    },
  ];

  const useCases = [
    {
      title: "Research",
      description: "Open multiple research sources simultaneously.",
    },
    {
      title: "Social Media Management",
      description: "Open all your social media accounts at once.",
    },
    {
      title: "Comparison Shopping",
      description: "Open multiple product pages to compare items and prices.",
    },
    {
      title: "Work Startup",
      description: "Open all your work-related tools and sites with one click.",
    },
    {
      title: "News Reading",
      description: "Open various news sites to get different perspectives.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumb />

      <Heading label={"URL Opener Tool"} />

      {/* url opener component  */}
      <UrlOpener />

      <Heading
        subHeading={true}
        className="mt-8"
        label="Free URL Opener Tool – Open Multiple URLs with One Click"
      />
      <Paragraph label="Need to open multiple websites quickly? Our free URL Opener Tool allows you to paste multiple URLs and open them all with a single click. Whether you're setting up your daily workflow, doing research, or managing multiple sites, this tool makes the process convenient and efficient." />
      <Paragraph label="Simply paste your URLs, one per line or comma-separated, and click 'Open URLs' to launch each one in a new tab. No more tedious copy-pasting and manual opening!" />

      <Heading subHeading={true} label="What Is A URL Opener Tool?" />
      <Paragraph label="A URL Opener Tool is a web utility designed to open multiple web addresses (URLs) simultaneously with a single action. Instead of manually opening each website in a new tab, you can paste a list of URLs and have them all launch at once, saving time and reducing repetitive actions." />

      <Heading subHeading={true} label="Features of Our URL Opener Tool" />
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <BulletPointItem
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </ul>

      <Heading
        className="mt-4"
        subHeading={true}
        label="How to Use Our URL Opener"
      />
      <Paragraph
        heading3={true}
        label="Using our free URL Opener Tool is incredibly simple:"
      />
      <Paragraph label="1. Paste your URLs into the text area" />
      <Paragraph label="2. Review your list of URLs." />
      <Paragraph label="3. Click the 'Open URLs' button." />
      <Paragraph label="4. Allow your browser to open multiple tabs if prompted." />
      <Paragraph label="That's it! Each URL will open in a new browser tab." />

      <Heading
        className="mt-4"
        subHeading={true}
        label="Common Use Cases for the URL Opener Tool"
      />
      <Paragraph
        heading3={true}
        label="Our URL Opener Tool is useful in many scenarios:"
      />
      <ul className="space-y-2">
        {useCases.map((useCase, index) => (
          <BulletPointItem
            key={index}
            title={useCase.title}
            description={useCase.description}
          />
        ))}
      </ul>

      <Heading
        className="mt-4"
        subHeading={true}
        label="Browser Compatibility and Popup Blockers"
      />
      <Paragraph label="Most modern browsers (Chrome, Firefox, Edge, Safari) support opening multiple tabs programmatically. However, some browsers have popup blockers that prevent multiple tabs from opening simultaneously." />
      <Paragraph label="If you encounter issues, you may need to allow popups for this site in your browser settings. Usually, your browser will show a notification when popups are blocked, and you can choose to allow them for this site." />
      <Paragraph label="This tool opens the urls instantly in multiple tabs to provide a speedy user experience. On mobile devices, behavior may vary as some mobile browsers handle multiple tabs differently than desktop browsers." />

      <Heading
        className="mt-4"
        subHeading={true}
        label="Start Using Our Free URL Opener Tool Now!"
      />
      <Paragraph label="Save time and streamline your browsing experience with our URL Opener Tool. Whether you're a researcher, social media manager, online shopper, or professional setting up your daily workflow, our tool makes opening multiple websites quick and convenient." />
      <Paragraph label="Try it now! Paste your URLs, click 'Open URLs', and experience the efficiency of opening multiple sites at once." />
    </div>
  );
}
