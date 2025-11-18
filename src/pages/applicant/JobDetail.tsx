import { useLocation } from "react-router-dom";
import rakaminLogoOnly from "../../../public/rakamin-logo-only.png";

export default function JobDetail() {
  const { state } = useLocation();
  const job = state?.selectedJob;

  if (!job) return <p>No job selected</p>;

  return (
    <div className="p-6">
      <img src={rakaminLogoOnly} className="w-14 h-14 mb-4" />
      <h1 className="text-xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.slug}</p>

      <hr className="my-4" />

      {job.description
        ?.split("\n")
        .map((line: string, i: number) => (
          <p key={i} className="text-gray-700 mb-1">
            {line}
          </p>
        ))}
    </div>
  );
}
