import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { HiBriefcase, HiCalendar, HiOfficeBuilding } from "react-icons/hi";
import { ExperienceProps } from "../../types/types";

const ExperienceShow = ({
  experience,
  position = "left",
}: {
  experience: ExperienceProps;
  position?: "left" | "right";
}) => {
  // Format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const startDate = formatDate(experience.startDate);
  const endDate = formatDate(experience.endDate);
  const isCurrentRole = !experience.endDate || experience.endDate === "";

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      position={position}
      contentStyle={{
        background: "rgba(7, 13, 12, 0.8)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(144, 215, 200, 0.2)",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(50, 233, 193, 0.1)",
        color: "#e5ebea",
      }}
      contentArrowStyle={{
        borderRight:
          position === "left" ? "7px solid rgba(144, 215, 200, 0.3)" : "none",
        borderLeft:
          position === "right" ? "7px solid rgba(144, 215, 200, 0.3)" : "none",
      }}
      date={`${startDate} - ${endDate}`}
      iconStyle={{
        background: isCurrentRole
          ? "linear-gradient(135deg, #32e9c1, #90d7c8)"
          : "linear-gradient(135deg, #90d7c8, #208f77)",
        color: "#070d0c",
        border: "3px solid #32e9c1",
        boxShadow: "0 0 20px rgba(50, 233, 193, 0.3)",
      }}
      icon={<HiBriefcase />}
    >
      {/* Company and Position Header */}
      <div className="mb-4">
        <h3 className="font-jetBrains text-accent mb-2 flex items-center gap-2 text-xl font-bold">
          <HiOfficeBuilding className="text-primary" />
          {experience.company}
        </h3>
        <h4 className="font-poppins text-text text-lg font-semibold">
          {experience.position}
        </h4>

        {/* Duration Badge */}
        <div className="mt-3 flex items-center gap-2">
          <div className="bg-accent/20 text-accent border-accent/30 flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium">
            <HiCalendar fontSize={14} />
            {startDate} - {endDate}
          </div>
          {isCurrentRole && (
            <div className="bg-primary/20 text-primary border-primary/30 animate-pulse rounded-full border px-3 py-1 text-sm font-medium">
              Current Role
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <p className="font-victor text-text/90 leading-relaxed">
          {experience.description}
        </p>

        {/* Decorative line */}
        <div className="from-accent to-primary h-1 w-16 rounded-full bg-gradient-to-r"></div>
      </div>

      {/* Hover effect overlay */}
      <div className="from-accent/5 to-primary/5 pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
    </VerticalTimelineElement>
  );
};

export default ExperienceShow;
